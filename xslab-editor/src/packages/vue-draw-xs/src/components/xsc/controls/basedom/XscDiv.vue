<template>
  <div class="d_mtDiv" :style="divStyle">
  </div>
</template>

<script>
export default {
  name: 'XscDiv',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  computed: {
    divStyle () {
      return {
        'background-color': this.options.backgroundColor,
        'background-image': 'url(\'' + this.options.backgroundImg + '\')',
        'background-size': this.options.backgroundSize,
        'background-repeat': this.options.backgroundRepeat,
        'border': this.options.borderWidth + 'px ' + this.options.borderStyle + ' ' + this.options.borderColor
      }
    }
  }
}
</script>

<style scoped>
  .d_mtDiv{
    width: 100%;
    height: 100%;
  }
</style>
