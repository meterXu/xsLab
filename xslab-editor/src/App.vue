<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mtEditor from './components/mtEditor'
import './assets/styles/ivu-dark.less'
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {
    mtEditor
  },
  methods: {
    getDataBaseList () {
      this.$ajax.post(this.action.getDataBaseList).then(c => {
        this.$store.commit('setDbList',c.data)
      })
    }
  },
  computed:{
    ...mapGetters(['config'])
  },
  created () {
    this.getDataBaseList()
    this.$Message.config({
      top: 80,
      duration: 3
    })
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
