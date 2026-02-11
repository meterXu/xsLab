import Vue from 'vue'
import Router from 'vue-router'
import Editor from '../components/mtEditor'
import View from '../components/editor/mtView'
import Login from "@/Login.vue";
Vue.use(Router)

export default new Router({
  mode:'history',
  base:process.env.VUE_APP_BASE_URL,
  routes: [
    { path: '/view/:id', name: 'Dashboard',component: View,meta:{requireAuth:false}},
    { path: '/login', name: 'Login',component: Login},
    { path:"/", redirect:'/index'},
    { path: '/index',name: 'Index', component: Editor },
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: { name: 'Login' } },
  ]
})
