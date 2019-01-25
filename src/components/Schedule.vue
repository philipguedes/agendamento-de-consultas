<template>
  <v-layout align-center justify-center>
    <v-card class="schedule-card">
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
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'schedule',
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
    select (time) {
      // TODO: remove log
      console.log(`bla: ${time}`)
      this.time = time
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.schedule-card {
  padding: 16px;
}
</style>

