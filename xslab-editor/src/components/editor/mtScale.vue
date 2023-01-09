<template>
<div class="mtScale" ref="mtScale">
<!--  <div style="height: 30px;position:absolute;top: 0px;left: 0;right:0;background: #333">-->
<!--  </div>-->
<!--  <div style="width: 30px;position:absolute;top: 0px;left: 0;bottom:0;background: #333">-->
<!--  </div>-->
  <div class="mtScale-container" @mousemove="mousemove" @mouseout="mouseout">
    <div @mousedown="mousedown" @mouseup="mouseup" :style="'transform: translate('+location.x+'px, '+location.y+'px)'">
      <div @dragstart="()=>{return false}" :style="'transform-origin: 0px 0px;transform: scale('+scale+')'">
        <slot/>
      </div>
    </div>
  </div>
  <div class="mtScale-control">
    <div class="mtScale-control-item" style="text-align: center">
      <Icon @click="zoomOut" style="position: relative;top: -1px;margin-right: 3px" :size="14" color="#F56C6C" type="ios-remove-circle"></Icon>
      <Dropdown placement="top" @on-click="percentageChange">
        <a href="javascript:void(0)">
          {{percentage}}
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item v-for="item in scaleList" :name="item" :key="item">{{`${item*100}%`}}</Dropdown-item>
          <Dropdown-item divided name="fitCanvas">适应画布</Dropdown-item>
          <Dropdown-item name="fitSelect">适应选区</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
      <Icon @click="zoomIn" style="position: relative;top: -1px;margin-left: 3px" color="#67C23A" :size="14" type="ios-add-circle"></Icon>
    </div>
    <div class="mtScale-control-item">
      <Icon :size="18" type="md-contract" title="适应画布" @click="fitCanvas"></Icon>
    </div>
    <div class="mtScale-control-item">
      <Icon :size="18" type="md-expand" title="100%" @click="fullCanvas"></Icon>
    </div>
    <div class="mtScale-control-item">
      <Icon :size="18" type="ios-navigate" title="导航"></Icon>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'mtScale',
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
      }
    }
  },
  computed:{
    ...mapGetters(['activeNode']),
    percentage(){
      return `${this.scale*100}%`
    }
  },
  methods:{
    percentageChange(nv){
      switch (nv){
        case 'fitCanvas':{
          this.fitCanvas()
        }break;
        case 'fitSelect':{
          this.fitSelect()
        }break;
        default:{
          this.scale = nv
          this.zoomLevel = this.getZoomLevel()
        }break;
      }
    },
    fitCanvas(){
      const mtScaleContainer = document.getElementsByClassName('mtScale-container')[0]
      const mtCanvas = document.getElementsByClassName('mt_canvas')[0]
      this.scale = parseFloat((mtScaleContainer.clientWidth/(mtCanvas.clientWidth+60)).toFixed(2))
      this.scale =this.scale>1?1:this.scale
      this.zoomLevel = this.getZoomLevel()
      this.resetLocation()
    },
    fitSelect(){
      const mtCanvas = document.getElementsByClassName('mt_canvas')[0]
      this.scale = parseFloat((mtCanvas.clientWidth/this.activeNode.config.box.width+60).toFixed(2))
      this.zoomLevel = this.getZoomLevel()
      this.resetLocation()
    },
    mousedown(){
      this.draggable = true
      this.shift.x= parseInt(event.offsetX*this.scale)
      this.shift.y= parseInt(event.offsetY*this.scale)
    },
    mousemove(){
      if(this.draggable){
        this.location.x = event.layerX-this.shift.x
        this.location.y = event.layerY-this.shift.y
      }
    },
    mouseout(){
      console.log(event.layerX)
      if(this.draggable){
        this.location.x = event.layerX-this.shift.x
        this.location.y = event.layerY-this.shift.y
      }
    },
    mouseup(){
      this.draggable = false
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
      const mtScaleContainer = document.getElementsByClassName('mtScale-container')[0]
      const mtCanvas = document.getElementsByClassName('mt_canvas')[0]
      this.location.x=(mtScaleContainer.clientWidth-mtCanvas.clientWidth*this.scale)/2
      this.location.y=this.location.x>30?30:this.location.x
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
    background: url("../../assets/scaleBg.png") repeat repeat;
  }
  .mtScale-container{
    flex: 1;
    /*width: calc(100% - 30px);*/
    /*height: calc(100% - 30px);*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*margin-left: 30px;*/
    /*margin-top: 30px;*/
  }
  .mtScale-control{
    width: 100%;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    z-index: 2;
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
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:6px;
    height:6px;
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
