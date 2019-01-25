<template>
  <v-layout align-center justify-center>
    <v-card class="calendar-card">
      <v-card-title center>{{ title || 'Calendario' }}</v-card-title>
      <v-date-picker v-model="date" dark no-title></v-date-picker>
    </v-card>

  </v-layout>
</template>

<script>
import moment from 'moment'

export default {
  name: 'calendar',
  data () {
    return {
      date: new Date().toISOString().substr(0, 10)
    }
  },
  watch: {
    date (val) {
      this.$emit('changed', moment(val))
    }
  }
}
</script>

<style>

.calendar-card {
  padding: 10px;
  margin: 5px
}
</style>

