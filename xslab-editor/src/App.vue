<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mtEditor from './components/mtEditor'
import './assets/styles/ivu-dark.less'
import {getAction} from "@/request";
export default {
  name: 'App',
  components: {
    mtEditor
  },
  methods: {
    getDataBaseList () {
      getAction(this.action.getDataBaseList,{
        pageNumber:1,
        pageSize:9999
      }).then(res => {
        this.$store.commit('setDbList',res.data.rows)
      })
    }
  },
  created () {
    this.getDataBaseList()
    this.$Message.config({
      top: 80,
      duration: 3
    })
  },
  beforeDestroy() {
    this.$bus.$off()
  }
}
</script>
<style>
html,body,#app{
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
