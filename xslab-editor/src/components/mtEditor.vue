<template>
  <div class="mt-editor">
    <div class="mt-editor-header">
      <mtHeader :canvasName="mtCanvasOptions.name"
                :canvasState="tmpCanvasState"
                @addCanvas="addCanvas"
                @openCanvas="openCanvas"
                @delCanvas="delCanvas"
                @viewCanvas="viewCanvas"
                @getCanvasUrl="getCanvasUrl"
                @dbManager="dbManager"
                @dbSetting="dbSetting"
                @saveOptionsConf="saveOptionsConf"
                @resetCanvas="resetCanvas">
      </mtHeader>
    </div>
    <div class="mt-editor-layout">
      <mtMenu @dragStart="menuDragStart"></mtMenu>
      <mtDbManager v-if="showDbManager"></mtDbManager>
      <mtSetting v-if="showDbSetting"></mtSetting>
      <mtScale ref="mtScale">
        <Xsc ref="xsc" v-show="showCanvas"
             :charts="canvasData"
             :options="mtCanvasOptions"
             :view="false"
             @drop="drop"
             @contextmenu="contextmenu"
             @nodeActive="nodeActive">
          <mtContextMenu v-if="showMenu" :point="mtMenuPoint" @menuClick="menuClick"></mtContextMenu>
        </Xsc>
      </mtScale>
      <mtOptions ref="mtOptions" v-if="opNode" :opNode="opNode" @saveOption="saveOption" @changeOption="changeOption"></mtOptions>
    </div>
    <Modal :width="400"
           v-model="showAddCanvasModal"
           :mask-closable="false"
           title="新增画布"
           @on-ok="saveCanvas('formValidate')">
      <Form ref="formValidate" :model="addFrom" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="addFrom.name" placeholder="输入画布名称"/>
        </FormItem>
        <FormItem label="宽度" prop="width">
          <InputNumber :max="10000" :min="1"  v-model="addFrom.width" placeholder="输入画布宽度"/>
        </FormItem>
        <FormItem label="高度" prop="height">
          <InputNumber :max="10000" :min="1"  v-model="addFrom.height" placeholder="输入画布高度"/>
        </FormItem>
      </Form>
    </Modal>
    <Modal :width="1000"
           v-model="showOpenCanvasModal"
           :mask-closable="false"
           :footer-hide="true"
           title="打开画布">
      <Table height="600"
             @on-row-click="cavRowClick"
             :columns="cavColumn"
             :loading="cavTableLoading"
             :data="cavTableData">
      </Table>
      <Page style="margin-top: 3px" :total="pagination.total" :current.sync="pagination.pageNumber" :page-size="pagination.pageSize" size="small" @on-change="openCanvas" show-total></Page>
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
import moment from 'moment'
import {getAction, postAction} from "@/request";
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
      tmpCanvasState: null,
      showMenu: false,
      canvasData: [],
      editorData: editorData,
      resources: resources,
      mtCanvasOptions: {},
      addFrom:{
        name:'',
        width:1024,
        height:768
      },
      pagination:{
        total:null,
        pageSize:20,
        pageNumber:1
      },
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
        {title: '序号', key: 'id', render: (h, params)=>{
            return h('span',(this.pagination.pageNumber-1)*this.pagination.pageSize+params.index+1)
        }},
        {title: '名称', key: 'name'},
        {title: '添加时间', key: 'insertTime', render: (h, params) => {
            return h('span',new moment(params.row.insertTime).format('YYYY-MM-DD HH:mm:ss') );
          }
        },
        {title: '操作', key: 'id',render: (h, params) => {
            return h('Button',{
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.delCanvasPost(params.row.id)
                }
              }
            },'删除');
          }
        }
      ],
      cavTableData: [],
      copyBtn: null,
      mtMenuPoint: null,
      deleteNodeId: null,
      opNode: null
    }
  },
  computed: {
    canvasUrl: function () {
      if(this.$route.query.hasOwnProperty('X-Access-Token')){
        return `${window.location.origin}${window.location.pathname}#/view/${this.mtCanvasOptions.id}?X-Access-Token=${this.$route.query['X-Access-Token']}`
      }else{
        return `${window.location.origin}${window.location.pathname}#/view/${this.mtCanvasOptions.id}`
      }

    }
  },
  methods: {
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
          cloneConfig.theme = this.$config.defaultChartTheme||'light'
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
      let activeNode = this.$refs.xsc.activeNode
      let fromRes = resources.initOptions[activeNode.type][activeNode.chart]
      this.opNode = this.mergeOptions(activeNode,fromRes.options)
      this.showMenu = false
      this.$store.commit('setActiveNode',activeNode)
    },
    mergeOptions(activeNode, fromResOptions) {
      let fromKeys = Object.keys(fromResOptions)
      let toKeys = Object.keys(activeNode.config.options)
      fromKeys.filter(c=>toKeys.indexOf(c)<0).forEach(c=>{
        activeNode.config.options[c] = fromResOptions[c]
      })
      return activeNode
    },
    saveOption () { // 保存配置数据
      this.tmpCanvasState = -1
      postAction(this.action.saveCanvasData, {
        id: this.mtCanvasOptions.id,
        name: this.mtCanvasOptions.name,
        data: this.canvasData,
        options: this.mtCanvasOptions
      }).then(res => {
        if (res.success) {
          this.$Message.success('保存成功！')
          this.tmpCanvasState = 1
        } else {
          this.$Message.error('保存失败！')
          this.tmpCanvasState = 0
        }
      })
    },
    addCanvas () { // 模态界面-添加画布界面
      this.$Modal.remove()
      this.showAddCanvasModal = true
      this.editorData.activeNode = null
      this.showCanvasUrlModal = false
      this.showOpenCanvasModal = false
      this.addFrom.name ='新的画布'
    },
    saveCanvas (name) { // 保存画布
      let that = this
      this.$refs[name].validate((valid) => {
        if (valid) { // 验证成功
          that.showCanvas = true
          that.showDbManager = false
          that.showDbSetting = false
          that.canvasData = []
          that.opNode = null
          that.mtCanvasOptions = Object.assign(resources.initOptions.dom.canvas.options,that.addFrom,{id:this.mtCanvasOptions.id = new Date().valueOf()})
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
      getAction(this.action.getCanvasList,{
        pageNumber:this.pagination.pageNumber,
        pageSize:this.pagination.pageSize
      })
        .then(c => {
          this.cavTableLoading = false
          if (c.success) {
            this.cavTableData = c.data.rows
            this.pagination.total = c.data.total
          }else{
            this.$Message.error(c.message)
          }
        })
    },
    cavRowClick (row) { // 点击行
      getAction(this.action.getCanvasData, {
        id: row.id
      }).then(c => {
        if (c.data) {
          let cavOptions = JSON.parse(c.data.cavOptions)
          let chartData = JSON.parse(c.data.cavData)
          cavOptions.baseUrl = this.$config.baseUrl
          this.mtCanvasOptions = Object.assign({},resources.initOptions.dom.canvas.options,cavOptions)
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
        this.delCanvasPost(this.mtCanvasOptions.id,()=>{
          this.mtCanvasOptions.id = ''
          this.mtCanvasOptions.name = ''
          this.mtCanvasOptions.width = 0
          this.mtCanvasOptions.height = 0
          this.mtCanvasOptions['background-color'] = null
          this.mtCanvasOptions['background-image'] = ''
          this.showCanvas = false
          this.editorData.activeNode = null
          this.opNode = null
        })
      } else {
        this.$Message.warning('请先打开一个画布！')
      }
    },
    delCanvasPost(id,callback){
      this.$Modal.confirm({
        title: '删除确认',
        content: '确定删除这个画布吗？',
        onOk: function () {
          postAction(this.action.delCanvas, {
            id: id
          }).then(res => {
            if (res.success) {
              this.$Message.success('删除成功！')
              callback&&callback()
            } else {
              this.$Message.error(res.message)
            }
          })
        }
      })
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
      this.showOpenCanvasModal = false
      this.showCanvasUrlModal = false
      this.showAddCanvasModal = false
      this.opNode = null
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
    saveOptionsConf () {
      this.$refs.mtOptions.saveOptionsConf()
    },
    resetCanvas(){
      this.cavRowClick({
        oid: this.mtCanvasOptions.id
      })

    }
  },
  mounted () {
    this.initCopyLink()
    this.$bus.$on('nodeConfigChange',()=>{
      this.$refs.xsc.$refs[this.$refs.xsc.activeNode.id][0].setChartOption()
    })
  },
  destroyed () {
    this.copyBtn.destroy()
  }
}
</script>
<style scoped>
  .mt-editor {
    display: flex;
    flex-flow: column;
    height: 100%;
    justify-content: flex-start;
  }
  .mt-editor-header{
    border-bottom: 1px solid var(--header-border-color);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  .mt-editor-layout{
    display: flex;
    height: calc(100% - 50px);
    flex-flow: row;
    justify-content: flex-start;
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
