// 正负条形图
import commonData from '../commonData'
import sourceConf from '../sourceConf'
const barNegative = {
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
      title: {
        show: true,
        text: '正负条形图',
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
        x: 'center'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['收入', '支出'],
        show: true,
        x: 'center',
        y: 'bottom',
        textStyle: {}
      },
      xAxis:
        {
          show: true,
          axisLabel: {
            fontSize: 12,
            interval: 'auto'
          },
          axisLine: {
            lineStyle: {}
          },
          splitLine: {
            lineStyle: {}
          },
          min: null,
          max: 'dataMax'
        },
      yAxis:
        {
          type: 'category',
          axisTick: {show: false},
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          show: true,
          axisLabel: {
            fontSize: 12,
            interval: 'auto'
          },
          axisLine: {
            lineStyle: {}
          },
          splitLine: {
            lineStyle: {}
          },
          interval: null,
          min: null,
          max: 'dataMax'
        },
      series: [
        {
          name: '收入',
          type: 'bar',
          stack: '总量',
          data: [320, 302, 341, 374, 390, 450, 420],
          itemStyle: {},
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 12,
            fontWeight: 'normal',
            position: 'right'
          }
        },
        {
          name: '支出',
          type: 'bar',
          stack: '总量',
          data: [-120, -132, -101, -134, -190, -230, -210],
          itemStyle: {},
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 12,
            fontWeight: 'normal',
            position: 'left'
          }
        }
      ]
    },
    data: {
      coordinate: 'rightAngle', // 直角坐标系
      loop: true,
      interval: 30,
      source: [
        {type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":320},\n' +
            '{"week":"周二","value":302},\n' +
            '{"week":"周三","value":341},\n' +
            '{"week":"周四","value":374},\n' +
            '{"week":"周五","value":390},\n' +
            '{"week":"周六","value":450},\n' +
            '{"week":"周日","value":420}]',
          x: 'value',
          y: 'week',
          s: '收入',
          xto: 'series/0/data',
          yto: 'yAxis/data',
          sto: ['legend/data/0', 'series/0/name']},
        {type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":-120},\n' +
            '{"week":"周二","value":-132},\n' +
            '{"week":"周三","value":-101},\n' +
            '{"week":"周四","value":-134},\n' +
            '{"week":"周五","value":-190},\n' +
            '{"week":"周六","value":-230},\n' +
            '{"week":"周日","value":-210}]',
          x: 'value',
          y: 'week',
          s: '支出',
          xto: 'series/1/data',
          yto: 'yAxis/data',
          sto: ['legend/data/1', 'series/1/name']}
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
            key: 'options/legend',
            name: '图例',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'x',
                name: '水平对齐',
                type: 'select',
                data: commonData.align_x},
              {key: 'y',
                name: '垂直对齐',
                type: 'select',
                data: commonData.align_y}
            ]
          },
          {
            key: 'options/xAxis',
            name: 'x轴',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'min', name: '最小值', type: 'text'},
              {key: 'max', name: '最大值', type: 'text'}
            ]
          },
          {
            key: 'options/xAxis/axisLabel',
            name: 'x轴标签',
            sub: [
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'interval', name: '刻度间隔', type: 'text'}
            ]
          },
          {
            key: 'options/yAxis',
            name: 'y轴',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'name', name: '名称', type: 'text'},
              {key: 'min', name: '最小值', type: 'text'},
              {key: 'max', name: '最大值', type: 'text'},
              {key: 'interval', name: '分割数', type: 'number', unit: ' '}
            ]
          },
          {
            key: 'options/yAxis/axisLabel',
            name: 'y轴标签',
            sub: [
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'interval', name: '刻度间隔', type: 'text'}
            ]
          },
          {
            key: 'options/yAxis/splitLine/lineStyle',
            name: 'y轴分隔线',
            sub: [
              {key: 'type', name: '类型', type: 'select', data: commonData.splitLine_type}
            ]
          },
          {
            key: 'options/series/0/label',
            name: '数据1标签',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'formatter', name: '格式', type: 'text'},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'fontWeight',
                name: '粗细',
                type: 'select',
                data: commonData.fontWeight},
              {key: 'position',
                name: '定位',
                type: 'select',
                data: commonData.position}
            ]
          },
          {
            key: 'options/series/1/label',
            name: '数据2标签',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'formatter', name: '格式', type: 'text'},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'fontWeight',
                name: '粗细',
                type: 'select',
                data: commonData.fontWeight},
              {key: 'position',
                name: '定位',
                type: 'select',
                data: commonData.position},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }
        ]
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
            name: '数据1',
            sub: [
              ...sourceConf,
              {key: 'x', name: 'x轴字段', type: 'text'},
              {key: 'y', name: 'y轴字段', type: 'text'},
              {key: 's', name: '指标名称', type: 'text'}
            ]
          }, {
            key: 'data/source/1',
            name: '数据2',
            sub: [
              ...sourceConf,
              {key: 'x', name: 'x轴字段', type: 'text'},
              {key: 'y', name: 'y轴字段', type: 'text'},
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
            key: 'options/legend/textStyle',
            name: '图例',
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
            key: 'options/xAxis/axisLabel',
            name: 'x轴标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/xAxis/axisLine/lineStyle',
            name: 'x轴轴线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/xAxis/splitLine/lineStyle',
            name: 'x轴分隔线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/axisLabel',
            name: 'y轴标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/axisLine/lineStyle',
            name: 'y轴轴线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/0/itemStyle',
            name: '数据1',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/0/label',
            name: '数据1标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/1/itemStyle',
            name: '数据2',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/1/label',
            name: '数据2标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'},
              { key: '', type: 'div', style: { height: 240 } }
            ]
          }
        ]
      }
    ]
  }
}
export default barNegative
