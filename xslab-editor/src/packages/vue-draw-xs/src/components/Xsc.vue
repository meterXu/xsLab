<template>
  <div @drop="drop" @dragover="dragover" @click="canvasClick" :style="canvasStyle" :class="['mt_canvas', {mt_canvas_position:view}]">
    <template v-for="item in charts">
      <XscNode :ref="item.id"
               :key="item.id"
               :node="item"
               :view="view"
               :class="[view?'mt_node_view':(item===activeNode ? 'mt_node_active': 'mt_node_base'),startDrag&&'dragging']"
               @nodeClick="nodeClick"
               @contextmenu="contextmenu"
               @mousedown="itemMousedown">
               <template v-if="item.type==='dev'" v-slot:[item.config.options.key]>
                  <slot :name="item.config.options.key"></slot>
               </template>
        <template v-slot:resize>
          <span  @mousedown="reSizeMousedown(item)">
            <Button ref="resize" v-if="!view&&item===activeNode" class="node_resize" shape="circle" icon="ios-resize"></Button>
          </span>
        </template>
      </XscNode>
    </template>
    <slot></slot>
  </div>
</template>
<script>
import 'iview/dist/styles/iview.css'
import XscNode from './xsc/XscNode'
import commonData from '../data/commonData'
import {Button} from 'iview'
export default {
  name: 'Xsc',
  components: {
    XscNode,
    Button
  },
  props: {
    charts: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    view: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      commonData: commonData,
      activeNode: null, // 活动的节点
      startDrag: false
    }
  },
  computed: {
    themeStyle () {
      if (this.commonData.themeData) {
        return this.commonData.themeData[(this.options === undefined || this.options === null) ? 'light' : this.options.theme || 'light']
      } else {
        return null
      }
    },
    canvasStyle () { // 画布样式
      if (this.options) {
        return {
          width: this.options.width + 'px',
          height: this.options.height + 'px',
          'background-color': this.options.backgroundColor || this.themeStyle.canvas.backgroundColor,
          'background-image': 'url(\'' + this.options.backgroundImage + '\')',
          'background-size': this.options.backgroundSize,
          'background-repeat': this.options.backgroundRepeat
        }
      } else {
        return {
          width: '1000px',
          height: '500px',
          'background-color': null
        }
      }
    }
  },
  methods: {
    itemMousedown(node){
      if(!this.view){
        event.stopPropagation()
        let direction = 'drag';
        let clickBox = event.currentTarget
        this.nodeViewChange(clickBox,direction,node);
      }
    },
    reSizeMousedown(node){
      if(!this.view){
        event.stopPropagation()
        let direction = 'rightBottomCorner';
        let clickBox = event.currentTarget.parentElement
        this.nodeViewChange(clickBox,direction,node);
      }
    },
    nodeViewChange(clickBox,direction,node){
      this.activeNode = node
      if(this.activeNode){
        let dragNode = this.charts.find(c => c.id === this.activeNode.id)
        let mouseDownX = event.pageX;
        let mouseDownY = event.pageY;
        let clickBoxLeft = clickBox.offsetLeft;
        let clickBoxTop = clickBox.offsetTop;
        let clickBoxWeight = clickBox.offsetWidth;
        let clickBoxHeight = clickBox.offsetHeight;
        document.onmousemove = function(e) {
          e =e||event;
          let xx = e.clientX;
          let yy = e.clientY;
          if (direction === 'rightBottomCorner'){
            dragNode.config.box.width = clickBoxWeight +xx-mouseDownX
            dragNode.config.box.height = clickBoxHeight +yy-mouseDownY
          }else if(direction === "drag"){
            dragNode.config.box.x = xx-mouseDownX+clickBoxLeft
            dragNode.config.box.y = yy-mouseDownY+clickBoxTop
          }
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
      if (event.preventDefault){
        event.preventDefault();
      }
    },
    drop () {
      if (!this.view) {
        event.preventDefault()
        this.$emit('drop')
        this.activeNode = this.charts[this.charts.length - 1]
        this.$emit('nodeActive')
      }
    },
    dragover () {
      if (!this.view) {
        event.preventDefault()
        if (this.activeNode) {
          this.startDrag = false
          let dragNode = this.charts.find(c => c.id === this.activeNode.id)
          if (dragNode) {
            let rbpars = {scrollx: 0, scrolly: 0, offsetx: 0, offsety: 0}
            if (event.currentTarget.parentElement) {
              rbpars.scrollx = event.currentTarget.parentElement.scrollLeft
              rbpars.scrolly = event.currentTarget.parentElement.scrollTop
              rbpars.offsetx = event.currentTarget.parentElement.offsetLeft
              rbpars.offsety = event.currentTarget.parentElement.offsetTop
            }
            dragNode.config.box.x = event.pageX - dragNode.config.box.width / 2 - rbpars.offsetx + rbpars.scrollx
            dragNode.config.box.y = event.pageY - dragNode.config.box.height / 2 - rbpars.offsety + rbpars.scrolly
          }
        }
      }
    },
    dragStart (node) {
      this.activeNode = node
      this.$emit('nodeActive')
      this.startDrag = true
    },
    canvasClick () {
      this.activeNode = {
        type: 'dom',
        chart: 'canvas',
        config: {
          options: this.options
        }
      }
      this.$emit('nodeActive')
    },
    nodeClick (node) {
      this.activeNode = node
      this.$emit('nodeActive')
    },
    contextmenu (obj) {
      this.$emit('contextmenu', obj)
    },
    getDataConf (id) {
      if (id) {
        let xscNode = this.charts.find(c => c.id === id)
        if (xscNode) {
          return xscNode.config.data
        } else {
          return null
        }
      } else {
        return null
      }
    },
    update (id) {
      let that = this
      let warnMsgs = null
      let errors = null
      return new Promise((resolve, reject) => {
        if (id) {
          that.$refs[id][0].update().then(warnData => {
            if (resolve) {
              warnMsgs = {id: id, warns: warnData}
              resolve(warnMsgs)
            }
          }).catch(c => {
            if (reject) {
              errors = {id: id, error: c}
              reject(errors)
            }
          })
        } else {
          let keys = Object.keys(that.$refs)
          let resIndex = 0
          keys.map(key => {
            that.$refs[key][0].update().then(warnData => {
              resIndex = resIndex + 1
              warnMsgs = {id: key, warns: warnData}
              if (resIndex === keys.length) {
                if (resolve) {
                  resolve(warnMsgs)
                }
              }
            }).catch(c => {
              resIndex = resIndex + 1
              errors = {id: key, error: c}
              if (resIndex === keys.length) {
                if (reject) {
                  reject(errors)
                }
              }
            })
          })
        }
      })
    },
    getData (id) {
      let that = this
      let datas = null
      let errors = null
      return new Promise((resolve, reject) => {
        if (id) {
          that.$refs[id][0].getNodeData().then(data => {
            datas = {id: id, data: data}
            if (resolve) {
              resolve(datas)
            }
          }).catch(c => {
            errors = {id: id, error: c}
            if (reject) {
              reject(errors)
            }
          })
        } else {
          let keys = Object.keys(that.$refs)
          let resIndex = 0
          keys.map(key => {
            that.$refs[key][0].getNodeData().then(data => {
              resIndex = resIndex + 1
              datas = {id: key, data: data}
              if (resIndex === keys.length) {
                if (resolve) {
                  resolve(datas)
                }
              }
            }).catch(c => {
              resIndex = resIndex + 1
              errors = {id: key, error: c}
              if (resIndex === keys.length) {
                if (reject) {
                  reject(errors)
                }
              }
            })
          })
        }
      })
    }
  },
  updated () {
    this.$emit('updated', this.$el)
  },
}
</script>

<style scoped>
  .mt_canvas{
    position: relative;
    width: 500px;
    height: 500px;
    background: #fff;
    background-size: auto;
    background-repeat: repeat;
  }
  .mt_canvas_position {
    margin: 0 auto;
  }
  .mt_node_base{
    box-sizing: content-box;
    border: 1px dashed #000;
  }
  .mt_node_view{
    box-sizing: content-box;
    border: 0px solid rgba(0,0,0,0);
  }
  .mt_node_active{
    box-sizing: content-box;
    border: 1px dashed #2d8cf0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .node_resize{
    cursor: se-resize;
    float: right;
    width: 24px;
    height: 24px;
    transform: rotate(268deg);
    margin-right: -21px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .dragging{
    opacity: 0;
  }
</style>
