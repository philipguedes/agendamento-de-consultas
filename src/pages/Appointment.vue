<template>
  <div>
    <loading-component :loading="loading"></loading-component>

    <v-stepper v-model="current" vertical>

      <v-stepper-step :complete="current > 1" step="1">Informações Pessoais</v-stepper-step>
      <v-stepper-content step="1">
        <v-layout column>
          <v-flex xs6>
            <user-info :valid="valid-user" :user="user"></user-info>
          </v-flex>
          <v-flex xs2 align-self-end>
          <v-btn
          @click="nextStep"
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
            <v-btn @click="nextStep">Próximo Passo</v-btn>
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
                      slot-scope="{ active, toggle }"
                      :selected="active"
                      v-on:click="toggle(); select(it)">
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

      <v-stepper-step :complete="current > 4" step="4">Confirmação</v-stepper-step>
      <v-stepper-content step="4">
        <div> Consulta marcada com sucesso! </div>
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
      current: 1,
      date: moment().toISOString().substr(0, 10),
      hour: null,
      user: {},
      schedule: null,
      items: [],
      loading: false,
      active: false,
      validUser: false
    }
  },
  computed: {
    parsedDate () {
      return moment(this.date).tz('America/Sao_Paulo').format('YYYY-MM-DD')
    },
    completedStep () {
      let completed = false
      switch (this.current) {
        case 1:
          completed = this.validUser()
          break
        case 2:
          completed = this.date
          break
        case 3:
          completed = true
          break
        default:
          break
      }
      return completed
    },
    email () {
      return this.user['email'] || ''
    },
    phone () {
      return this.user['phone'] || ''
    },
    name () {
      return this.user['name'] || ''
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
    nextStep () {
      this.current += 1
    },
    createAppointment () {
      console.log('creating appointment')
      const obj = {
        schedule: this.schedule,
        email: this.email,
        name: this.name,
        phone: this.phone }
      this.loading = true
      return obj
      // pega a data, as informações do usuario e manda
    },
    select (hour) {
      const dateString = `${this.parsedDate} ${hour}`
      this.schedule = moment(dateString, 'YYYY-MM-DD HH:mm').tz('America/Sao_Paulo').toISOString()
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
