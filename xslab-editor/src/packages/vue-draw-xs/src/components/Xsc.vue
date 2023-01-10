<template>
  <div :style="view?'display: block':'display: inline-block'">
    <div ref="mt_canvas" @drop="drop" @dragover="dragover" @click="canvasClick" :style="canvasStyle" :class="['mt_canvas', {mt_canvas_position:view}]">
      <template v-for="item in charts">
        <XscNode :ref="item.id"
                 :key="item.id"
                 :node="item"
                 :view="view"
                 :class="[view?'mt_node_view':(item===activeNode ? 'mt_node_active': 'mt_node_base'),'dragging']"
                 @click.native="nodeClick(item)"
                 @contextmenu.native="contextmenu(item)"
                 @mousedown.native="itemMousedown(item)"
                 @mouseup.native="removeMouseMove"
                 @dragstart="()=>{return false}"
                 >
          <template v-if="item.type==='dev'" v-slot:[item.config.options.key]>
            <slot :name="item.config.options.key"></slot>
          </template>
          <template v-slot:resize>
          <span @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(item,'chart')" @mouseup="removeChangeSizeMouseMove">
            <Button ref="resize" v-if="!view&&item===activeNode" class="node_resize" shape="circle" icon="ios-resize"></Button>
          </span>
          </template>
        </XscNode>
      </template>
      <slot></slot>
    </div>
    <span @dragstart="()=>{return false}" @mousedown="changeSizeSizeMousedown(options,'canvas')" @mouseup="removeChangeSizeMouseMove">
      <Button ref="resize" v-if="!view&&activeNode&&activeNode.chart==='canvas'" class="node_resize" shape="circle" icon="ios-resize"></Button>
    </span>
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
    scale:Number,
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
      startDrag: false,
      dragNode:null,
      shift:{
        x:0,
        y:0,
        type:null
      }
    }
  },
  watch:{
    charts:{
      immediate:true,
      handler(){
        this.$nextTick(()=>{
          this.$emit('loaded')
        })
      }
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
    removeMouseMove(){
      event.stopPropagation()
      document.removeEventListener('mousemove',this.nodeMousemove)
    },
    removeChangeSizeMouseMove(){
      event.stopPropagation()
      document.removeEventListener('mousemove',this.changeSizeMousemove)
    },
    itemMousedown(node){
      event.stopPropagation()
      if(!this.view){
        this.activeNode = node
        let clickBox = event.currentTarget.getBoundingClientRect()
        this.dragNode = this.charts.find(c => c.id === node.id)
        this.shift.x = event.clientX-clickBox.left
        this.shift.y = event.clientY-clickBox.top
        document.removeEventListener('mousemove',this.nodeMousemove)
        document.addEventListener('mousemove',this.nodeMousemove)
      }
    },
    nodeMousemove(event){
      event.stopPropagation()
      if(!this.view){
        const ownerRect = this.$refs.mt_canvas.getBoundingClientRect()
        this.dragNode.config.box.x = parseInt((event.pageX-ownerRect.left-this.shift.x)/this.scale)
        this.dragNode.config.box.y = parseInt((event.pageY-ownerRect.top-this.shift.y)/this.scale)
      }
    },
    changeSizeSizeMousedown(node,type){
      event.stopPropagation()
      if(!this.view){
        this.dragNode = node
        this.shift.type=type
        switch (type){
          case 'chart':{
            let clickBoxWeight = event.currentTarget.parentElement.offsetWidth;
            let clickBoxHeight = event.currentTarget.parentElement.offsetHeight;
            this.shift.x = parseInt(clickBoxWeight*this.scale)-event.clientX
            this.shift.y = parseInt(clickBoxHeight*this.scale)-event.clientY
            document.removeEventListener('mousemove',this.changeSizeMousemove)
            document.addEventListener('mousemove',this.changeSizeMousemove)
          }break
          case 'canvas':{
            let clickBoxWeight = event.currentTarget.previousSibling.offsetWidth;
            let clickBoxHeight = event.currentTarget.previousSibling.offsetHeight;
            this.shift.x = parseInt(clickBoxWeight*this.scale)-event.clientX
            this.shift.y = parseInt(clickBoxHeight*this.scale)-event.clientY
            document.removeEventListener('mousemove',this.changeSizeMousemove)
            document.addEventListener('mousemove',this.changeSizeMousemove)
          }break
        }
      }
    },
    changeSizeMousemove(event){
      switch (this.shift.type){
        case 'chart':{
          this.dragNode.config.box.width = parseInt((event.pageX+this.shift.x)/this.scale)
          this.dragNode.config.box.height = parseInt((event.pageY+this.shift.y)/this.scale)
        }break
        case 'canvas':{
          console.log(event.pageX)
          console.log(this.shift.x)
          console.log(this.shift.y)
          this.dragNode.width = parseInt((event.pageX+this.shift.x)/this.scale)
          this.dragNode.height = parseInt((event.pageY+this.shift.y)/this.scale)
        }break
      }
    },
    drop () {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
        this.$emit('drop')
        this.activeNode = this.charts[this.charts.length - 1]
        this.$emit('nodeActive')
      }
    },
    dragover () {
      if (!this.view) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    canvasClick () {
      event.stopPropagation()
      if(!this.view){
        this.activeNode = {
          type: 'dom',
          chart: 'canvas',
          config: {
            options: this.options
          }
        }
        this.$emit('nodeActive')
      }
    },
    nodeClick (node) {
      event.stopPropagation()
      this.activeNode = node
      if(!this.view){
        this.$emit('nodeActive')
      }
    },
    contextmenu (node) {
      event.preventDefault()
      event.stopPropagation()
      if (!this.view) {
        this.$emit('contextmenu', {
          x: node.config.box.x + event.offsetX,
          y: node.config.box.y + event.offsetY,
          id: node.id
        })
      }
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
  }
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .node_resize{
    cursor: nwse-resize;
    float: right;
    width: 24px;
    height: 24px;
    transform: rotate(268deg);
    margin-right: -21px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .dragging{
    cursor: move;
  }
</style>
