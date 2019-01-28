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
                :disabled="disabled"
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
        @click="openRows">
        Abrir
        <v-icon dark right>check_circle</v-icon>
      </v-btn>
      <v-btn
        color="red"
        class="white--text"
        @click="closeRows">
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
      items: []
    }
  },
  props: {
    date: String
  },
  computed: {
    disabled () {
      return this.loading1 || this.loading2
    },
    zero () {
      return moment(this.date).tz('America/Sao_Paulo').startOf('day')
    },
    openDisabled () {

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
        return { hour: key, available: value.free }
      })
      _.forEach(this.template, (h) => {
        if (_.isEmpty(this.currentItems[h])) {
          items.push({ hour: h, available: false })
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
      Api.getAppointmentsByDay('2019-01-26').then(this.parseNewItems)
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
    parseSelected (action) {
      const dayStr = this.parseDate(this.date).format('YYYY-MM-DD')
      const selected = _.map(this.selected, (obj) => {
        const dateStr = `${dayStr} ${obj.hour}`
        return moment(dateStr, 'YYYY-MM-DD HH:mm').tz('America/Sao_Paulo').toISOString()
      })
      this.$emit(action, selected)
    },
    openRows () {
      this.parseSelected('open')
    },
    closeRows () {
      this.parseSelected('close')
    }
  },
  components: {
  }
}
</script>

<style>

</style>