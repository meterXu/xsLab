// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/base.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
// Vue.prototype.$backUrl = 'http://localhost:8083/'
Vue.prototype.$backUrl = 'https://app.isaacxu.com/xslab/doc/'
/* eslint-disable no-new */
Vue.mixin({
  data(){
    return {
      config:config
    }
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
