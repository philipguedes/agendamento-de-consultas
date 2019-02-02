<template>
  <v-card>
    <v-card-text>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        rows-per-page-text=""
        :rows-per-page-items="[]"
        select-all
        item-key="hour"
        class="elevation-2">
        <template slot="headers" slot-scope="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td>{{ props.item.hour }}</td>
            <td class="text-xs-right">{{ props.item.available }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="green"
        class="white--text"
        :disabled="disabled"
        @click="openAppointments">
        Abrir
        <v-icon dark right>check_circle</v-icon>
      </v-btn>
      <v-btn
        color="red"
        class="white--text"
        :disabled="disabled"
        @click="closeAppointments">
        Fechar
        <v-icon dark right>remove_circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Api from '@/api/index'
import _ from 'lodash'
import moment from 'moment-timezone'

export default {
  name: 'appointment-table',
  created () {
    this.reloadItems()
  },
  data () {
    return {
      loading1: false,
      loading2: false,
      pagination: {
        sortBy: 'hour'
      },
      selected: [],
      headers: [
        {
          text: 'Horários Disponíveis',
          value: 'hour'
        },
        {
          text: 'Aberto', // aberto ou fechado
          value: 'available'
        }
      ],
      template: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '08:30',
        '09:30',
        '10:30',
        '11:30',
        '12:30',
        '13:30',
        '14:30',
        '15:30',
        '16:30'
      ],
      items: [],
      currentItems: []
    }
  },
  props: {
    date: String
  },
  computed: {
    disabled () {
      return this.selected.length === 0
    },
    zero () {
      return moment(this.date).tz('America/Sao_Paulo').startOf('day')
    },
    openDisabled () {

    },
    formatted () {
      return moment(this.date).tz('America/Sao_Paulo').format('YYYY-MM-DD')
    }
  },
  watch: {
    date (newDate) {
      this.reloadItems(newDate)
    }
  },
  methods: {
    createItems () {
      const items = _.map(this.currentItems, (value, key) => {
        let available
        if (value.free) {
          available = 'aberto'
        } else {
          available = _.isEmpty(value.user) ? 'fechado' : 'agendado'
        }
        return { hour: key, available }
      })
      _.forEach(this.template, (h) => {
        if (_.isEmpty(this.currentItems[h])) {
          items.push({ hour: h, available: 'fechado' })
        }
      })
      this.items = items
    },
    shifted (num) {
      const zero = this.zero
      zero.add(num)
      return zero.format('HH:mm')
    },
    reloadItems () {
      Api.getAppointmentsByDay(this.formatted).then(this.parseNewItems)
    },
    parseNewItems (newItems) {
      console.log(newItems)
      const currentItems = {}
      _.forEach(newItems, (item) => {
        const key = this.parseDate(item['schedule']).format('HH:mm')
        currentItems[key] = item
      })
      this.currentItems = currentItems
      this.createItems()
    },
    parseDate (date) {
      return moment(date).tz('America/Sao_Paulo')
    },
    selectTime (time) {
      this.time = time
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    parseSelected () {
      const selected = _.map(this.selected, (obj) => {
        const dateStr = `${this.formatted} ${obj.hour}`
        return moment(dateStr, 'YYYY-MM-DD HH:mm').tz('America/Sao_Paulo').toISOString()
      })
      // this.$emit(action, selected)
      return selected
    },
    openAppointments () {
      const dates = this.parseSelected()
      this.$emit('loading-on')
      Api.openAppointments(dates).then((response) => {
        console.log('open respondeu')
      }).finally(() => {
        this.reloadItems()
        this.$emit('loading-off')
      })
    },
    closeAppointments () {
      const dates = this.parseSelected()
      this.$emit('loading-on')
      Api.closeAppointments(dates).then((response) => {
        console.log('close respondeu')
      }).finally(() => {
        this.reloadItems()
        this.$emit('loading-off')
      })
    }
    // openRows () {
    //   this.parseSelected('open')
    // },
    // closeRows () {
    //   this.parseSelected('close')
    // }
  },
  components: {
  }
}
</script>

<style>

</style>