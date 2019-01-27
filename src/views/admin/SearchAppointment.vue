<template>
  <div class="scheduling">

    search appointment
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
import moment from 'moment'

export default {
  name: 'search-appointment',
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
