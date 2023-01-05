<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mtEditor from './components/mtEditor'
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
        const storeDbs = res.data.rows.map(c=>{
          c.value = c.id
          c.text = c.name
          return c
        })
        this.$store.commit('setDbList',storeDbs)
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
