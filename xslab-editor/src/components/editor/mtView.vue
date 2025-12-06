<template>
  <Xsc :options="options" :charts="charts" @updated="xscUpdated"></Xsc>
</template>

<script>

import {getAction} from "@/request";

export default {
  name: 'mtView',
  data () {
    return {
      options: null,
      charts: null
    }
  },
  methods: {
    xscUpdated (xscEl) {
      let outerPageStyle = this.$el.parentElement.parentElement.style
      outerPageStyle.backgroundColor = xscEl.style.backgroundColor
      outerPageStyle.backgroundImage = xscEl.style.backgroundImage
      outerPageStyle.backgroundSize = xscEl.style.backgroundSize
    }
  },
  mounted () {
    let that = this
    let id = this.$route.params.id
    getAction(this.action.getCanvasData, {
      id: id
    }).then(c => {
      if (c.data) {
        that.options = JSON.parse(c.data.options)
        that.charts = JSON.parse(c.data.data)
        document.title=this.options.name
      }
    })
  }
}
</script>

<style scoped>

</style>
