<template>
  <v-container>
    <v-layout justify-center reverse fill-height row>
      <v-flex xs7 align-self-top>
        <v-data-table
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
              <td>{{ props.item.hour }}</td>
              <td>{{ props.item.name || '-' }}</td>
              <td>{{ props.item.email || '-' }}</td>
              <td>{{ props.item.phone || '-' }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs1 grow style="height=100%">
        <v-divider vertical></v-divider>
      </v-flex>
      <v-flex xs4 align-self-center>
        <v-date-picker class="elevation-1" v-model="date" color="green lighten-1" header-color="black"></v-date-picker>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import AppointmentTable from '@/views/admin/AppointmentTable.vue'
import Api from '@/api/index'
import Utils from '@/utils/index'

export default {
  name: 'search-appointment',
  data () {
    return {
      date: moment().toISOString().substr(0, 10),
      headers: [
        {
          text: 'Horários Marcados',
          value: 'hour'
        },
        {
          text: 'Nome',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Telefone',
          value: 'phone'
        }
      ],
      items: [],
      pagination: {
        sortBy: 'hour'
      }
    }
  },
  watch: {
    date (newDate) {
      const parsed = Utils.parseDate(newDate)
      Api.getAppointmentsByDay(parsed)
        .then(this.updateItems)
    }
  },
  methods: {
    updateItems (appointments) {
      const items = []
      _.forEach(appointments, (ap) => {
        if (!ap.free) {
          items.push({
            ...ap.user,
            hour: Utils.getHour(ap.schedule)
          })
        }
      })
      this.items = items
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
    AppointmentTable
  }
}
</script>