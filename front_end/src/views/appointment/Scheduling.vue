<template>
  <div class="scheduling">
    <v-layout align-center wrap column justify-center>
      <v-flex xs12>
        <calendar v-on:changed="dateChanged"></calendar>
      </v-flex>
      <v-flex xs12>
        <scheduler v-on:selected="selectTime" :date="date"></scheduler>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Scheduler from '@/components/Scheduler.vue'
import Calendar from '@/components/Calendar.vue'
import moment from 'moment'

export default {
  name: 'scheduling',
  data () {
    return {
      date: moment()
    }
  },
  methods: {
    dateChanged (newDate) {
      this.date = newDate
    },
    selectTime (time) {
      this.time = time
    }
  },
  components: {
    Scheduler,
    Calendar
  }
}
</script>

<style>

.scheduling {
  height: 100%;
  width: 200px
}

</style>
