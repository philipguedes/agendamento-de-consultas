<template>
<!-- <v-layout align-center column> -->
    <v-container grid-list-md align-center justify-center>

  <v-card>
      <v-layout row align-center justify-center>
        <v-flex d-flex xs12 sm5 md4>
          <calendar v-on:changed="say('hi')"></calendar>
        </v-flex>
        <v-flex d-flex xs12 sm3 md2 align-center>
          <v-item-group multiple>
            <v-layout align-center justify-center row wrap>
              <v-item
                v-for="it in items"
                :key="it">
                <v-chip
                  slot-scope="{ active }"
                  :selected="active"
                  v-on:click="select(it)">
                  {{ it }}
                </v-chip>
              </v-item>
            </v-layout>
          </v-item-group>
        </v-flex>
      </v-layout>
  </v-card>
    </v-container>
<!-- </v-layout> -->
</template>

<script>
import Calendar from '../components/Calendar.vue'

export default {
  name: 'hello',
  data () {
    return {
      items: [
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30'
      ]
    }
  },
  methods: {
    say: (h) => { console.log(h) },
    select (time) {
      // TODO: remove log
      console.log(`bla: ${time}`)
      this.time = time
    }
  },
  components: {
    Calendar
  }
}
</script>