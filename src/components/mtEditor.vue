<template>
  <div id="app">
    <mtHeader :canvasName="canvasName"
              :canvasState="canvasState"
              @addCanvas="addCanvas"
              @openCanvas="openCanvas"
              @delCanvas="delCanvas"
              @viewCanvas="viewCanvas"
              @getCanvasUrl="getCanvasUrl"
              @dbManager="dbManager"
              @downCanvas="downCanvas"
              @dbSetting="dbSetting"
              @saveDataSource="saveDataSource">
    </mtHeader>
    <mtMenu @dragStart="menuDragStart"></mtMenu>
    <mtScale ref="mtScale">
      <template slot="content">
        <mtDbManager v-if="showDbManager"></mtDbManager>
        <mtSetting v-if="showDbSetting"></mtSetting>
        <Xsc ref="xsc" v-if="showCanvas"
             :charts="canvasData"
             :options="mtCanvasOptions"
             :view="false"
             @drop="drop"
             @contextmenu="contextmenu"
             @nodeActive="nodeActive">
          <mtContextMenu v-if="showMenu" :point="mtMenuPoint" @menuClick="menuClick"></mtContextMenu>
        </Xsc>
      </template>
    </mtScale>
    <mtOptions ref="mtOptions" v-if="opNode" :opNode="opNode" @saveOption="saveOption" @changeOption="changeOption"></mtOptions>
    <Modal :width="400"
           v-model="showAddCanvasModal"
           :mask-closable="false"
           title="添加画布"
           @on-ok="saveCanvas('formValidate')">
      <Form ref="formValidate" :model="addCanvasOptions" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="addCanvasOptions.name" placeholder="输入画布名称"/>
        </FormItem>
        <FormItem label="宽度" prop="width">
          <InputNumber :max="10000" :min="1"  v-model="addCanvasOptions.width" placeholder="输入画布宽度"/>
        </FormItem>
        <FormItem label="高度" prop="height">
          <InputNumber :max="10000" :min="1"  v-model="addCanvasOptions.height" placeholder="输入画布高度"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal :width="800"
           v-model="showOpenCanvasModal"
           :mask-closable="false"
           :footer-hide="true"
           title="打开画布">
      <Table height="400"
             @on-row-click="cavRowClick"
             :columns="cavColumn"
             :loading="cavTableLoading"
             :data="cavTableData"></Table>
    </Modal>
    <Modal :width="500"
           v-model="showCanvasUrlModal"
           :mask-closable="true"
           :footer-hide="true"
           title="画布链接">
      <div class="canvasUrlContent">
        <div class="canvasUrlQRCode">
          <qriously :value="canvasUrl" :size="200" :backgroundAlpha="1"/>
        </div>
        <div class="canvasUrlText">
          <span>{{canvasUrl}} </span>
          <Button id="copy"
                  type="success"
                  size="small"
                  data-clipboard-action="copy"
                  :data-clipboard-text="canvasUrl">点我复制</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import mtHeader from './editor/mtHeader'
import mtMenu from './editor/mtMenu'
import mtOptions from './editor/mtOptions'
import editorData from '../data/editorData'
import mtScale from './editor/mtScale'
import mtDbManager from './editor/mtDbManager'
import mtSetting from './editor/mtSetting'
import mtContextMenu from './editor/mtContextMenu'
import resources from '../data/resources/resources'
import {mapGetters} from "vuex";
export default {
  name: 'mtEditor',
  components: {
    mtHeader,
    mtMenu,
    mtOptions,
    mtScale,
    mtDbManager,
    mtSetting,
    mtContextMenu
  },
  data () {
    return {
      tmpCanvasState: 1,
      showMenu: false,
      canvasData: [],
      editorData: editorData,
      resources: resources,
      mtCanvasOptions: resources.initOptions.dom.canvas,
      addCanvasOptions: null,
      showCanvas: false,
      showDbManager: false,
      showAddCanvasModal: false,
      showOpenCanvasModal: false,
      showCanvasUrlModal: false,
      showDbSetting: false,
      cavTableLoading: false,
      ruleValidate: {
        name: { required: true, message: '画布名称不可为空', trigger: 'blur' },
        width: { type: 'number', required: true, message: '宽度不可为空', trigger: 'blur' },
        height: { type: 'number', required: true, message: '高度不可为空', trigger: 'blur' }
      },
      cavColumn: [
        {title: '序号', key: 'oid', type: 'index'},
        {title: '名称', key: 'name'},
        {title: '添加时间', key: 'insertTime'}
      ],
      cavTableData: [],
      copyBtn: null,
      mtMenuPoint: null,
      deleteNodeId: null,
      opNode: null
    }
  },
  computed: {
    ...mapGetters(['config']),
    canvasUrl: function () {
      if(this.$route.query.hasOwnProperty('X-Access-Token')){
        return `${window.location.origin}${window.location.pathname}#/view/${this.mtCanvasOptions.id}?X-Access-Token=${this.$route.query['X-Access-Token']}`
      }else{
        return `${window.location.origin}${window.location.pathname}#/view/${this.mtCanvasOptions.id}`
      }

    },
    canvasName: function () {
      if (this.showCanvas) {
        return this.mtCanvasOptions.name
      } else {
        return null
      }
    },
    canvasState: function () {
      if (this.showCanvas) {
        return this.tmpCanvasState
      } else {
        return null
      }
    }
  },
  methods: {
    resetAddCanvasOptions () {
      let mtCanvasOptionsCopy = {
        name: '新的画布',
        width: 1280,
        height: 720,
        backgroundColor: null,
        backgroundImage: null,
        backgroundSize: null,
        backgroundRepeat: null,
        theme: 'default',
        baseUrl: this.config.baseUrl
      }
      this.addCanvasOptions = mtCanvasOptionsCopy
    },
    menuDragStart (node) {
      if (this.$refs.xsc) {
        this.$refs.xsc.activeNode = null
      }
      this.editorData.dragMenuNode = node
    },
    drop () {
      if (!this.view) {
        if (this.editorData.dragMenuNode) {
          let scrollLeft = this.$refs.mtScale.$el.scrollLeft
          let scrollTop = this.$refs.mtScale.$el.scrollTop
          let cloneConfig = JSON.parse(JSON.stringify(this.editorData.resources.initOptions[this.editorData.dragMenuNode.type][this.editorData.dragMenuNode.chart] || {}))
          cloneConfig.box.x = event.x -
            this.editorData.resources.initOptions[this.editorData.dragMenuNode.type][this.editorData.dragMenuNode.chart].box.width / 2 - 200 + scrollLeft
          cloneConfig.box.y = event.y -
            this.editorData.resources.initOptions[this.editorData.dragMenuNode.type][this.editorData.dragMenuNode.chart].box.height / 2 - 50 + scrollTop
          cloneConfig.theme = 'default'
          let addChart = {
            id: (new Date()).valueOf(),
            type: this.editorData.dragMenuNode.type,
            chart: this.editorData.dragMenuNode.chart,
            config: cloneConfig
          }
          this.canvasData.push(addChart)
          this.editorData.dragMenuNode = null
        }
      }
    },
    contextmenu (obj) {
      this.mtMenuPoint = {
        x: obj.x,
        y: obj.y
      }
      this.deleteNodeId = obj.id
      this.showMenu = true
    },
    nodeActive () {
      this.opNode = this.$refs.xsc.activeNode
      this.showMenu = false
    },
    saveOption () { // 保存配置数据
      this.tmpCanvasState = -1
      this.$ajax.post(this.action.saveCanvasData, {
        canvasOid: this.mtCanvasOptions.id,
        canvasName: this.mtCanvasOptions.name,
        canvasData: JSON.stringify(this.canvasData),
        canvasOptions: JSON.stringify(this.mtCanvasOptions)
      }).then(c => {
        if (c.data.success) {
          this.$Message.success('保存成功！')
          this.tmpCanvasState = 1
        } else {
          this.$Message.error('保存失败！')
          this.tmpCanvasState = 0
        }
      })
        .catch(c => {
          this.$Message.error(c.message)
          this.tmpCanvasState = 0
        })
    },
    addCanvas () { // 模态界面-添加画布界面
      this.$Modal.remove()
      this.resetAddCanvasOptions()
      this.addCanvasOptions.id = (new Date()).valueOf()
      this.showAddCanvasModal = true
      this.editorData.activeNode = null
      this.showCanvasUrlModal = false
      this.showOpenCanvasModal = false
    },
    saveCanvas (name) { // 保存画布
      let that = this
      this.$refs[name].validate((valid) => {
        if (valid) { // 验证成功
          that.mtCanvasOptions = that.addCanvasOptions
          that.showCanvas = true
          that.showDbManager = false
          that.showDbSetting = false
          that.canvasData = []
          that.opNode = null
          // 保存至数据库
          that.saveOption()
        } else { // 验证失败
          that.$Message.error('保存失败，画布参数设置不正确！')
        }
      })
    },
    openCanvas () { // 模态界面-打开画布界面
      this.$Modal.remove()
      this.showOpenCanvasModal = true
      this.editorData.activeNode = null
      this.cavTableLoading = true
      this.showCanvasUrlModal = false
      this.showAddCanvasModal = false
      this.$ajax.post(this.action.getCanvasList)
        .then(c => {
          this.cavTableLoading = false
          if (c.data) {
            this.cavTableData = c.data
          }
        })
        .catch(c => {
          this.$Message.error(c.message)
        })
    },
    cavRowClick (row, index) { // 点击行
      this.$ajax.post(this.action.getCanvasData, {
        canvasOid: row.oid
      }).then(c => {
        if (c.data) {
          let cavOptions = JSON.parse(c.data.cavOptions)
          let chartData = JSON.parse(c.data.cavData)
          cavOptions.baseUrl = this.config.baseUrl
          this.mtCanvasOptions = cavOptions
          this.canvasData = chartData
          this.showCanvas = true
          this.showDbManager = false
          this.showDbSetting = false
          this.showOpenCanvasModal = false
          this.showCanvasUrlModal = false
          this.tmpCanvasState = 1
          this.opNode = null
        }
      })
        .catch(c => {
          this.$Message.error(c.message)
        })
    },
    delCanvas () {
      // 删除画布
      if (this.mtCanvasOptions.id) {
        this.showCanvas = true
        this.showDbManager = false
        this.showDbSetting = false
        this.showOpenCanvasModal = false
        this.showCanvasUrlModal = false
        this.showAddCanvasModal = false
        let that = this
        this.$Modal.confirm({
          title: '删除确认',
          content: '确定删除这个打开的画布吗？',
          onOk: function () {
            that.$ajax.post(this.action.delCanvas, {
              canvasOid: that.mtCanvasOptions.id
            }).then(c => {
              if (c.data) {
                that.$Message.success('删除成功！')
                that.mtCanvasOptions.id = ''
                that.mtCanvasOptions.name = ''
                that.mtCanvasOptions.width = 0
                that.mtCanvasOptions.height = 0
                that.mtCanvasOptions['background-color'] = null
                that.mtCanvasOptions['background-image'] = ''
                that.showCanvas = false
                that.editorData.activeNode = null
                that.opNode = null
              } else {
                that.$Message.error('删除失败！')
              }
            }).catch(c => {
              that.$Message.error(c.message)
            })
          }
        })
      } else {
        this.$Message.warning('请先打开一个画布！')
      }
    },
    viewCanvas () {
      this.$Modal.remove()
      if (this.mtCanvasOptions.id) {
        this.showCanvas = true
        this.showDbManager = false
        this.showDbSetting = false
        this.showOpenCanvasModal = false
        this.showCanvasUrlModal = false
        this.showAddCanvasModal = false
        // 在新窗口中打开
        window.open(this.canvasUrl, '_blank')
      } else {
        this.$Message.warning('请先打开一个画布！')
      }
    },
    menuClick (name) {
      switch (name) {
        case 'delete': {
          let findIndex = this.canvasData.findIndex(c => c.id === this.deleteNodeId)
          if (findIndex !== -1) {
            this.canvasData.splice(findIndex, 1)
          }
          this.$refs.xsc.activeNode = null
          this.showMenu = false
          this.deleteNodeId = null
          break
        }
        case 'up': {
          if (this.opNode.config.box) {
            this.opNode.config.box.zIndex = (this.opNode.config.box.zIndex || 100) + 1
          }
          break
        }
        case 'down': {
          if (this.opNode.config.box) {
            this.opNode.config.box.zIndex = (this.opNode.config.box.zIndex || 100) - 1
          }
          break
        }
      }
    },
    dbManager () {
      this.$Modal.remove()
      this.showDbManager = true
      this.showDbSetting = false
      this.showCanvas = false
      this.mtCanvasOptions.id = null
      this.showOpenCanvasModal = false
      this.showCanvasUrlModal = false
      this.showAddCanvasModal = false
      this.opNode = null
    },
    dbSetting () {
      this.$Modal.remove()
      this.showDbManager = false
      this.showDbSetting = true
      this.showCanvas = false
      this.mtCanvasOptions.id = null
      this.showOpenCanvasModal = false
      this.showCanvasUrlModal = false
      this.showAddCanvasModal = false
      this.opNode = null
    },
    downCanvas () {

    },
    getCanvasUrl () {
      this.$Modal.remove()
      if (this.mtCanvasOptions.id) {
        this.showCanvasUrlModal = true
        this.showAddCanvasModal = false
        this.showOpenCanvasModal = false
      } else {
        this.$Message.warning('请先打开一个画布！')
      }
    },
    initCopyLink () {
      let that = this
      that.copyBtn = new this.$clipboard('#copy')
      that.copyBtn.on('success', function () {
        that.$Message.success('复制成功！')
      })
      that.copyBtn.on('error', function () {
        that.$Message.error('复制失败，请手动复制！')
      })
    },
    changeOption () {
      this.tmpCanvasState = 0
    },
    saveDataSource () {
      this.$refs.mtOptions.saveDataSource()
    }
  },
  created () {
    this.resetAddCanvasOptions()
  },
  mounted () {
    this.initCopyLink()
  },
  destroyed () {
    this.copyBtn.destroy()
  }
}
</script>
<style scoped>
  #app {
    margin:0;
    padding:0
  }
  .ivu-form-item{
    margin-bottom: 20px !important;
  }
  .canvasUrlContent{
    height: 270px;
    margin: 0 auto;
  }
  .canvasUrlQRCode,.canvasUrlText{
    display: block;
  }
  .canvasUrlQRCode{
    width: 200px;
    height: 200px;
    background: red;
    margin: 0 auto;
  }
  .canvasUrlText{
    text-align: center;
    margin-top: 10px;
  }
  .canvasUrlText span{
    display: inline-block;
    height: 24px;
    background: #ddd;
    padding: 4px 18px;
    border-radius: 4px;
    line-height: 16px;
    position: relative;
    top: 1px;
    text-shadow: 1px 1px 0px #fdfdfd;
    max-width: 400px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .canvasUrlText button{
    display: block;
    margin: 8px auto 0px auto;
  }
</style>
