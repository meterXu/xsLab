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
Vue.use(iView, VueAxios, axios)
Vue.use(vuex)
Vue.use(VueQr)
Vue.use(Xsc)
Vue.mixin(myMixin)
Vue.prototype.$clipboard=clipboard
let theme = store.getters.editorTheme||window.config.editorTheme
store.commit('setEditorTheme',theme)
document.getElementsByTagName('html')[0].setAttribute('data-theme', theme)

// 启动应用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

