<template>
  <v-card class="appointment">
    <v-layout row wrap align-center justify-center>
      <!-- <v-flex> -->
        <user-info></user-info>
      <!-- </v-flex> -->
      <v-divider vertical></v-divider>
      <!-- <v-flex> -->
        <scheduling></scheduling>
      <!-- </v-flex> -->
    </v-layout>
    <v-btn block color="secondary" dark>Agendar</v-btn>
  </v-card>
</template>

<script>
import Scheduling from '../views/appointment/Scheduling'
import UserInfo from '../views/appointment/UserInfo'

export default {
  name: 'appointment',
  data () {
    return {}
  },
  components: {
    Scheduling, UserInfo
  }
}
</script>

<style>
.appointment {
  height: 300px;
  width: 640px;
}
</style>
