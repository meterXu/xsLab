import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import iview from 'iview'
import baseConfig from './config/config'
import 'iview/dist/styles/iview.css'
import './assets/styles/dark-color.css'
import "./assets/styles/ivu-dark.less";
import clipboard from 'clipboard'
import VueQriously from 'vue-qriously'
import Xsc from './packages/vue-draw-xs/src/index'
// Vue 全局配置
Vue.use(iview, VueAxios, axios)
Vue.use(VueQriously)
Vue.use(Xsc)
Vue.mixin({
  data () {
    return {
      commonConfig: baseConfig
    }
  }
})
Vue.prototype.$ajax = axios
Vue.prototype.$clipboard = clipboard
// 启动应用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
