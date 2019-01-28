<template>
  <div>
    <loading-component :loading="loading"></loading-component>

    <v-stepper v-model="current" vertical>

      <v-stepper-step :complete="current > 1" step="1">Informações Pessoais</v-stepper-step>
      <v-stepper-content step="1">
        <v-layout column>
          <v-flex xs6>
            <user-info :user="user"></user-info>
          </v-flex>
          <v-flex xs2 align-self-end>
          <v-btn
          @click="current += 1"
          >Próximo Passo</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="current > 2" step="2">Dia da Consulta</v-stepper-step>
      <v-stepper-content step="2">
        <v-layout column>

          <v-flex xs6>
            <v-date-picker class="elevation-1" v-model="date" color="green lighten-1" header-color="black"></v-date-picker>
          </v-flex>

          <v-flex xs2 align-self-end>
            <v-btn @click="current += 1">Próximo Passo</v-btn>
          </v-flex>

        </v-layout>
      </v-stepper-content>

      <v-stepper-step :complete="current > 3" step="3">Horário da Consulta</v-stepper-step>
      <v-stepper-content step="3">
        <v-layout column>
          <v-item-group>
            <v-subheader>Horários</v-subheader>
            <v-container>
              <v-layout row>
                <v-flex
                  v-for="it in items"
                  :key="it"
                  xs2>
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
          <v-flex xs2 align-self-start>
            <v-btn @click="current -= 1">Voltar</v-btn>
          </v-flex>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import Scheduling from '../views/appointment/Scheduling'
import UserInfo from '../views/appointment/UserInfo'
import LoadingComponent from '@/components/LoadingComponent'
import moment from 'moment-timezone'
import _ from 'lodash'
import Api from '@/api/index'

export default {
  name: 'appointment',
  data () {
    return {
      current: 3,
      date: moment().toISOString().substr(0, 10),
      user: {},
      items: [],
      loading: false
    }
  },
  computed: {
    parsedDate () {
      return moment(this.date).tz('America/Sao_Paulo').format('YYYY-MM-DD')
    }
  },
  watch: {
    current (value) {
      if (value === 3) {
        Api.getAgenda(this.parsedDate).then(this.fillItems)
      }
    }
  },
  methods: {
    fillItems (appointments) {
      const items = []
      _.forEach(appointments, (a) => {
        const parsed = moment(a).tz('America/Sao_Paulo').format('HH:mm')
        items.push(parsed)
      })
      this.items = items
    },
    createAppointment () {
      console.log('creating appointment')
      // pega a data, as informações do usuario e manda
    },
    select (hour) {
      console.log(`select: ${hour}`)
    }

  },
  components: {
    Scheduling, UserInfo, LoadingComponent
  }
}
</script>

<style>
.appointment {
  height: 300px;
  width: 640px;
}
</style>
