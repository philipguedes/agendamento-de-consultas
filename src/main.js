// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/es5/util/colors'

// Vue.use(BootstrapVue)
Vue.use(Vuetify, {
  iconfont: 'fa4',
  primary: colors.red.darken1,
  secondary: colors.red.lighten4, // #FFCDD2
  accent: colors.indigo.base // #3F51B5
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
