<template>
  <div tabindex="-1" :id="node.id" class="mt_node" :draggable="!view"
       :style="nodeStyle"
       @click="nodeClick"
       @dragstart="dragStart"
       @contextmenu="contextmenu"
       @keydown="keydown">
    <template>
      <eCharts ref='echarts' :theme="node.config.theme"
               :autoresize="autoresize"
               :options="temOptions"
               v-if="node.type==='eCharts'">
               </eCharts>
      <XscDom :options="node.config.options"
                  :theme="node.config.theme"
                  :type="node.config.type"
                  v-else-if="node.type==='dom'"
                  :view="this.view"></XscDom>
      <XscDev :options="node.config.options"
      :type="node.config.type"
      :view="this.view"
       v-else-if="node.type==='dev'">
       <template v-slot:[node.config.options.key]>
         <slot :name="node.config.options.key"></slot>
       </template>
       </XscDev>
      <div v-else>不支持的图表</div>
    </template>
  </div>
</template>

<script>
import eCharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'
import 'echarts-liquidfill'
import 'echarts/theme/infographic'
import 'echarts/theme/macarons'
import 'echarts/theme/roma'
import 'echarts/theme/shine'
import 'echarts/theme/vintage'
import darkblue from '../../data/theme/echarts/darkblue'
import halloween from '../../data/theme/echarts/halloween'
import chalk from '../../data/theme/echarts/chalk'
import westeros from '../../data/theme/echarts/westeros'
import essos from '../../data/theme/echarts/essos'
import wonderland from '../../data/theme/echarts/wonderland'
import walden from '../../data/theme/echarts/walden'
import purplePassion from '../../data/theme/echarts/purple-passion'
import XscDom from './controls/XscDom'
import XscDev from './controls/XscDev'
import axios from 'axios'
eCharts.registerTheme('darkblue', darkblue)
eCharts.registerTheme('halloween', halloween)
eCharts.registerTheme('chalk', chalk)
eCharts.registerTheme('westeros', westeros)
eCharts.registerTheme('essos', essos)
eCharts.registerTheme('wonderland', wonderland)
eCharts.registerTheme('walden', walden)
eCharts.registerTheme('purple-passion', purplePassion)
function getDbData (that, dbs, sqls) {
  return new Promise((resolve, reject) => {
    if (dbs.length > 0 && sqls.length > 0) {
      that.axios.post(that.$parent.options.baseUrl + '/ExecSql', {
        dbs: dbs.join('&'),
        sqls: sqls.join('&')
      }).then(c => {
        if (resolve) {
          resolve(c.data)
        }
      }).catch(c => {
        if (reject) {
          reject(c)
        }
      })
    } else {
      if (resolve) {
        resolve(null)
      }
    }
  })
}
function validateData (i, data, warns) {
  if (data instanceof Array) {
    return data
  } else {
    try {
      return JSON.parse(data)
    } catch (e) {
      warns.push('数据' + (i + 1) + '，数据源配置不正确\n' + e)
      return null
    }
  }
}
function setDataOptions (that, pro, data) {
  if (!(pro instanceof Array)) {
    pro = [pro]
  }

  pro.forEach(c => {
    try {
      if (c.split('/').length === 1) {
        that.node.config.options[c.split('/')[0]] = data
      } else if (c.split('/').length === 2) {
        that.node.config.options[c.split('/')[0]][c.split('/')[1]] = data
      } else if (c.split('/').length === 3) {
        that.node.config.options[c.split('/')[0]][c.split('/')[1]][c.split('/')[2]] = data
      } else if (c.split('/').length === 4) {
        that.node.config.options[c.split('/')[0]][c.split('/')[1]][c.split('/')[2]][c.split('/')[3]] = data
      } else if (c.split('/').length === 5) {
        that.node.config.options[c.split('/')[0]][c.split('/')[1]][c.split('/')[2]][c.split('/')[3]][c.split('/')[4]] = data
      } else if (c.split('/').length === 6) {
        that.node.config.options[c.split('/')[0]][c.split('/')[1]][c.split('/')[2]][c.split('/')[3]][c.split('/')[4]][c.split('/')[5]] = data
      }
    } catch (e) {}
  })
}
export default {
  name: 'xsc-node',
  components: {
    eCharts,
    XscDom,
    XscDev
  },
  props: {
    node: Object,
    view: Boolean
  },
  data () {
    return {
      axios: axios,
      autoresize: true,
      showmenu: false,
      mtMenuPoint: null,
      timeout: null,
      temOptions: null
    }
  },
  computed: {
    nodeStyle () {
      if (this.node && this.node.config) {
        return {
          width: (this.node.config.box.width || 400) + 'px',
          height: (this.node.config.box.height || 300) + 'px',
          left: (this.node.config.box.x || 0) + 'px',
          top: (this.node.config.box.y || 0) + 'px',
          zIndex: (this.node.config.box.zIndex || 100)
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    loopData () {
      let that = this
      if (that.node.config.data && that.node.config.data.loop) {
        that.loopUpdate()
      }
    },
    nodeClick: function () {
      this.$emit('nodeClick', this.node)
      event.stopPropagation()
    },
    dragStart: function () {
      if (!this.view) {
        this.$emit('dragStart', this.node)
      }
    },
    contextmenu: function () {
      if (!this.view) {
        event.preventDefault()
        this.$emit('contextmenu', {
          x: this.node.config.box.x + event.offsetX,
          y: this.node.config.box.y + event.offsetY,
          id: this.node.id
        })
      }
    },
    loopUpdate () {
      let that = this
      that.update().then(c => {
        if (that.view) {
          that.timeout = window.setTimeout(k => {
            that.loopUpdate()
          }, that.node.config.data.interval * 1000)
        }
      })
    },
    update () {
      let that = this
      return new Promise((resolve, reject) => {
        that.getNodeData().then(data => {
          let warnMsg = null
          if (data) {
            warnMsg = that.updateNodeData(data)
          }
          if (resolve) {
            resolve(warnMsg)
          }
        }).catch(e => {
          if (reject) {
            reject(e)
          }
        })
      })
    },
    getNodeData () {
      let that = this
      return new Promise(function (resolve, reject) {
        try {
          if (that.node.config.data) {
            let dbDataIndex = []
            let dbs = []
            let sqls = []
            let resData = []
            that.node.config.data.source.forEach((c, i) => {
              switch (c.type) {
                case 3: { // api
                  let apiConf= {}
                  if(c.apiConf){
                    apiConf = JSON.parse(c.apiConf)
                  }
                  if(that.$route.query.hasOwnProperty('X-Access-Token')){
                    if(apiConf.hasOwnProperty('headers')){
                      apiConf.headers['X-Access-Token'] = that.$route.query['X-Access-Token']
                    }
                   else{
                      apiConf = Object.assign(apiConf,{
                        headers:{
                          'X-Access-Token': that.$route.query['X-Access-Token']
                        }
                      })
                    }
                  }
                  let config =Object.assign(
                      { url:c.url, method:c.method },
                      c.method==='post'?{data:c.params||{}}:{},
                      apiConf)
                  that.axios(config).then(res=>{
                    if(res.status===200){
                      if(c.proPath){
                        let realData= res.data
                        let pros = c.proPath.split('.')
                        pros.forEach((p)=>{
                          realData = realData[p]
                        })
                        resData[i] = that.arraysToObjects(realData)
                      }else{
                        resData[i] = that.arraysToObjects(res.data)
                      }
                      if (resolve&&resData.length===that.node.config.data.source.length) {
                        resolve(resData)
                      }
                    }else {
                      resolve(null)
                    }
                  }).catch(e=>{
                    if (reject) {
                      reject(e)
                    }
                  })
                  break
                }
                case 2: { // json
                  resData[i] = typeof (c.json) === 'string' ? JSON.parse(c.json || null) : c.json
                  if (resolve&&resData.length===that.node.config.data.source.length) {
                    resolve(resData)
                  }
                  break
                }
                case 1: // sql
                default : {
                  dbs.push(c.db)
                  sqls.push(c.sql.replace(/\n/g, ' '))
                  if (c.sql && c.db) {
                    dbDataIndex.push(i)
                  } else {
                    resData[i] = null
                  }
                  getDbData(that, dbs, sqls).then(data => {
                    if (data) {
                      data.forEach((k, i) => {
                        resData[dbDataIndex[i]] = JSON.parse(k) || null
                      })
                    } else {
                      dbDataIndex.forEach(c => {
                        resData[c] = null
                      })
                    }
                    if (resolve) {
                      resolve(resData)
                    }
                  }).catch(c => {
                    dbDataIndex.forEach(c => {
                      resData[c] = null
                    })
                    if (reject) {
                      reject(c)
                    }
                  })
                  break
                }
              }
            })
          } else {
            if (resolve) {
              resolve(null)
            }
          }
        } catch (e) {
          if (reject) {
            reject(e)
          }
        }
      })
    },
    arraysToObjects(data){
      let _data = [...data]
      _data = _data.map(c=>{
        if(c instanceof Array){
          return {...c}
        }else {
          return c
        }
      })
      return _data
    },
    updateNodeData (data) {
      let errMsgs = null
      switch (this.node.config.data && this.node.config.data.coordinate) {
        case 'rightAngle': {
          errMsgs = this.setRightAngleData(data)
          break
        }
        case 'gauge':
        case 'pie': {
          errMsgs = this.setNoCoordinateData(data)
          break
        }
        case 'table': {
          errMsgs = this.setTableData(data)
          break
        }
      }
      return errMsgs
    },
    setRightAngleData (data) {
      let that = this
      let errMsgs = []
      if (this.node.config.data.source) {
        this.node.config.data.source.forEach((c, i) => {
          if (c) {
            let inErrMsg = {index: i, warn: []}
            let sourceData = validateData(i, data[i], inErrMsg.warn)
            let xAxisData = []
            let yAxisData = []
            if (sourceData && sourceData.length > 0) {
              if (!sourceData[0].hasOwnProperty(c.x)) {
                inErrMsg.warn.push('数据' + (i + 1) + '，x轴配置不正确')
              }
              if (!sourceData[0].hasOwnProperty(c.y)) {
                inErrMsg.warn.push('数据' + (i + 1) + '，y轴配置不正确')
              }
              if (inErrMsg.warn.length === 0) {
                sourceData.forEach(k => {
                  xAxisData.push(k[c.x])
                  yAxisData.push(k[c.y])
                })
              }
            }
            if (inErrMsg.warn.length > 0) {
              errMsgs.push(inErrMsg)
            }

            // 赋值
            if (c.xto && xAxisData.length > 0) {
              setDataOptions(that, c.xto, xAxisData)
            }
            if (c.yto) {
              setDataOptions(that, c.yto, yAxisData)
            }
            if (c.sto) {
              setDataOptions(that, c.sto, c.s)
            }
          }
        })
      }
      that.setChartOption()
      return errMsgs.length > 0 ? errMsgs : null
    },
    setNoCoordinateData (data) {
      let that = this
      let errMsgs = []
      if (this.node.config.data.source) {
        this.node.config.data.source.forEach((c, i) => {
          if (c) {
            let inErrMsg = {index: i, warn: []}
            let sourceData = validateData(i, data[i], inErrMsg.warn)
            let seriesData = []
            let legendData = []
            if (sourceData && sourceData.length > 0) {
              if (!sourceData[0].hasOwnProperty(c.name)) {
                inErrMsg.warn.push('数据' + i + '，名称字段配置不正确')
              }
              if (!sourceData[0].hasOwnProperty(c.value)) {
                inErrMsg.warn.push('数据' + i + '，数值配置不正确')
              }
              if (inErrMsg.warn.length === 0) {
                sourceData.forEach(k => {
                  legendData.push(k[c.name])
                  seriesData.push({name: k[c.name], value: k[c.value]})
                })
              }
            }
            if (inErrMsg.warn.length > 0) {
              errMsgs.push(inErrMsg)
            }
            // 赋值
            if (seriesData.length > 0) {
              that.node.config.options.series.data = seriesData
            }
            if (legendData.length > 0) {
              if (that.node.config.options.legend) {
                that.node.config.options.legend.data = legendData
              }
            }
            if (c.sto) {
              setDataOptions(that, c.sto, c.s)
            }
          }
        })
      }
      return errMsgs.length > 0 ? errMsgs : null
    },
    setTableData (data) {
      let errMsgs = []
      if (this.node.config.data.source) {
        this.node.config.data.source.forEach((c, i) => {
          if (c) {
            let inErrMsg = {index: i, warn: []}
            let sourceData = validateData(i, data[i], inErrMsg.warn)
            let column = []
            if (sourceData && sourceData.length > 0) {
              Object.keys(sourceData[0]).forEach(k => {
                column.push({title: k, field: k})
              })
            }
            if (inErrMsg.warn.length > 0) {
              errMsgs.push(inErrMsg)
            }
            // 赋值
            if (column.length > 0) {
              this.node.config.options.column = column
            }
            if (sourceData) {
              this.node.config.options.data = sourceData
            }
          }
        })
      }
      return errMsgs.length > 0 ? errMsgs : null
    },
    keydown () {
      event.preventDefault()
      switch (event.keyCode) {
        case 38: { // 上
          this.node.config.box.y--
          break
        }
        case 40: { // 下
          this.node.config.box.y++
          break
        }
        case 37: { // 左
          this.node.config.box.x--
          break
        }
        case 39: { // 右
          this.node.config.box.x++
          break
        }
      }
    },
    setChartOption () {
      if (this.node.type === 'eCharts' && this.node.config.data.source) {
        let cloneNode = JSON.parse(JSON.stringify(this.node))
        cloneNode.config.data.source.forEach((c, i) => {
          if ((!c.json && c.type === 2) || (!c.sql && c.type === 1) || !c.s) {
            cloneNode.config.options.series[i] = null
            cloneNode.config.options.legend.data[i] = null
          }
        })
        this.temOptions = cloneNode.config.options
        this.$refs['echarts'].mergeOptions(cloneNode.config.options, true)
      }
    }
  },
  created () {
    this.loopData()
  },
  mounted () {
    this.setChartOption()
  },
  watch: {
    'node.config.options': {
      handler (e, t) {
        this.setChartOption()
      },
      deep: true
    },
    'node.config.theme': {
      handler (e, t) {
        this.setChartOption()
      },
      deep: true
    }
  },
  destroyed () {
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }
}
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
  .mt_node{
    display: inline-block;
    cursor: pointer;
    position: absolute;
    outline: none;
  }
</style>
<style>
  *, :after, :before{
    box-sizing: border-box;
  }
</style>
