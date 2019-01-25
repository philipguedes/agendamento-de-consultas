import Vue from 'vue'
import Router from 'vue-router'
import Appointment from '@/views/Appointment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment
    }
  ]
})
