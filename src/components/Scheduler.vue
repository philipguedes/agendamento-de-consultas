<template>
    <v-container grid-list-md align-center justify-center>
<v-layout row wrap>



  <v-card>
    <v-layout column align-center justify-center wrap>
      <v-flex>
        <calendar v-on:changed="say('hi')"></calendar>
      </v-flex>
      <v-flex>

      <div>
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
      </div>
      </v-flex>
    </v-layout>
  </v-card>

</v-layout>
    </v-container>
</template>

<script>
import Calendar from './Calendar.vue'

export default {
  name: 'scheduler',
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