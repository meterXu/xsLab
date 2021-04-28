<template>
  <Xsc :options="options" :charts="charts" @updated="xscUpdated"></Xsc>
</template>

<script>
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
    this.$ajax.post(this.config.action.GetCanvasData, {
      canvasOid: id
    }).then(c => {
      if (c.data) {
        that.options = JSON.parse(c.data.cavOptions)
        that.charts = JSON.parse(c.data.cavData)
      }
    })
  }
}
</script>

<style scoped>

</style>
