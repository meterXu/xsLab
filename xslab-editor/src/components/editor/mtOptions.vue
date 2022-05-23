<template>
  <div id="options">
    <template v-if="showOp">
    <div class="title">
      <div class="titleCon">
        <span class="titleCon_span">参数配置</span>
        <ButtonGroup size="small">
          <Button v-if="this.opNode.config.data" type="primary" @click="testDataSource"><Icon type="md-checkmark" />测试</Button>
        </ButtonGroup>
        </div>
    </div>
    <template>
      <Tabs v-if="showOp" class="xslab-tabs">
        <TabPane v-for="(tab,ti) in activeOptions.config" :key="ti" :label="tab.type" :icon="tab.icon" :style="tabPaneStyle">
          <Collapse simple class="xslab-collapse">
            <Panel v-for="(panel,pi) in tab.con" :name="pi.toString()" :key="pi">
              {{panel.name}}
              <Form slot="content" label-position="left" :label-width="100">
                <FormItem v-for="(fItem,fi) in panel.sub"  v-show="showConfItem(fItem,panel)" :key="fi" :label="fItem.name">
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
        <Tabs value="数据1" style="width: 100%">
          <TabPane :label="'数据'+(index+1)" :name="'数据'+(index+1)" v-for="(dataConfig,index) in dataConfigs" :key="index">
            <Table v-if="dataConfig.data"
                   height="360"
                   :columns="dataConfig.columns"
                   :loading="loading"
                   :data="dataConfig.data"></Table>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
    <Modal :width="800" v-model="showFullCodeModal" :title="codeProLabel" @on-ok="codeOk">
      <div class="tableContainer">
        <mtFormItemCode ref="formCode" v-if="showFullCodeModal" :full="showFullCodeModal" v-model="codeProValue" :mode="codeProMode"></mtFormItemCode>
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
import {mapGetters} from 'vuex'
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
      loading:true,
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
    ...mapGetters(['dbList']),
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
      let dbOptions = activeOptions.config.find(c=>c.type==='数据')
      if (dbOptions) {
        dbOptions['con'].forEach(c => {
          let dbPro = c.sub.find(m => m.key === 'db')
          if (dbPro && dbPro.hasOwnProperty('data')) {
            dbPro.data = this.dbList
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
    showConfItem(fItem,panel){
      if(fItem.rdTab){
        let index = parseInt(panel.key.split('/')[panel.key.split('/').length-1])
        return this.opNode.config.data.source[index].type == fItem.rdTab
      }else{
        return true
      }
    },
    testDataSource () { // 测试数据
      let that = this
      that.showExecSqlModal = true
      this.loading = true
      that.$parent.$refs.xsc.getData(that.$parent.$refs.xsc.activeNode.id)
      .then(m => {
        try{
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
            if (tableConfig.data && tableConfig.data.length > 0) {
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
        }catch (e){
          that.$Message.error(e.message)
        }
      })
      .catch(errDatas => {
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
      }).finally(()=>{
        this.loading = false
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
        this.opNode.config.options[this.codeProField] = this.$refs.formCode.getValue()
      } else {
        this.opNode.config.data.source[this.codeProIndex][this.codeProField] = this.$refs.formCode.getValue()
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
    background: var(--options-bg-color,#f5f5f5);
    border-left: 1px solid var(--options-border-color,#ddd);
    overflow:auto;
    z-index: 2499;
    box-shadow: -2px 0px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .title{
    text-align: right;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid var(--collapse-item-border-color,#dddddd);
  }
  .titleCon{
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
    color: #2c3e50;;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    text-align: left;
  }
  .xslab-tabs{
    background: var(--tabs-bg-color);
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
  .xslab-collapse{
    background: var(--collapse-bg-color, #fff);
    border-color: var(--collapse-border-color, #dcdee2);
  }
  .ivu-collapse>.ivu-collapse-item{
    border-color: var(--collapse-item-border-color, #dcdee2);
  }
  .titleCon_span{
    margin-left:20px ;
    margin-right: 20px;
  }
  .tableContainer{
    overflow: auto;
    display: flex;
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
    background:none;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:none;
  }
</style>
<style>
.xslab-collapse .ivu-collapse-content{
  background: var(--collapse-bg-color);
}
</style>
