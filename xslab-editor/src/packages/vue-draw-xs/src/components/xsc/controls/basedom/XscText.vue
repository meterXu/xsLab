<template>
    <div class="d_box_style" :style="boxStyle">
      <span :style="textStyle">{{showTextValue}}</span>
    </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: 'XscText',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  data(){
    return {
      tweened:{value:0},
    }
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
        'font-style': this.options.text.fontStyle,
        'color': this.options.text.color || this.themeStyle.text.text.color,
        'background':this.options.text['background'],
        'background-clip':this.options.text['background-clip'],
        'text-fill-color':this.options.text['text-fill-color'],
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
    },
    textValue(){
      return this.options.text.content
    },
    showTextValue(){
      return this.tweened.value?this.tweened.value.toFixed(0):this.options.text.content
    }
  },
  watch:{
    textValue:{
      handler(nv){
        if(this.options.text.animation){
          gsap.to(this.tweened, { duration: 0.5, value:Number(nv)||0})
        }else{
          this.tweened.value=0
        }
      },
      immediate:true
    },

  }
}
</script>

<style scoped>
  .d_box_style{
    width: 100%;
    height: 100%;
  }
</style>
