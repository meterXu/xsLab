<template>
<div class="mtScale" ref="mtScale">
  <template v-if="isRuler">
    <div class="ruler-container-top">
      <canvas style="width: 100%;height: 100%"></canvas>
    </div>
    <div class="ruler-container-right">
      <canvas style="width: 100%;height: 100%"></canvas>
    </div>
  </template>
  <div ref="mtScale-container" :class="{'mtScale-container':true, 'mtScale-has-ruler':this.isRuler}"  @contextmenu="(event)=>{event.preventDefault()}">
    <div ref="mtScale-content" class="mtScale-content" @contextmenu="contextmenu" @mouseup="mouseup" :style="mtScaleContentStyle">
      <div ref="mtScale-view" @dragstart="()=>{return false}" class="mtScale-view" :style="'transform-origin: 0px 0px;transform: scale('+scale+')'">
        <slot v-bind:scale="scale"/>
      </div>
    </div>
    <div v-if="isRuler" class="ruler-content">
      <div v-for="(item,index) in lines" :key="index" class="ruler-item" @mousedown="lineMouseDown(item)" @mouseup="removeLineMouseMove" :style="'left: '+item.x+'px;'">
        <span class="ruler-text">{{item.canvasX}}px,{{item.x}}</span>
        <div class="ruler-line"></div>
      </div>
    </div>
  </div>
  <div class="mtScale-control">
    <template v-if="isScale">
      <div class="mtScale-control-item" style="text-align: center">
        <Icon @click="zoomOut" style="position: relative;top: -1px;margin-right: 3px" :size="14" color="#E6A23C" type="ios-remove-circle"></Icon>
        <Dropdown placement="top" @on-click="percentageChange">
          <a href="javascript:void(0)">
            {{percentage}}
          </a>
          <Dropdown-menu slot="list">
            <Dropdown-item v-for="item in scaleList" :name="item" :key="item">{{`${item*100}%`}}</Dropdown-item>
            <Dropdown-item divided name="fitCanvas">适应画布</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
        <Icon @click="zoomIn" style="position: relative;top: -1px;margin-left: 3px" color="#67C23A" :size="14" type="ios-add-circle"></Icon>
      </div>
      <div class="mtScale-control-item">
        <Icon :size="18" color="#909399" type="md-expand" title="100%" @click="fullCanvas"></Icon>
      </div>
      <div  class="mtScale-control-item">
        <Icon :size="18" color="#909399" type="md-contract" title="适应画布" @click="fitCanvas"></Icon>
      </div>
    </template>
    <div v-if="isNavigate" class="mtScale-control-item">
      <Icon :size="18" color="#909399" type="ios-navigate" title="导航"></Icon>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'mtScale',
  props:['isRuler','isScale','isDrag','isNavigate'],
  data(){
    return {
      scale:1,
      scaleList:[0.1, 0.25, 0.33, 0.5, 0.75, 1, 2, 3, 4],
      zoomLevel:5,
      location:{
        x:0,
        y:0
      },
      shift:{
        x:0,
        y:0
      },
      lines:[{
        x:24,
        canvasX:0
      }],
      moveLine:null
    }
  },
  computed:{
    ...mapGetters(['activeNode']),
    percentage(){
      return `${this.scale*100}%`
    },
    mtScaleContentStyle(){
      return {
        transform:`translate(${this.location.x}px, ${this.location.y}px)`
      }
    }
  },
  watch:{
    scale(nv,ov){
      this.lines.forEach(l=>{
        l.x = l.canvasX*nv
      })
    }

  },
  methods:{
    percentageChange(nv){
      switch (nv){
        case 'fitCanvas':{
          this.fitCanvas()
        }break;
        default:{
          this.scale = nv
          this.zoomLevel = this.getZoomLevel()
        }break;
      }
    },
    fitCanvas(){
      // const mtScaleContainer = this.$refs['mtScale-container']
      // const mtCanvas = this.$refs['mtScale-view'].children[0]
      // if(mtCanvas){
      //   this.scale = parseFloat((mtScaleContainer.clientWidth/(mtCanvas.clientWidth+60)).toFixed(2))
      //   this.scale =this.scale>1?1:this.scale
      //   this.zoomLevel = this.getZoomLevel()
      //   this.resetLocation()
      // }
    },
    contextmenu(){
      event.preventDefault()
      if(this.isDrag){
        this.$refs['mtScale-view'].classList.add('cursor-move')
        const ownerRect = this.$refs['mtScale-content'].getBoundingClientRect()
        this.shift.x= event.clientX-ownerRect.left
        this.shift.y= event.clientY-ownerRect.top
        document.removeEventListener('mousemove',this.mousemove)
        document.addEventListener('mousemove',this.mousemove)
      }
    },
    lineMouseDown(line){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.shift.x= ownerRect.left
      this.shift.y= ownerRect.top
      this.moveLine  = line
      document.removeEventListener('mousemove',this.lineMousemove)
      document.addEventListener('mousemove',this.lineMousemove)
    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = event.pageX-ownerRect.left-this.shift.x
      this.location.y = event.pageY-ownerRect.top-this.shift.y
    },
    lineMousemove(event){
      this.moveLine.x = parseInt(event.pageX-this.shift.x)
      this.moveLine.canvasX = parseInt(this.moveLine.x-this.location.x)
    },
    removeLineMouseMove(){
      document.removeEventListener('mousemove',this.lineMousemove)
    },
    mouseup(){
      this.$refs['mtScale-view'].classList.remove('cursor-move')
      document.removeEventListener('mousemove',this.mousemove)
    },
    fullCanvas(){
      this.scale = 1
      this.zoomLevel = 5
    },
    getZoomLevel(){
      let level = 0
      this.scaleList.forEach((n,i)=>{
        if(this.scale>=n){
          level = i
          return;
        }
      })
      return level
    },
    zoomOut(){
      this.zoomLevel--
      if(this.zoomLevel<5){
        this.scale = (this.zoomLevel-1)*0.25
        this.scale = this.scale<=0.25?0.25:this.scale
        this.zoomLevel = this.zoomLevel<=0?0:this.zoomLevel
      }else{
        this.scale = 4*0.25+(this.zoomLevel-5)*0.5
      }
    },
    zoomIn(){
      this.zoomLevel++
      if(this.zoomLevel<5){
        this.scale = (this.zoomLevel-1)*0.25
        this.scale = this.scale<=0.25?0.25:this.scale
      }else{
        this.scale = 4*0.25+(this.zoomLevel-5)*0.5
        this.scale = this.scale>=4?4:this.scale
        this.zoomLevel = this.zoomLevel>=11?11:this.zoomLevel
      }
    },
    resetLocation(){
      // const mtScaleContainer = this.$refs['mtScale-container']
      // const mtCanvas = this.$refs['mtScale-view'].children[0]
      // if(mtCanvas){
      //   this.location.x=(mtScaleContainer.clientWidth-mtCanvas.clientWidth*this.scale)/2
      //   this.location.y=this.location.x>30?30:this.location.x
      // }
    }
  }
}
</script>

<style scoped>
  .mtScale{
    position: relative;
    overflow: hidden;
    flex: 1;
    display: inline-flex;
    flex-flow: column;
    justify-content: flex-start;
    background-color: #909399;
  }
  .mtScale-view{
    transition: all ease 0.3s;
  }
  .mtScale-container{
    background: url("../../assets/scaleBg.png") repeat repeat;
    flex: 1;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .mtScale-has-ruler{
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin-left: 20px;
    margin-top: 20px;
  }
  .mtScale-control{
    width: 100%;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    z-index: 10000;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-top: 1px solid #d7dae2;
    background-color: #fff;
    text-align: right;
  }
  .mtScale-control-item{
    display: inline-block;
    cursor: pointer;
  }
  .mtScale-control-item+.mtScale-control-item{
    margin-left: 10px;
  }
  .ruler-container-top,.ruler-container-right{
    box-sizing: border-box;
    border-color: #333333;
  }
  .ruler-container-top{
    height: 20px;
    position:absolute;
    top: 0;
    left: 20px;
    right:0;
    background: #909399;
    z-index: 2;
    border-left: 1px solid;
  }
  .ruler-container-right{
    width: 20px;
    position:absolute;
    top: 20px;
    left: 0;
    bottom:0;
    background: #909399;
    z-index: 2;
    border-top: 1px solid;
  }
  .cursor-move{
    cursor: move;
  }
  .ruler-content{
    z-index: 9999;
  }
  .ruler-item{
    position: absolute;
    top: 0px;
    height: 100%;
    cursor: ew-resize;
  }
  .ruler-text{
    color: #409EFF;
    text-indent: 4px;
    position: absolute;
    user-select:none;
  }
  .ruler-line{
    width: 1px;
    height: 100%;
    background-color: #409EFF
  }
</style>
