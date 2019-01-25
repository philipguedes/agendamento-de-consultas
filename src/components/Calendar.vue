<template>
  <div padding="8px">
    <v-layout align-center justify-center>
      <v-date-picker v-model="date" dark no-title></v-date-picker>
    </v-layout>
  </div>
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
  padding: 16px;
}
</style>

