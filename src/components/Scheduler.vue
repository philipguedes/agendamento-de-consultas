<template>
  <v-layout align-center justify-center>
    <v-flex xs6>
      <v-item-group>
        <v-container
          style="max-height: 200px"
          class="scroll-y">
          <v-layout row wrap>
            <v-flex
              v-for="it in items"
              :key="it"
              xs6>
              <v-item>
                <v-chip
                  slot-scope="{ active }"
                  :selected="active"
                  v-on:click="select(it)">
                  {{ it }}
                </v-chip>
              </v-item>
            </v-flex>
          </v-layout>
        </v-container>
      </v-item-group>
    </v-flex>
  </v-layout>
</template>

<script>
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
  }
}
</script>