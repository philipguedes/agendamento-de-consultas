<template>
<v-container class="scheduler">
  <v-layout align-center justify-center>
    <v-flex xs12>
      <v-item-group>
        <v-container
          class="scroll-y list">
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
</v-container>

</template>

<script>
import moment from 'moment'
import Api from '../api/index.js'

export default {
  name: 'scheduler',
  data () {
    return {
      items: [
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '14:00'
      ]
    }
  },
  props: {
    date: Object
  },
  watch: {
    date () {
      this.refreshItems()
    }
  },
  methods: {
    select (time) {
      this.time = time
      this.$emit('selected', time)

      //     Api.postSelectedAppointment(this.date, this.time)
      // .then((res) => { console.log('Scheduler Posted!'); console.log(res) })
      // .catch((err) => {
      //   console.log(err)
      // })
    },
    refreshItems () {
      this.items = [] // TODO: colocar loading aqui

      const formatted = moment(this.date).format('YYYY-MM-DD')
      Api.getAgenda(formatted).then(({ data }) => { this.items = data })
    }

  }
}
</script>

<style>
.scheduler {
  max-height: 100%;
  max-width: 320px;
}

.list {
  max-height: 120px;
  min-height: 120px;
}

</style>
