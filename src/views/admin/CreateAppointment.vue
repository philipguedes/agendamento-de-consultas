<template>

    <v-container>
      <v-layout justify-center reverse fill-height row>
        <v-flex xs7>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            select-all
            item-key="hour"
            class="elevation-1"
          >
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

        </v-flex>
        <v-flex xs1>
          <v-divider vertical></v-divider>

        </v-flex>
        <v-flex xs4>

          <v-date-picker v-model="date" color="green lighten-1" header-color="primary"></v-date-picker>
        </v-flex>



      </v-layout>
    </v-container>

</template>

<script>
import Calendar from '@/components/Calendar.vue'
import moment from 'moment'

export default {
  name: 'create-appointment',
  data () {
    return {
      date: moment().toISOString().substr(0, 10),
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
      times: [
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
      items: [
        { hour: '04:20', available: '1' },
        { hour: '05:20', available: '1' },
        { hour: '06:20', available: '1' },
        { hour: '07:20', available: '1' },
        { hour: '08:20', available: '1' },
        { hour: '09:20', available: '1' },
        { hour: '01:20', available: '1' },
        { hour: '03:20', available: '1' },
        { hour: '02:20', available: '1' },
        { hour: '00:20', available: '1' }
      ]
    }
  },
  watch: {
    date (newDate) {
      console.log('heloo')
    }
  },
  methods: {
    dateChanged (newDate) {
      this.date = newDate
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
    Calendar
  }
}
</script>

<style>


</style>
