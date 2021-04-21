import editorData from '../../data/editorData'

export default [
  { key: 'type',
    name: '来源',
    type: 'select',
    data: [
      { value: 1, icon: 'md-albums', text: '数据库' },
      { value: 2, icon: 'md-code', text: '静态' },
      { value: 3, icon: 'md-cloud', text: '接口' }]},
  {key: 'db', name: '数据库', type: 'select', data: editorData.databaseList, rdTab: 1},
  {key: 'sql', name: 'SQL语句', type: 'code', mode: 'text/x-sql', rdTab: 1},
  {key: 'json', name: 'JSON数据', type: 'code', mode: 'text/javascript', rdTab: 2},
]
