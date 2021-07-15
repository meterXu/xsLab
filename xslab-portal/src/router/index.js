import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import XSLab from '@/components/XSLab'
import Doc from '@/components/Doc'
import DocBody from '@/components/DocBody'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/xc_xslab',
      name: 'XSLab',
      component: XSLab
    },
    {
      path: '/xc_doc/:type',
      name: 'Doc',
      component: Doc,
      props: true,
      children: [
        {
          name: 'DocBody',
          path: 'body/:id/:html',
          component: DocBody,
          props: true
        }
      ]
    }
  ]
})
