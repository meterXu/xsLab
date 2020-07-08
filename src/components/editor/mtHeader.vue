<template>
    <header id="header">
      <div class="block_header">
        <div class="logo"></div>
        <div class="title">XSLab</div>
      </div>
      <div class="mtCanvasInfo">
        <div class="mtCanvasState">
          <Button v-if="canvasState===1" type="success" size="small" icon="md-done-all">{{canvasState | fmCanvasState}}</Button>
          <Button v-else-if="canvasState===0" type="dashed" size="small" icon="ios-medical">{{canvasState | fmCanvasState}}</Button>
          <Button v-else-if="canvasState===-1" loading type="dashed" size="small">{{canvasState | fmCanvasState}}</Button>
        </div>
        <div class="mtCanvasName"><span>{{canvasName||'需要画布进行操作'}}</span></div>
      </div>
      <div class="mtCanvasTool">
        <ButtonGroup>
          <Button title="打开画布" icon="ios-browsers" @click="openCanvas"></Button>
          <Button title="添加画布" icon="md-add" @click="addCanvas"></Button>
          <Button title="删除画布" icon="md-trash" @click="delCanvas"></Button>
          <Button title="查看画布" icon="md-eye" @click="viewCanvas"></Button>
          <Button title="获取链接" icon="ios-link" @click="getCanvasUrl"></Button>
          <Button title="下载画布" icon="md-arrow-down" @click="openDownModal" :disabled="isDisableDownload"></Button>
        </ButtonGroup>
      </div>
      <div class="mtEditorTool">
        <Icon v-if="showJson"
              title="查看JSON"
              custom="iconfont icon-json"
              class="viewJson"
              @click="viewJson"/>
        <Button size="small"
                shape="circle"
                type="success"
                title="管理数据源"
                custom-icon="iconfont icon-database"
                @click="dbManager"
                :replace="true"></Button>
        <Button size="small"
                title="系统设置"
                icon="ios-construct"
                @click="dbSetting"
                shape="circle"></Button>
      </div>
      <Modal :width="800"
             v-model="isShowJson"
             :mask-closable="true"
             :footer-hide="true"
             title="查看JSON">
        <div class="jsonPanel">
          <Tabs value="画布">
            <TabPane label="options" name="画布">
              <mtFormItemCode v-model="optionsStr" :mode="mode" :full="false" :copy="true"></mtFormItemCode>
            </TabPane>
            <TabPane label="charts" name="图表">
              <mtFormItemCode v-model="chartsStr" :mode="mode" :full="false" :copy="true"></mtFormItemCode>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
      <Modal title="想把这个画布带走？" v-model="isShowDownload" :width="550" :footer-hide="true">
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
import '../../assets/mtIcon/mtIcon.css'
import mtFormItemCode from '../../components/editor/options/mtFormItemCode'
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
    showJson () {
      return this.$parent.showCanvas
    }
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
      if (this.$parent.mtCanvasOptions.id) {
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
    downCanvas (type) {
      let that = this
      let cavid = this.$parent.mtCanvasOptions.id
      that.isDisableDownload = true
      that.$Message.loading({
        content: '正在努力组装中，请稍等……'
      })
      that.$ajax({
        url: that.commonConfig.baseUrl + that.commonConfig.actionUrl.DownloadCanvas + `?canvasOid=${cavid}&type=${type}`,
        method: 'get',
        responseType: 'blob'
      }).then(c => {
        that.$Message.destroy()
        if (!c.data) {
          that.$Message.warning('组装失败！')
        } else {
          that.isDisableDownload = false
          that.isShowDownload = false
          let blob = new Blob([c.data])
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, `${cavid}_${type}.zip`)
          } else {
            let link = document.createElement('a')
            let evt = document.createEvent('HTMLEvents')
            evt.initEvent('click', false, false)
            link.href = URL.createObjectURL(blob)
            link.download = `${cavid}_${type}.zip`
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        }
      }).catch(c => {
        that.$Message.error(c.message)
        that.isDisableDownload = false
        that.isShowDownload = false
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
      this.optionsStr = JSON.stringify(this.$parent.mtCanvasOptions, null, '\t')
      this.chartsStr = JSON.stringify(this.$parent.canvasData, null, '\t')
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
          return '未保存'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #header{
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    top: 0;
    right: 0;
    left: 0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    z-index: 2500;
  }
  .block_header{
    width: 200px;
    height: 49px;
    line-height: 49px;
    display: inline-block;
  }
  .logo{
    display: inline-block;
    background: url("../../assets/logo.png") no-repeat center center;
    background-size: contain;
    width: 23px;
    height: 100%;
    float: left;
    margin-left: 12px;
  }
  .title{
    height: 100%;
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    float: left;
    margin-left: 6px;
  }
  .mtCanvasTool,.mtEditorTool{
    display: inline-block;
    height: 49px;
    line-height: 49px;
    float: right;
    margin-right: 0px;
  }
  .mtEditorTool
  {
    margin-right: 10px;
  }
  .mtCanvasInfo{
    height: 49px;
    line-height: 49px;
    float: right;
    width: 280px;
    background: none;
  }
  .mtCanvasState,.mtCanvasName{
    display: inline-block;
    height: 49px;
    float: left;
  }
  .mtCanvasState{
    width: 113px;
    text-align: center;
  }
  .mtCanvasName{
    width: 167px;
    text-align: center;
    padding-right: 20px;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .viewJson{
    position: relative;
    width: 40px;
    height: 20px;
    color: #22579d;
    right: 8px;
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
</style>
