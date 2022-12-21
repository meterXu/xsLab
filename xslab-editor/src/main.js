import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/styles/dark-color.css'
import "./assets/styles/ivu-dark.less";
import clipboard from 'clipboard'
import VueQr from 'vue-qriously'
import Xsc from './packages/vue-draw-xs/src/index'
import store from './store'
import vuex from 'vuex'
import myMixin from "./config/myMixin";
import createRequest from "./config/api"
// Vue 全局配置
Vue.use(iView, VueAxios, axios)
Vue.use(vuex)
Vue.use(VueQr)
Vue.use(Xsc)
Vue.mixin(myMixin)
Vue.prototype.$clipboard=clipboard

axios.get('./config.json').then(res=>{
  store.commit('setBaseUrl',res.data.baseUrl)
  store.commit('setDefaultChartTheme',res.data.defaultChartTheme)
  if(!store.getters.editorTheme){
    store.commit('setEditorTheme',res.data.editorTheme)
    document.getElementsByTagName('html')[0].setAttribute('data-theme', res.data.editorTheme)
  }else{
    document.getElementsByTagName('html')[0].setAttribute('data-theme', store.getters.editorTheme)
  }
  Vue.prototype.$ajax =  createRequest()
  // 启动应用
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

Vue.prototype.$clipboard = clipboard

