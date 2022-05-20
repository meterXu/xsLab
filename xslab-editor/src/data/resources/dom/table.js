import commonData from '../commonData'
import sourceConf from '../sourceConf'

const table = {
  resource: {
    type: 'table',
    theme: 'default',
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
        borderStyle: 'solid',
        border:true,
        stripe:false,
        "disabled-hover":false,
        "no-data-text":"暂无数据"
      },
      pagination:{
        enable:false,
        'show-total':false,
        'show-sizer':false,
        'show-elevator':false,
        'simple':false,
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
      },
    },
    data: {
      coordinate: 'table', // 无坐标系
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
      type: '属性',
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
            {key: 'border', name: '纵向边框', type: 'boolean'},
            {key: 'stripe', name: '间隔斑马纹', type: 'boolean'},
            {key: 'disabled-hover', name: '禁用悬停时的高亮', type: 'boolean'},
            {key: 'no-data-text', name: '数据为空时显示的提示内容', type: 'text'}

          ]
        },{
          key: 'options/pagination',
          name: '分页',
          sub: [
            {key: 'enable', name: '启用分页', type: 'boolean'},
            {key: 'show-total', name: '显示总数', type: 'boolean'},
            {key: 'show-sizer', name: '显示分页', type: 'boolean'},
            {key: 'show-elevator', name: '显示电梯', type: 'boolean'},
            {key: 'simple', name: '简洁版', type: 'boolean'},
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
            ...sourceConf,
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }]
    }]
  }

}
export default table
