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
        :loading="loading1"
        :disabled="disabled"
        @click="openRows">
        Liberar
      </v-btn>
      <v-btn
        color="red"
        class="white--text"
        :loading="loading2"
        :disabled="disabled || true"
        @click="closeRows">
        Fechar Horário
        <v-icon dark right>remove_circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Api from '@/api/index'

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
          text: 'Disponível', // aberto ou fechado
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
        '16:30',
        '17:30'
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
    }
  },
  watch: {
    date (newDate) {
      this.reloadItems(newDate)
    }
  },
  methods: {
    createRows () {

    },
    openRows () {
      this.loading1 = true
    },
    closeRows () {
      this.loading2 = true
    },
    reloadItems () {
      Api.getAppointmentsByDay('2019-01-26').then((newItems) => {
        this.items = newItems
      })
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
    }
  },
  components: {
  }
}
</script>

<style>

</style>