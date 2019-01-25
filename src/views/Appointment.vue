<template>
  <v-container>
    <v-layout>
      <v-flex>

      </v-flex>
    </v-layout>
    <v-layout align-center justify-center column>

      <div>
        <!-- <v-card title="Data"> -->
          <calendar v-on:changed="say('hi')"></calendar>
        <!-- </v-card> -->

        <v-card title="Horarios">

                    <calendar v-on:changed="say('hi')"></calendar>
        </v-card>
      </div>

    </v-layout>

  </v-container>
</template>

<script>
import Calendar from '../components/Calendar.vue'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  methods: {
    say: (h) => { console.log(h) }
  },
  components: {
    Calendar
  }
}
</script>