import commonData from '../commonData'
import sourceConf from '../sourceConf'
const lineBar = {
  resource: {
    box: {
      width: 600,
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
        text: '折柱组合图',
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
        trigger: 'axis',
        formatter: '{a}/{a1} <br/>{b}: {c}ml/{c1}°C',
        axisPointer: {
          type: 'shadow'
        },
        show: true
      },
      legend: {
        data: ['水量', '温度'],
        show: true,
        x: 'center',
        y: 'bottom',
        textStyle: {}
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
        show: true,
        axisLabel: {
          fontSize: 12,
          interval: 'auto',
          rotate: 0
        },
        axisLine: {
          lineStyle: {}
        },
        min: null,
        max: 'dataMax'
      },
      yAxis: [
        {
          name: '',
          type: 'value',
          show: true,
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            fontSize: 12,
            interval: 'auto',
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {}
          },
          splitLine: {
            lineStyle: {}
          }
        },
        {
          name: '',
          type: 'value',
          show: true,
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            fontSize: 12,
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {}
          },
          splitLine: {
            lineStyle: {}
          }
        }
      ],
      series: [
        {
          name: '水量',
          type: 'bar',
          data: [12.0, 34.9, 63.2, 126.7, 82.6, 40.0, 26.4],
          itemStyle: {},
          label: {
            show: true,
            formatter: '{c}ml',
            fontSize: 12,
            fontWeight: 'normal',
            position: 'top'
          }
        },
        {
          name: '温度',
          type: 'line',
          yAxisIndex: 1,
          data: [12.0, 6.2, 11.3, 20.4, 16.0, 16.5, 12.0],
          itemStyle: {},
          label: {
            show: true,
            formatter: '{c}°C',
            fontSize: 12,
            fontWeight: 'normal',
            position: 'top'
          }
        }
      ]
    },
    data: {
      coordinate: 'rightAngle', // 直角坐标系
      loop: false,
      interval: 30,
      source: [
        { type: 2,
          db: '',
          sql: '',
          json: '[{"month":"1月","value":12.0},\n' +
            '{"month":"2月","value":34.9},\n' +
            '{"month":"3月","value":63.2},\n' +
            '{"month":"4月","value":126.7},\n' +
            '{"month":"5月","value":82.6},\n' +
            '{"month":"6月","value":40.0},\n' +
            '{"month":"7月","value":26.4}]',
          x: 'month',
          y: 'value',
          s: '水量',
          xto: 'xAxis/data',
          yto: 'series/0/data',
          sto: ['legend/data/0', 'series/0/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''},
        { type: 2,
          db: '',
          sql: '',
          json: '[{"month":"1月","value":12.0},\n' +
            '{"month":"2月","value":6.2},\n' +
            '{"month":"3月","value":11.3},\n' +
            '{"month":"4月","value":20.4},\n' +
            '{"month":"5月","value":16.0},\n' +
            '{"month":"6月","value":16.5},\n' +
            '{"month":"7月","value":12.0}]',
          x: 'month',
          y: 'value',
          s: '温度',
          xto: 'xAxis/data',
          yto: 'series/1/data',
          sto: ['legend/data/1', 'series/1/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''}
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
            key: 'options/tooltip',
            name: '提示',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'formatter', name: '格式', type: 'text'}
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
              {key: 'interval', name: '刻度间隔', type: 'text'},
              {key: 'rotate', name: '旋转角度', type: 'number',unit: '度'}
            ]
          },
          {
            key: 'options/yAxis/0',
            name: 'y1轴',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'name', name: '名称', type: 'text'},
              {key: 'min', name: '最小值', type: 'text'},
              {key: 'max', name: '最大值', type: 'text'},
              {key: 'interval', name: '分割数', type: 'number', unit: ' '}
            ]
          },
          {
            key: 'options/yAxis/0/axisLabel',
            name: 'y1轴标签',
            sub: [
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'formatter', name: '格式', type: 'text'},
              {key: 'interval', name: '刻度间隔', type: 'text'}
            ]
          },
          {
            key: 'options/yAxis/0/splitLine/lineStyle',
            name: 'y1轴分隔线',
            sub: [
              {key: 'type', name: '类型', type: 'select', data: commonData.splitLine_type}
            ]
          },
          {
            key: 'options/yAxis/1',
            name: 'y2轴',
            sub: [
              {key: 'show', name: '是否显示', type: 'boolean'},
              {key: 'name', name: '名称', type: 'text'},
              {key: 'min', name: '最小值', type: 'text'},
              {key: 'max', name: '最大值', type: 'text'},
              {key: 'interval', name: '分割数', type: 'number', unit: ' '}
            ]
          },
          {
            key: 'options/yAxis/1/axisLabel',
            name: 'y2轴标签',
            sub: [
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'formatter', name: '格式', type: 'text'},
              {key: 'interval', name: '刻度间隔', type: 'text'}
            ]
          },
          {
            key: 'options/yAxis/1/splitLine/lineStyle',
            name: 'y2轴分隔线',
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
          }, {
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
            key: 'options/title/subtextStyle',
            name: '子标题',
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
            key: 'options/yAxis/0/axisLabel',
            name: 'y1轴标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/0/axisLine/lineStyle',
            name: 'y1轴轴线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/0/splitLine/lineStyle',
            name: 'y1轴分隔线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/1/axisLabel',
            name: 'y2轴标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/1/axisLine/lineStyle',
            name: 'y2轴轴线',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/yAxis/1/splitLine/lineStyle',
            name: 'y2轴分隔线',
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
      },
    ]
  }
}
export default lineBar
