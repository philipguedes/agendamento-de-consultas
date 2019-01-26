<template>
<v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 lg6>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="10"
          lazy
          top
          transition="scale-transition"
          full-width
          max-width="290px"
          min-width="290px">
          <v-text-field
            slot="activator"
            readonly
            :value="computedDateFormatted"
            clearable
            prepend-icon="event"
            label="Data">
          </v-text-field>
          <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'calendar',
  data () {
    return {
      menu: false,
      date: ''
    }
  },
  watch: {
    date (val) {
      this.$emit('changed', moment(val))
    }
  },
  computed: {
    computedDateFormatted () {
      return this.date ? moment(this.date).format('DD/MM/YYYY') : ''
    }
  }
}
</script>

<style>

.calendar-card {
  padding: 16px;
}
</style>

