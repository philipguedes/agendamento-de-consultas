<template>
  <v-flex xs5>
    <v-card>
      <v-layout align-center wrap column justify-center>
        <v-flex xs12>
          <calendar></calendar>
        </v-flex>
        <v-flex xs12>
          <scheduler></scheduler>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import Scheduler from '../components/Scheduler.vue'
import Calendar from '../components/Calendar.vue'

export default {
  name: 'scheduling',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    Scheduler,
    Calendar
  }
}
</script>