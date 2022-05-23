import commonData from '../commonData'
import sourceConf from '../sourceConf'
const gauge = { // 简单仪表盘
  resource: {
    box: {
      width: 400,
      height: 300,
      x: 0,
      y: 0,
      zIndex: 100
    },
    theme: 'default',
    options: {
      grid:{
        show:false,
        left: '10%',
        right: '10%',
        top: '60',
        bottom: '60'
      },
      title: {
        text: '简单仪表盘',
        subtext: '',
        textStyle: {
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: 18,
          lineHeight: 18
        },
        subtextStyle: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 12,
          lineHeight: 12
        },
        x: 'center',
        show: true
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
        show: true
      },
      series:
        {
          name: '业务指标',
          type: 'gauge',
          detail: {
            formatter: '{value}%',
            show: true,
            fontSize: 15,
            lineHeight: 56
          },
          data: [{value: 60, name: '完成率'}],
          title: {
            show: true
          },
          radius: '75%',
          startAngle: 225,
          endAngle: -45,
          clockwise: true,
          min: 0,
          max: 100,
          splitNumber: 10,
          pointer: {
            show: true,
            length: '80%',
            width: 8
          },
          itemStyle: {
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true
          }
        }
    },
    data: {
      coordinate: 'pie', // 量规，无坐标系
      loop: true,
      interval: 30,
      source: [
        {type: 2,
          db: '',
          sql: '',
          json: '[{"value": 60, "name": "完成率"}]',
          name: 'name',
          value: 'value',
          s: '业务指标',
          sto: ['series/name']}
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
          },
          {
            key: 'options/grid',
            name: '绘图网格',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'top', name: '顶部边距', type: 'text'},
              {key: 'left', name: '左侧边距', type: 'text'},
              {key: 'right', name: '右侧边距', type: 'text'},
              {key: 'bottom', name: '底部边距', type: 'text'}
            ]
          },
          {
            key: 'options/title',
            name: '标题',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'text', name: '标题', type: 'text'},
              {key: 'subtext', name: '子标题', type: 'text'},
              {key: 'x', name: '对齐方式', type: 'select', data: commonData.align_x}
            ]
          },
          {
            key: 'options/title/textStyle',
            name: '标题详细',
            sub: [
              {key: 'fontStyle', name: '风格', type: 'select', data: commonData.fontStyle},
              {key: 'fontWeight', name: '粗细', type: 'select', data: commonData.fontWeight},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'lineHeight', name: '行高', type: 'number'}
            ]
          },
          {
            key: 'options/title/subtextStyle',
            name: '子标题详细',
            sub: [
              {key: 'fontStyle', name: '风格', type: 'select', data: commonData.fontStyle},
              {key: 'fontWeight', name: '粗细', type: 'select', data: commonData.fontWeight},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'lineHeight', name: '行高', type: 'number'}
            ]
          },
          {
            key: 'options/tooltip',
            name: '提示',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'formatter', name: '格式', type: 'text'}
            ]
          },
          {
            key: 'options/series',
            name: '仪表盘',
            sub: [
              {key: 'name', name: '名称', type: 'text'},
              {key: 'radius', name: '半径大小', type: 'text'},
              {key: 'startAngle', name: '起始角度', type: 'number'},
              {key: 'endAngle', name: '结束角度', type: 'number'},
              {key: 'clockwise', name: '刻度顺时针', type: 'boolean'},
              { key: 'min', name: '最小值', type: 'number' },
              { key: 'max', name: '最大值', type: 'number' },
              { key: 'splitNumber', name: '分割段数', type: 'number' }
            ]
          }, {
            key: 'options/series/title',
            name: '指标',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'}
            ]
          }, {
            key: 'options/series/detail',
            name: '数值',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'formatter', name: '格式', type: 'text'},
              {key: 'fontStyle', name: '风格', type: 'select', data: commonData.fontStyle},
              {key: 'fontWeight', name: '粗细', type: 'select', data: commonData.fontWeight},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'lineHeight', name: '行高', type: 'number'}
            ]
          }, {
            key: 'options/series/pointer',
            name: '指针',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'length', name: '长度', type: 'text'},
              {key: 'width', name: '宽度', type: 'number'}
            ]
          }, {
            key: 'options/series/axisLine',
            name: '轴线',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'}
            ]
          }, {
            key: 'options/series/splitLine',
            name: '分割线',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'}
            ]
          }, {
            key: 'options/series/axisTick',
            name: '刻度',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'}
            ]
          }, {
            key: 'options/series/axisLabel',
            name: '刻度标签',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
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
              ...sourceConf,
              {key: 'name', name: '名称字段', type: 'text'},
              {key: 'value', name: '数值字段', type: 'text'},
              {key: 's', name: '指标名称', type: 'text'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }]
      },
      {
        type: '样式',
        icon: 'md-brush',
        con: [
          {
            key: '',
            name: '全局',
            sub: [
              {key: 'theme',
                name: '主题',
                type: 'select',
                data: commonData.theme}
            ]
          },
          {
            key: 'options',
            name: '背景',
            sub: [
              {key: 'backgroundColor', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/title/textStyle',
            name: '标题',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/title/subtextStyle',
            name: '子标题',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/itemStyle',
            name: '指针',
            sub: [
              {key: 'color', name: '颜色', type: 'color'},
              {key: 'borderColor', name: '边框颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/detail',
            name: '数值',
            sub: [
              {key: 'color', name: '颜色', type: 'color'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }
        ]
      }
    ]
  }
}
export default gauge
