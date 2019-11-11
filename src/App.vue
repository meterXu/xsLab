<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import editorData from './data/editorData'
import mtEditor from './components/mtEditor'
export default {
  name: 'App',
  components: {
    mtEditor
  },
  data () {
    return {
      editorData: editorData
    }
  },
  methods: {
    getDataBaseList () {
      this.$ajax.post(this.$baseConfig.baseUrl + this.$baseConfig.actionUrl.getDataBaseList).then(c => {
        this.editorData.databaseList = c.data
      })
    }
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

<style scoped>
</style>
