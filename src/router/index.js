import Vue from 'vue'
import Router from 'vue-router'
import Scheduling from '@/views/Scheduling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Scheduling',
      component: Scheduling
    }
  ]
})
