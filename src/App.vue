<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import editorData from './data/editorData'
import mtEditor from './components/mtEditor'
import './assets/styles/ivu-dark.less'
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
      this.$ajax.post(this.commonConfig.baseUrl + this.commonConfig.actionUrl.getDataBaseList).then(c => {
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
  },
  mounted () {
     document.getElementsByTagName('html')[0].setAttribute('data-theme', this.commonConfig.editorTheme)
  }
}
</script>
