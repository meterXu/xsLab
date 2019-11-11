<template>
<div id="mtScale" ref="mtScale" :style="scaleStyle">
    <slot name="content"/>
</div>
</template>

<script>
export default {
  name: 'mtScale',
  computed: {
    scaleStyle () {
      if (this.$parent.opNode) {
        return {
          right: '280px'
        }
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>
  #mtScale{
    position: absolute;
    top: 50px;
    left: 200px;
    bottom: 0;
    right: 0px;
    background: url("../../assets/scaleBg.png") repeat repeat;
    overflow: auto;
  }
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:11px;
    height:11px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:0px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:0px;
    background:#939393;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:#fd5f5f;
  }
  ::-webkit-scrollbar-corner{
    background: none
  }
</style>
