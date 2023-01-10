<template>
    <div class="d_box_style" :style="boxStyle">
      <span :style="textStyle">{{options.text.content}}</span>
    </div>
</template>

<script>
export default {
  name: 'XscText',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  computed: {
    themeStyle () {
      if (this.themeData && this.theme) {
        return this.themeData[this.theme || 'light']
      } else {
        return null
      }
    },
    textStyle () {
      return {
        'font-size': this.options.text.fontSize + 'px',
        'font-family': this.options.text.fontFamily,
        'font-weight': this.options.text.fontWeight,
        'color': this.options.text.color || this.themeStyle.text.text.color,
        'user-select':'none'
      }
    },
    boxStyle () {
      return {
        'line-height': this.options.boxSpace.lineHeight + 'px',
        'text-align': this.options.boxSpace.textAlign,
        'background-color': this.options.background.color || this.themeStyle.text.background.color,
        'border-width': this.options.border.width + 'px',
        'border-top-style': this.options.border.style,
        'border-bottom-style': this.options.border.style,
        'border-left-style': this.options.border.style,
        'border-right-style': this.options.border.style,
        'border-color': this.options.border.color || this.themeStyle.text.border.color
      }
    }
  }
}
</script>

<style scoped>
  .d_box_style{
    width: 100%;
    height: 100%;
  }
</style>
