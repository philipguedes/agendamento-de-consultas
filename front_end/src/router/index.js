import Vue from 'vue'
import Router from 'vue-router'
import Scheduling from '@/views/appointment/Scheduling'
import Appointment from '@/pages/Appointment'
import Admin from '@/pages/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Scheduling',
      component: Scheduling
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
