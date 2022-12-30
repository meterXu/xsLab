import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import clipboard from 'clipboard'
import VueQr from 'vue-qriously'
import Xsc from './packages/vue-draw-xs/src/index'
import store from './store'
import vuex from 'vuex'
import myMixin from "./config/myMixin";
import {disable, enable} from "darkreader";
Vue.use(iView, VueAxios, axios)
Vue.use(vuex)
Vue.use(VueQr)
Vue.use(Xsc)
Vue.mixin(myMixin)
Vue.prototype.$clipboard=clipboard
Vue.prototype.$config = window.config
let theme = store.getters.editorTheme||window.config.editorTheme
store.commit('setEditorTheme',theme)
switch (theme){
  case 'dark':{
    enable({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
  }break;
  default:{
    disable()
  }break;
}
// 启动应用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

