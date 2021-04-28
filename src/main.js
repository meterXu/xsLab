import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/styles/dark-color.css'
import "./assets/styles/ivu-dark.less";
import clipboard from 'clipboard'
import VueQriously from 'vue-qriously'
import Xsc from './packages/vue-draw-xs/src/index'
import store from './store'
import vuex from 'vuex'
import myMixin from "./config/myMixin";
import createRequest from "./config/api"
// Vue 全局配置
Vue.use(iview, VueAxios, axios)
Vue.use(vuex)
Vue.use(VueQriously)
Vue.use(Xsc)
Vue.mixin(myMixin)
Vue.prototype.$ajax =  createRequest()

if(!store.getters.commonConfig.baseUrl){
  axios.get('./config.json').then(res=>{
    store.getters.commonConfig.baseUrl = res.data.baseUrl
    store.commit('setCommonConfig',store.getters.commonConfig)
    // 启动应用
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
}else{
  // 启动应用
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

Vue.prototype.$clipboard = clipboard

