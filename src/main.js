import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import viewui from 'view-design'
import baseConfig from './config/config'
import 'view-design/dist/styles/iview.css'
import clipboard from 'clipboard'
import VueQriously from 'vue-qriously'
import Xsc from 'vue-draw-xs'
// Vue 全局配置
Vue.use(viewui, VueAxios, axios)
Vue.use(VueQriously)
Vue.use(Xsc)
Vue.prototype.$baseConfig = baseConfig
Vue.prototype.$ajax = axios
Vue.prototype.$clipboard = clipboard
// 启动应用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
