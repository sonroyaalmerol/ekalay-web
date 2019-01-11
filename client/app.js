import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven
  .config('https://f33c39989acd4c65b9cd552b873c99b0@sentry.io/208619')
  .addPlugin(RavenVue, Vue)
  .install()

Vue.router = router
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'https://e.updkalay.com/api/v1/'
Vue.axios.defaults.timeout = 180000
Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token})
      // logs (token)
      // logs (req)
    },
    response: function (res) {
      // Get Token from response body
      // logs (res.data)
      return res.data.token
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  fetchData: { url: 'auth/users/own/', method: 'GET', enabled: true },
  loginData: { url: 'auth/token/', fetchUser: true },
  refreshData: { enabled: false },
  authRedirect: { path: '/' },
  parseUserData: function (data) {
    return data
  }
})

Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
