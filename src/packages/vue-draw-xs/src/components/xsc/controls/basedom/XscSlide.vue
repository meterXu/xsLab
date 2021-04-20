<template>
  <div class="mtSlide">
    <div class="content">
      <div ref="pages" class="pages" :style="pagesStyle">
        <div class="page" v-for="(item,i) in slideList" :key="i" :style="pageStyle">
          <iframe v-if="item.url" class="page-iframe" :src="item.url"></iframe>
          <span v-else>{{item.text}}</span>
        </div>
      </div>
      <ul class="pagination" v-if="options.pagination">
        <li v-for="(item,i) in pageList" :key="i"><span class="circle" :style="circleStyle(i)" ></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addListener, removeListener } from 'resize-detector'
import TWEEN from '@tweenjs/tween.js'
export default {
  name: 'XscSlide',
  props: {
    options: Object,
    themeData: Object,
    theme: String
  },
  data () {
    return {
      x: 0,
      y: 0,
      payIndex: 0,
      intervalObj: null,
      width: null,
      height: null
    }
  },
  methods: {
    getSlideList () {
      let _slideList = []
      if (this.options && this.options.slides) {
        let _slides = this.options.slides.split('\n')
        _slides.forEach(c => {
          if (c) {
            if (c.indexOf('http') > -1 || c.indexOf('https') > -1) {
              _slideList.push({text: null, url: c})
            } else {
              _slideList.push({text: c, url: null})
            }
          }
        })
      }
      if (_slideList.length > 1) {
        _slideList.push(_slideList[0])
      }
      return _slideList
    },
    animate (time) {
      requestAnimationFrame(this.animate)
      TWEEN.update(time)
    },
    initPlay () {
      let that = this
      if (that.intervalObj) {
        TWEEN.remove(that.intervalObj)
      }
      if (that.slideList.length > 1) {
        requestAnimationFrame(this.animate)
        const coords = {marginLeft: that.x}
        that.intervalObj = new TWEEN.Tween(coords)
          .to({marginLeft: -that.width * that.payIndex}, that.payIndex === 0 ? 0 : 1000 * that.options.speed)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(() => {
            that.$refs.pages.style.setProperty('transform', `translate(${coords.marginLeft}px)`)
          })
          .onComplete(() => {
            that.x = -that.width * that.payIndex
            that.payIndex++
            if (that.payIndex >= that.slideList.length) {
              that.payIndex = 0
              that.x = 0
            }
            that.initPlay()
          })
        that.intervalObj.delay(that.payIndex === 0 ? 0 : 1000 * that.options.autoplay)
        that.intervalObj.start()
      }
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
    slideList () {
      return this.getSlideList()
    },
    pageList () {
      if (this.slideList.length <= 1) {
        return new Array(this.slideList.length)
      } else {
        return new Array(this.slideList.length - 1)
      }
    },
    pagesStyle () {
      return {
        'width': this.width * this.slideList.length + 'px'
      }
    },
    pageStyle () {
      return {
        'width': this.width + 'px'
      }
    },
    circleStyle () {
      let that = this
      return function (i) {
        if (that.payIndex === i + 1) {
          return {
            'background-color': this.options.pageColor.active || this.themeStyle.slide.pageColor.active
          }
        } else {
          return {
            'background-color': this.options.pageColor.normal || this.themeStyle.slide.pageColor.normal
          }
        }
      }
    }
  },
  watch: {
    options: {
      handler: function () {
        this.initPlay()
      },
      deep: true
    }
  },
  mounted () {
    this.getSlideList()
    this.width = this.$el.clientWidth
    this.height = this.$el.clientHeight
    this.initPlay()
    addListener(this.$el, () => {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
      this.initPlay()
    })
  },
  destroyed () {
    if (this.intervalObj) {
      TWEEN.remove(this.intervalObj)
    }
    removeListener(this.$el)
  }
}
</script>

<style scoped>
  .mtSlide{
    width: 100%;
    height: 100%;
  }
  .pages{
    height: 100%;
  }
  .content {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .page {
    height: 100%;
    text-align: center;
    font-size: 54px;
    float: left;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-iframe{
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
  }
  .pagination{
    position: absolute;
    margin: 0 auto;
    padding: 0;
    height: 30px;
    line-height: 30px;
    bottom: 0;
    right: 7px;
    width: fit-content;
  }
  .pagination li{
    min-width: 10px;
    list-style: none;
    display: inline-block;
    text-align: center;
    margin: 0 1px;
  }
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: #ddd;
  }
  .circle-active{
    background: #333;
  }
</style>
