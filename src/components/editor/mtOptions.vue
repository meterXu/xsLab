<template>
  <div id="options">
    <template v-if="showOp">
    <div class="title">
      <div class="titleCon">
        <ButtonGroup size="small">
          <Button v-if="this.opNode.config.data" type="primary" @click="testDataSource"><Icon type="md-checkmark" />测试</Button>
          <Button type="primary" @click="saveDataSource"><Icon type="md-download" />保存</Button>
        </ButtonGroup>
        <span class="titleCon_span">参数配置</span></div>
    </div>
    <template>
      <Tabs v-if="showOp">
        <TabPane v-for="(tab,ti) in activeOptions.config" :key="ti" :label="tab.type" :icon="tab.icon" :style="tabPaneStyle">
          <Collapse simple>
            <Panel v-for="(panel,pi) in tab.con" :name="pi.toString()" :key="pi" >
              {{panel.name}}
              <Form slot="content" label-position="left" :label-width="70">
                <FormItem v-for="(fItem,fi) in panel.sub" :key="fi" :label="fItem.name">
                  <mtFormItem :fItem="fItem" :panel="panel" :opNode="opNode" @radioChange="radioChange" @showFullCode="showFullCode"></mtFormItem>
                </FormItem>
              </Form>
            </Panel>
          </Collapse>
        </TabPane>
      </Tabs>
    </template>
    <Modal :width="800"  v-model="showExecSqlModal" title="数据测试">
      <div class="tableContainer">
        <Tabs value="数据1">
          <TabPane :label="'数据'+(index+1)" :name="'数据'+(index+1)" v-for="(dataConfig,index) in dataConfigs" :key="index">
            <Table v-if="dataConfig.data"
                   height="360"
                   :columns="dataConfig.columns"
                   :data="dataConfig.data"></Table>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
    <Modal :width="800"  v-model="showFullCodeModal" :title="codeProLabel" @on-ok="codeOk">
      <div class="tableContainer">
        <mtFormItemCode v-if="showFullCodeModal" :full="false" v-model="codeProValue" :mode="codeProMode"></mtFormItemCode>
      </div>
    </Modal>
    </template>
    <template v-else>
      <div class="title">
        <div class="titleCon">
          <span class="titleCon_span">参数配置</span>
        </div>
      </div>
  </template>
  </div>
</template>

<script>
import resources from '../../data/resources/resources'
import mtFormItem from './options/mtFormItem'
import editorData from '../../data/editorData'
import MtFormItemCode from './options/mtFormItemCode'
export default {
  name: 'mtOptions',
  props: {
    opNode: Object
  },
  components: {
    MtFormItemCode,
    mtFormItem
  },
  data () {
    return {
      showModal: false,
      editorData: editorData,
      optionsPath: resources.configOptions,
      number: true,
      dataConfigs: [],
      showExecSqlModal: false,
      showFullCodeModal: false,
      codeProValue: null,
      codeProIndex: 0,
      codeProLabel: null,
      codeProMode: 'text/javascript',
      codeProField: null
    }
  },
  computed: {
    isShowFormItem () {
      return function (rdTab) {
        if (rdTab) {
          if (rdTab === this.showRdTab) {
            return 'block'
          } else {
            return 'none'
          }
        } else {
          return 'block'
        }
      }
    },
    activeOptions () {
      let activeOptions = null
      if (this.opNode) {
        activeOptions = this.optionsPath[this.opNode.type][this.opNode.chart]
      }
      if (activeOptions.config[activeOptions.config.length - 1].type === '数据') {
        activeOptions.config[activeOptions.config.length - 1]['con'].forEach(c => {
          let dbPro = c.sub.find(m => m.key === 'db')
          if (dbPro && dbPro.hasOwnProperty('data')) {
            dbPro.data = this.editorData.databaseList
          }
        })
      }
      return activeOptions
    },
    showOp () {
      if (this.opNode) {
        return true
      } else {
        return false
      }
    },
    tabPaneStyle () {
      let panHeight = window.innerHeight - 126
      return {
        height: panHeight + 'px',
        overflow: 'auto'
      }
    }
  },
  methods: {
    testDataSource () { // 测试数据
      let that = this
      that.$parent.$refs.xsc.getData(that.$parent.$refs.xsc.activeNode.id).then(m => {
        let tempConfig = []
        m.data.forEach(d => {
          let tableConfig = {
            columns: [],
            data: []
          }
          if (d instanceof Array) {
            tableConfig.data = d
          } else {
            tableConfig.data = JSON.parse(d)
          }
          if (tableConfig.data) {
            // 获取数据列配置
            Object.keys(tableConfig.data[0]).forEach(p => {
              tableConfig.columns.push({
                title: p,
                key: p
              })
            })
          }
          tempConfig.push(tableConfig)
        })
        that.dataConfigs = tempConfig
        that.showExecSqlModal = true
      }).catch(errDatas => {
        let errMsgStr = ''
        if (errDatas instanceof Array) {
          errDatas.forEach(c => {
            if (c.error && c.error.message) {
              errMsgStr += c.error.message + '<br/>'
            }
          })
        } else {
          if (errDatas.message) {
            errMsgStr = errDatas.message
          }
        }
        if (errMsgStr) {
          that.$Message.error(errMsgStr)
        }
      })
    },
    saveDataSource () {
      let that = this
      if (!that.$parent.$refs.xsc.activeNode.id) {
        this.$emit('saveOption')
      } else {
        that.$parent.$refs.xsc.update(that.$parent.$refs.xsc.activeNode.id).then(warnData => {
          let warnMsgStr = ''
          if (warnData.warns) {
            warnData.warns.forEach(warnObj => {
              if (warnObj.warn && warnObj.warn.length > 0) {
                warnObj.warn.forEach(warn => {
                  warnMsgStr += warn + '<br/>'
                })
              }
            })
          }
          if (warnMsgStr) {
            that.$Modal.warning({
              title: '配置异常',
              content: warnMsgStr
            })
          } else {
            this.$emit('saveOption')
          }
        }).catch(errDatas => {
          let errMsgStr = ''
          if (errDatas instanceof Array) {
            errDatas.forEach(c => {
              if (c.error && c.error.message) {
                errMsgStr += c.error.message + '<br/>'
              }
            })
          } else {
            if (errDatas.message) {
              errMsgStr = errDatas.message
            }
          }
          if (errMsgStr) {
            that.$Modal.error({
              title: '配置错误',
              content: errMsgStr
            })
          }
        })
      }
    },
    radioChange (v) {
      console.log(v)
    },
    showFullCode (field, value, index, mode, label) {
      this.showFullCodeModal = true
      this.codeProValue = value
      this.codeProIndex = index
      this.codeProLabel = label
      this.codeProMode = mode
      this.codeProField = field
    },
    codeOk () {
      if (Object.keys(this.opNode.config.options).indexOf(this.codeProField) > -1) {
        this.opNode.config.options[this.codeProField] = this.codeProValue
      } else {
        this.opNode.config.data.source[this.codeProIndex][this.codeProField] = this.codeProValue
      }
      this.codeProValue = null
    }
  },
  watch: {
    opNode: {
      handler: function () {
        this.$emit('changeOption')
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  #options {
    position: absolute;
    right: 0;
    top: 50px;
    width: 280px;
    bottom: 0;
    background: #f5f5f5;
    border-left: 1px solid #ddd;
    overflow:auto;
    z-index: 2499;
    box-shadow: -2px 0px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .title{
    text-align: right;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #dddddd;
  }
  .titleCon{
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
    color: #2c3e50;;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  }
  .ivu-collapse {
    border-right: none;
    border-left: none;
  }
  .ivu-collapse-content{
    margin-right: 16px;
  }
  .mt_panel_title{
    display: inline-block;
  }
  .mt_panel_title_control{
    margin-left: 148px;
  }
  .titleCon_span{
    margin-left:76px ;
  }
  .tableContainer{
    overflow: auto;
    height: 400px;
  }
  .ivu-modal-body{
    padding: 0px 10px;
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
</style>
