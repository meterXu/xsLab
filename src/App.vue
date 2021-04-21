<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import editorData from './data/editorData'
import mtEditor from './components/mtEditor'
import './assets/styles/ivu-dark.less'
import axios from 'axios'
import config from './config/config'
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
    if(!config.baseUrl){
      axios.get('./config.json').then(res=>{
        config.baseUrl = res.data.baseUrl || 'http://localhost:11525'
        this.getDataBaseList()
      })
    }
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
