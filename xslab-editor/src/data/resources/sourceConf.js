import Vue from 'vue'
import commonData from './commonData'
export default [
  { key: 'type',
    name: '来源',
    type: 'select',
    data: [
      { value: 1, icon: 'md-albums', text: '数据库' },
      { value: 2, icon: 'md-code', text: '静态' },
      { value: 3, icon: 'md-cloud', text: '接口' }]},
  {key: 'db', name: '数据库', type: 'select', data: []},
  {key: 'sql', name: 'SQL语句', type: 'code', mode: 'text/x-sql', rdTab: 1},
  {key: 'json', name: 'JSON数据', type: 'code', mode: 'application/json', rdTab: 2},
  {key: 'url', name: '接口地址', type: 'code',mode: 'text/javascript'},
  {key: 'method', name: '接口类型', type: 'select',data: commonData.method_type},
  {key: 'params', name: '接口参数', type: 'code', mode: 'application/json', rdTab: 2},
  {key: 'apiConf', name: '接口其他配置', type: 'code', mode: 'application/json', rdTab: 3},
  {key: 'proPath', name: '结果定位', type: 'code',mode: 'text/javascript'},
]
