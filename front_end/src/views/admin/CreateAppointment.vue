<template>
  <v-container>
    <loading-component :loading="loading"></loading-component>
    <v-layout justify-center reverse fill-height row>
      <v-flex xs7 align-self-center>
        <appointment-table v-on:loading-on="loadingOn" v-on:loading-off="loadingOff" :date="date"></appointment-table>
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
import LoadingComponent from '@/components/LoadingComponent'
// import Api from '@/api/index'
import moment from 'moment'

export default {
  name: 'create-appointment',
  data () {
    return {
      date: moment().toISOString().substr(0, 10),
      loading: false
    }
  },
  methods: {
    loadingOn () { this.loading = true },
    loadingOff () { this.loading = false }
    // openAppointments (dates) {
    //   Api.openAppointments(dates).then((response) => {
    //     console.log('open respondeu')
    //   })
    // },
    // closeAppointments (dates) {
    //   Api.closeAppointments(dates).then((response) => {
    //     console.log('close respondeu')
    //   })
    // }
  },
  components: {
    Calendar, AppointmentTable, LoadingComponent
  }
}
</script>

<style>


</style>
