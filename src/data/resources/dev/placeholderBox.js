const placeholderBox = {
  resource: {
    box: {
      width: 500,
      height: 400,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'placeholderBox',
    options: {
      key: ''
    },
    data: {
      source: [
        { type: 1,
          db: '',
          sql: '',
          json: ''
        }
      ]
    }
  },
  option: {
    config: [
      {
        type: '基础',
        con: [
          {
            key: 'box',
            name: '大小及坐标',
            sub: [
              {key: 'width', name: '宽度', type: 'number'},
              {key: 'height', name: '高度', type: 'number'},
              {key: 'x', name: 'x', type: 'number'},
              {key: 'y', name: 'y', type: 'number'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          },
          {
            key: 'options',
            name: '开发属性',
            sub: [
              {key: 'key', name: '占位key', type: 'text'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }
        ]
      }, {
        type: '数据',
        icon: 'md-pulse',
        con: [{
          key: 'data/source/0',
          name: '数据',
          sub: [
            { key: 'type',
              name: '来源',
              type: 'select',
              data: [
                { value: 1, icon: 'md-albums', text: '数据库' },
                { value: 2, icon: 'md-code', text: '静态' },
                { value: 3, icon: 'md-cloud', text: '接口' }]},
            {key: 'db', name: '数据库', type: 'select', data: [], rdTab: 1},
            {key: 'sql', name: 'SQL语句', type: 'code', mode: 'text/x-sql', rdTab: 1},
            {key: 'json', name: 'JSON数据', type: 'code', mode: 'text/javascript', rdTab: 2},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }]
      }
    ]
  }
}
export default placeholderBox
