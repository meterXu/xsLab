import commonData from '../commonData'
import config from '../../../config/config'

const table = {
  resource: {
    type: 'table',
    theme: config.chartNodeTheme,
    box: {
      width: 230,
      height: 160,
      x: 0,
      y: 0,
      zIndex: 100
    },
    options: {
      column: [
        { title: '编号', field: 'id', width: '50px' },
        { title: '英文', field: 'name', width: '100px' },
        { title: '中文', field: 'value', width: '80px' }
      ],
      data: [
        { 'id': 1, 'name': 'apple', 'value': '苹果' },
        { 'id': 2, 'name': 'banana', 'value': '香蕉' },
        { 'id': 3, 'name': 'cherry', 'value': '樱桃' },
        { 'id': 4, 'name': 'durian', 'value': '榴莲' }
      ],
      primary: {
        background: null,
        backgroundImg: '',
        borderWidth: 1,
        borderColor: null,
        borderStyle: 'solid'
      },
      th: {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: '微软雅黑',
        height: 30,
        color: null,
        backgroundColor: null,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomStyle: 'dotted',
        borderBottomColor: null,
        borderRightStyle: 'dotted',
        borderRightColor: null
      },
      td: {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: '微软雅黑',
        height: 30,
        color: null,
        backgroundColor: null,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomStyle: 'dotted',
        borderBottomColor: null,
        borderRightStyle: 'dotted',
        borderRightColor: null
      }
    },
    data: {
      coordinate: 'table', // 饼图，无坐标系
      loop: true,
      interval: 30,
      source: [
        {type: 2,
          db: '',
          sql: '',
          json: '[{"编号":"1","英文":"apple","中文":"苹果"},\n' +
            '{"编号":"2","英文":"banana","中文":"香蕉"},\n' +
            '{"编号":"3","英文":"cherry","中文":"樱桃"},\n' +
            '{"编号":"4","英文":"durian","中文":"榴莲"}]'}
      ]
    }
  },
  option: {
    config: [
      {
      type: '基础',
      icon: 'md-build',
      con: [
        {
          key: 'box',
          name: '大小及坐标',
          sub: [
            {key: 'width', name: '宽度', type: 'number'},
            {key: 'height', name: '高度', type: 'number'},
            {key: 'x', name: 'x', type: 'number'},
            {key: 'y', name: 'y', type: 'number'}
          ]
        }, {
          key: 'options/primary',
          name: '表格',
          sub: [
            {key: 'backgroundImg', name: '背景图', type: 'text'},
            {key: 'borderWidth', name: '边框大小', type: 'number'},
            {key: 'borderWidth', name: '边框类型', type: 'select', data: commonData.border}
          ]
        }, {
          key: 'options/th',
          name: '表头',
          sub: [
            {key: 'height', name: '高度', type: 'number'},
            {key: 'fontFamily', name: '字体', type: 'text'},
            {key: 'fontWeight', name: '字体粗细', type: 'select', data: commonData.fontWeight},
            {key: 'fontSize', name: '字体大小', type: 'number'},
            {key: 'borderRightWidth', name: '右边框大小', type: 'number'},
            {key: 'borderRightStyle', name: '右边框类型', type: 'select', data: commonData.border},
            {key: 'borderBottomWidth', name: '下边框大小', type: 'number'},
            {key: 'borderBottomStyle', name: '下边框类型', type: 'select', data: commonData.border}
          ]
        }, {
          key: 'options/td',
          name: '表体',
          sub: [
            {key: 'height', name: '高度', type: 'number'},
            {key: 'fontFamily', name: '字体', type: 'text'},
            {key: 'fontWeight', name: '字体粗细', type: 'select', data: commonData.fontWeight},
            {key: 'fontSize', name: '字体大小', type: 'number'},
            {key: 'borderRightWidth', name: '右边框大小', type: 'number'},
            {key: 'borderRightStyle', name: '右边框类型', type: 'select', data: commonData.border},
            {key: 'borderBottomWidth', name: '下边框大小', type: 'number'},
            {key: 'borderBottomStyle', name: '下边框类型', type: 'select', data: commonData.border},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }]
    },
      {
      type: '数据',
      icon: 'md-pulse',
      con: [{
        key: 'data',
        name: '全局配置',
        sub: [
          {key: 'loop', name: '轮询', type: 'boolean'},
          {key: 'interval', name: '间隔', type: 'number', unit: 's'}
        ]
      },
        {
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
    },
      {
      type: '样式',
      icon: 'md-brush',
      con: [{
        key: '',
        name: '全局',
        sub: [
          {key: 'theme',
            name: '主题',
            type: 'select',
            data: commonData.theme}
        ]
      }, {
        key: 'options/primary',
        name: '表格',
        sub: [
          {key: 'background', name: '背景色', type: 'color'},
          {key: 'borderColor', name: '边框色', type: 'color'}
        ]
      }, {
        key: 'options/th',
        name: '表头',
        sub: [
          {key: 'color', name: '前景色', type: 'color'},
          {key: 'backgroundColor', name: '背景色', type: 'color'},
          {key: 'borderBottomColor', name: '下边框色', type: 'color'},
          {key: 'borderRightColor', name: '右边框色', type: 'color'}
        ]
      }, {
        key: 'options/td',
        name: '表体',
        sub: [
          {key: 'color', name: '前景色', type: 'color'},
          {key: 'backgroundColor', name: '背景色', type: 'color'},
          {key: 'borderBottomColor', name: '下边框色', type: 'color'},
          {key: 'borderRightColor', name: '右边框色', type: 'color'},
          { key: '', type: 'div', style: { height: 240 } }
        ]
      }]
    }]
  }

}
export default table
