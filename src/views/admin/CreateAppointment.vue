<template>
  <v-container>
    <v-layout justify-center reverse fill-height row>
      <v-flex xs7 align-self-center>
        <appointment-table :date="date"></appointment-table>
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
import Calendar from '@/components/Calendar.vue'
import AppointmentTable from '@/views/admin/AppointmentTable.vue'
import moment from 'moment'

export default {
  name: 'create-appointment',
  data () {
    return {
      date: moment().toISOString().substr(0, 10)
    }
  },
  methods: {
  },
  components: {
    Calendar, AppointmentTable
  }
}
</script>

<style>


</style>
