<template>
    <header class="header">
      <div class="header-con">
        <div class="block_header">
          <div class="logo"></div>
          <div class="title">XSLab</div>
        </div>
        <Divider type="vertical" />
        <div class="mtCanvasTool">
          <ButtonGroup>
            <Button title="打开画布" icon="ios-browsers" @click="openCanvas">打开</Button>
            <Button title="新增画布" icon="md-add" @click="addCanvas">新增</Button>
            <Button title="删除画布" icon="md-trash" @click="delCanvas">删除</Button>
            <Button title="查看画布" icon="md-eye" @click="viewCanvas">查看</Button>
            <Button title="获取链接" icon="ios-link" @click="getCanvasUrl">分享</Button>
<!--            <Button title="下载画布" icon="md-arrow-down" @click="openDownModal" :disabled="isDisableDownload">下载</Button>-->
          </ButtonGroup>
        </div>
        <div class="mtEditorTool">
          <Button size="small"
                  shape="circle"
                  type="success"
                  title="管理数据源"
                  custom-icon="icon-database"
                  @click="dbManager"
                  :replace="true" class="header-icon-btn"></Button>
          <Button size="small"
                  shape="circle"
                  v-if="showBackCanvas"
                  title="返回画布"
                  @click="backCanvas"
                  :replace="true"
                  class="header-icon-btn"
                  custom-icon="icon-delicious"></Button>
          <Button size="small"
                  title="系统设置"
                  icon="ios-construct"
                  @click="dbSetting"
                  shape="circle" class="header-icon-btn"></Button>
        </div>
      </div>
      <div class="header-con">
        <template v-if="activeNode&&activeNode.id">
          <div class="mtCanvasName" style="color: #00bcd4">id:{{activeNode.id}}</div>
          <Divider type="vertical" />
        </template>
        <div class="mtCanvasName"><span>{{canvasName||'需要画布进行操作'}}</span></div>
        <template v-if="canvasName">
          <Divider type="vertical" />
          <Icon title="查看JSON"
                custom="iconfont icon-json"
                class="viewJson"
                @click="viewJson"/>
          <div class="mtCanvasInfo">
            <div class="mtCanvasState">
              <ButtonGroup>
                <Button v-if="canvasState===1" type="success" size="small" icon="md-checkmark">{{canvasState | fmCanvasState}}</Button>
                <Button v-else-if="canvasState===0" @click="saveOptionsConf" type="primary" size="small" icon="ios-medical">{{canvasState | fmCanvasState}}</Button>
                <Button v-else-if="canvasState===-1" type="primary" loading size="small">{{canvasState | fmCanvasState}}</Button>
                <Button v-if="canvasName" size="small" icon="md-refresh" @click="resetCanvas">重置</Button>
              </ButtonGroup>
            </div>
          </div>
        </template>

      </div>
      <Modal :width="1000"
             v-model="isShowJson"
             :mask-closable="true"
             :footer-hide="true"
             title="查看JSON">
        <div class="jsonPanel">
          <Tabs value="画布">
            <TabPane label="options" name="画布">
              <textarea ref="optionsStr"></textarea>
            </TabPane>
            <TabPane label="charts" name="图表">
              <textarea ref="chartsStr"></textarea>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
      <Modal title="下载源码" v-model="isShowDownload" :width="550" :footer-hide="true">
        <div class="download-panel">
          <ul class="download-ul">
            <li @click="downCanvas(1)">
              <img :src="require('../../assets/html.png')"/>
              <span>html+vue版</span>
            </li>
            <li @click="downCanvas(2)">
              <img :src="require('../../assets/webpack.png')"/>
              <span>webpack+vue版</span>
            </li>
          </ul>
        </div>
      </Modal>
    </header>
</template>

<script>
import '../../assets/mtIcon/style.css'
import mtFormItemCode from '../../components/editor/options/mtFormItemCode'
import {mapGetters} from "vuex";
import {downloadAction} from "@/request";
export default {
  name: 'mtHeader',
  props: {
    canvasName: String,
    canvasState: Number
  },
  data () {
    return {
      isShowJson: false,
      optionsStr: null,
      chartsStr: null,
      isDisableDownload: false,
      isShowDownload: false,
      mode: 'text/javascript'
    }
  },
  computed: {
    showBackCanvas(){
      return !this.$parent.showCanvas&&this.canvasName
    },
    ...mapGetters(['activeNode'])
  },
  components: {
    mtFormItemCode
  },
  methods: {
    addCanvas () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('addCanvas')
    },
    openCanvas () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('openCanvas')
    },
    delCanvas () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('delCanvas')
    },
    viewCanvas () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('viewCanvas')
    },
    dbManager () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('dbManager')
    },
    openDownModal () {
      this.isShowJson = false
      this.$Modal.remove()
      if (this.$parent.canvasObj.id) {
        this.$parent.showCanvas = true
        this.$parent.showDbManager = false
        this.$parent.showDbSetting = false
        this.$parent.showOpenCanvasModal = false
        this.$parent.showCanvasUrlModal = false
        this.$parent.showAddCanvasModal = false
        this.isShowDownload = true
      } else {
        this.$Message.warning('请先打开一个画布！')
      }
    },
    saveOptionsConf () {
      this.$emit('saveOptionsConf')
    },
    resetCanvas(){
      this.$emit('resetCanvas')
    },
    downCanvas (type) {
      let id = this.$parent.canvasObj.id
      this.isDisableDownload = true
      this.$Message.loading({
        content: '正在努力组装中，请稍等……'
      })
      downloadAction(
        this.action.downloadCanvas,
          {
            id:id,
            type:type
          }
      ).then(res => {
        this.$Message.destroy()
        if (res.hasOwnProperty('success')&&res.success===false) {
          this.$Message.warning('组装失败！')
        } else {
          this.isDisableDownload = false
          this.isShowDownload = false
          let blob = new Blob([res])
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, `${id}_${type}.zip`)
          } else {
            let link = document.createElement('a')
            let evt = document.createEvent('HTMLEvents')
            evt.initEvent('click', false, false)
            link.href = URL.createObjectURL(blob)
            link.download = `${id}_${type}.zip`
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        }
      })
    },
    getCanvasUrl () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('getCanvasUrl')
    },
    dbSetting () {
      this.isShowJson = false
      this.isShowDownload = false
      this.$emit('dbSetting')
    },
    viewJson () {
      this.isShowJson = true
      this.isShowDownload = false
      this.$parent.showDbManager = false
      this.$parent.showDbSetting = false
      this.$parent.showOpenCanvasModal = false
      this.$parent.showCanvasUrlModal = false
      this.$parent.showAddCanvasModal = false
      this.optionsStr = JSON.stringify(this.$parent.canvasObj.options, null, '\t')
      this.chartsStr = JSON.stringify(this.$parent.canvasObj.data, null, '\t')
      this.$nextTick(()=>{
        if(!this.editor_optionsStr){
          this.editor_optionsStr = this.$codeMirror.fromTextArea(this.$refs.optionsStr, {
            mode: 'application/json',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true
          })
        }
        if(!this.editor_chartsStr){
          this.editor_chartsStr = this.$codeMirror.fromTextArea(this.$refs.chartsStr, {
            mode: 'application/json',
            theme: 'default',
            lineNumbers: true,
            lineWrapping: true
          })
        }
        this.editor_optionsStr.setSize(null,550)
        this.editor_chartsStr.setSize(null,550)
        this.editor_optionsStr.setValue(this.optionsStr)
        this.editor_chartsStr.setValue(this.chartsStr)
      })

    },
    backCanvas(){
      this.$parent.showCanvas = true
      this.$parent.showCanvas = true
      this.$parent.showDbManager = false
      this.$parent.showDbSetting = false
      this.$parent.showOpenCanvasModal = false
      this.$parent.showCanvasUrlModal = false
      this.$parent.tmpCanvasState = 1
      this.$parent.opNode = null
    }
  },
  filters: {
    fmCanvasState: function (val) {
      switch (val) {
        case -1: {
          return '正在保存'
        }
        case 1: {
          return '已保存'
        }
        case 0: {
          return '保存'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-con{
    height: 100%;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .block_header{
    display: inline-flex;
    justify-content: left;
    align-items: center;
  }
  .logo{
    display: inline-block;
    background: url("../../assets/logo.png") no-repeat center center;
    background-size: contain;
    width: 23px;
    height:23px;
  }
  .title{
    height: 100%;
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    margin-left: 6px;
  }
  .mtCanvasTool,.mtEditorTool,.mtCanvasInfo{
    height: 100%;
    display: inline-block;
    margin-left: 6px;
  }
  .mtEditorTool
  {
    margin-right: 10px;
  }
  .mtCanvasInfo{
    margin-left: 18px;
  }
  .mtCanvasState,.mtCanvasName{
    display: inline-block;
    height: 49px;
  }
  .mtCanvasState{
    text-align: center;
  }
  .mtCanvasName{
    text-align: center;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .viewJson{
    position: relative;
    top: 2px;
    width: 40px;
    height: 20px;
    color: #22579d;
    cursor: pointer;
    &:hover{
      color: #2380cc;
    }
  }
  .jsonPanel{
    height: 600px;
  }
  .download-panel {
    width: 100%;
    height: 210px;
  }
  .download-ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap;
  }
  .download-ul li{
    list-style: none;
    margin: 0px 30px;
    cursor: pointer;
  }
  .download-ul li:hover{
    background: #eeeeee70;
    border-radius: 10px;
  }
  .download-ul li img{
    width: 165px;
  }
  .download-ul li img,.download-ul li span{
    display: block;
    width: 170px;
  }
  .download-ul li span{
    text-align: center;
    font-size: 16px;
    height: 30px;
    line-height: 10px;
  }
  .header-icon-btn{
    margin-left: 5px;
  }
</style>
