<template>
<div class="mtScale" ref="mtScale">
  <div class="ruler-container-top">
  </div>
  <div class="ruler-container-right">
  </div>
  <div ref="mtScale-container" class="mtScale-container" @contextmenu="(event)=>{event.preventDefault()}">
    <div ref="mtScale-content" class="mtScale-content" @contextmenu="contextmenu" @mouseup="mouseup" :style="mtScaleContentStyle">
      <div ref="mtScale-view" @dragstart="()=>{return false}" :style="'transform-origin: 0px 0px;transform: scale('+scale+')'">
        <slot v-bind:scale="scale"/>
      </div>
    </div>
  </div>
  <div class="mtScale-control">
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
    <div class="mtScale-control-item">
      <Icon :size="18" color="#909399" type="md-contract" title="适应画布" @click="fitCanvas"></Icon>
    </div>
    <div class="mtScale-control-item">
      <Icon :size="18" color="#909399" type="ios-navigate" title="导航"></Icon>
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
    },
    mtScaleContentStyle(){
      return {
        transform:`translate(${this.location.x}px, ${this.location.y}px)`
      }
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
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      if(mtCanvas){
        this.scale = parseFloat((mtScaleContainer.clientWidth/(mtCanvas.clientWidth+60)).toFixed(2))
        this.scale =this.scale>1?1:this.scale
        this.zoomLevel = this.getZoomLevel()
        this.resetLocation()
      }
    },
    contextmenu(){
      event.preventDefault()
      this.$refs['mtScale-view'].classList.add('cursor-move')
      const ownerRect = this.$refs['mtScale-content'].getBoundingClientRect()
      this.shift.x= event.clientX-ownerRect.left
      this.shift.y= event.clientY-ownerRect.top
      document.removeEventListener('mousemove',this.mousemove)
      document.addEventListener('mousemove',this.mousemove)
    },
    mousemove(event){
      const ownerRect = this.$refs['mtScale-container'].getBoundingClientRect()
      this.location.x = event.pageX-ownerRect.left-this.shift.x
      this.location.y = event.pageY-ownerRect.top-this.shift.y
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
      const mtScaleContainer = this.$refs['mtScale-container']
      const mtCanvas = this.$refs['mtScale-view'].children[0]
      if(mtCanvas){
        this.location.x=(mtScaleContainer.clientWidth-mtCanvas.clientWidth*this.scale)/2
        this.location.y=this.location.x>30?30:this.location.x
      }
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
  .mtScale-container{
    background: url("../../assets/scaleBg.png") repeat repeat;
    flex: 1;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    overflow: hidden;
    margin-left: 20px;
    margin-top: 20px;
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
</style>
