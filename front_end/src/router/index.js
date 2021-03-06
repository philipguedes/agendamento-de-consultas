import Vue from 'vue'
import Router from 'vue-router'
import Appointment from '@/pages/Appointment'
import Admin from '@/pages/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
