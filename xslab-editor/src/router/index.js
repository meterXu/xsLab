import Vue from 'vue'
import Router from 'vue-router'
import Editor from '../components/mtEditor'
import View from '../components/editor/mtView'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/view/:id', component: View },
    { path: '/', component: Editor }
  ]
})
