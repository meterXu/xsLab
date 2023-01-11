import commonData from '../commonData'
import sourceConf from '../sourceConf'
const lineMulti = {
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
        text: '多线折线图',
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
        formatter: '',
        axisPointer: {
          type: 'shadow'
        },
        show: true
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        max: null
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问'],
        show: true,
        x: 'center',
        y: 'bottom',
        textStyle: {}
      },
      yAxis: {
        type: 'value',
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
        max: null
      },
      series: [{
        name: '邮件营销',
        data: [120, 132, 101, 134, 90, 230, 210],
        type: 'line',
        itemStyle: {},
        label: {
          show: true,
          formatter: '{c}',
          fontSize: 12,
          fontWeight: 'normal',
          position: 'top'
        }
      },
      {
        name: '联盟广告',
        data: [320, 382, 391, 334, 390, 330, 310],
        type: 'line',
        itemStyle: {},
        label: {
          show: true,
          formatter: '{c}',
          fontSize: 12,
          fontWeight: 'normal',
          position: 'top'
        }
      },
      {
        name: '视频广告',
        data: [150, 232, 201, 154, 190, 360, 410],
        type: 'line',
        itemStyle: {},
        label: {
          show: true,
          formatter: '{c}',
          fontSize: 12,
          fontWeight: 'normal',
          position: 'top'
        }
      },
      {
        name: '直接访问',
        data: [620, 632, 601, 634, 790, 830, 620],
        type: 'line',
        itemStyle: {},
        label: {
          show: true,
          formatter: '{c}',
          fontSize: 12,
          fontWeight: 'normal',
          position: 'top'
        }
      }]
    },
    data: {
      coordinate: 'rightAngle', // 直角坐标系
      loop: false,
      interval: 30,
      source: [
        { type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":120},\r\n' +
            '{"week":"周二","value":132},\r\n' +
            '{"week":"周三","value":101},\r\n' +
            '{"week":"周四","value":134},\r\n' +
            '{"week":"周五","value":90},\r\n' +
            '{"week":"周六","value":230},\r\n' +
            '{"week":"周日","value":210}]',
          x: 'week',
          y: 'value',
          s: '邮件营销',
          xto: 'xAxis/data',
          yto: 'series/0/data',
          sto: ['legend/data/0', 'series/0/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''
        },
        { type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":320},\r\n' +
            '{"week":"周二","value":382},\r\n' +
            '{"week":"周三","value":391},\r\n' +
            '{"week":"周四","value":334},\r\n' +
            '{"week":"周五","value":390},\r\n' +
            '{"week":"周六","value":330},\r\n' +
            '{"week":"周日","value":310}]',
          x: 'week',
          y: 'value',
          s: '联盟广告',
          xto: 'xAxis/data',
          yto: 'series/1/data',
          sto: ['legend/data/1', 'series/1/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''
        },
        { type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":150},\r\n' +
            '{"week":"周二","value":232},\r\n' +
            '{"week":"周三","value":201},\r\n' +
            '{"week":"周四","value":154},\r\n' +
            '{"week":"周五","value":190},\r\n' +
            '{"week":"周六","value":360},\r\n' +
            '{"week":"周日","value":410}]',
          x: 'week',
          y: 'value',
          s: '视频广告',
          xto: 'xAxis/data',
          yto: 'series/2/data',
          sto: ['legend/data/2', 'series/2/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''
        },
        { type: 2,
          db: '',
          sql: '',
          json: '[{"week":"周一","value":620},\r\n' +
            '{"week":"周二","value":632},\r\n' +
            '{"week":"周三","value":601},\r\n' +
            '{"week":"周四","value":634},\r\n' +
            '{"week":"周五","value":790},\r\n' +
            '{"week":"周六","value":830},\r\n' +
            '{"week":"周日","value":620}]',
          x: 'week',
          y: 'value',
          s: '直接访问',
          xto: 'xAxis/data',
          yto: 'series/3/data',
          sto: ['legend/data/3', 'series/3/name'],
          url:'',
          method:'',
          params:'',
          apiConf:'',
          proPath:''
        }
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
                data: commonData.position}
            ]
          }, {
            key: 'options/series/2/label',
            name: '数据3标签',
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
            key: 'options/series/3/label',
            name: '数据4标签',
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
              {key: 's', name: '指标名称', type: 'text'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }, {
            key: 'data/source/1',
            name: '数据2',
            sub: [
              ...sourceConf,
              {key: 'x', name: 'x轴字段', type: 'text'},
              {key: 'y', name: 'y轴字段', type: 'text'},
              {key: 's', name: '指标名称', type: 'text'}
            ]
          }, {
            key: 'data/source/2',
            name: '数据3',
            sub: [
              ...sourceConf,
              {key: 'x', name: 'x轴字段', type: 'text'},
              {key: 'y', name: 'y轴字段', type: 'text'},
              {key: 's', name: '指标名称', type: 'text'}
            ]
          }, {
            key: 'data/source/3',
            name: '数据4',
            sub: [
              ...sourceConf,
              {key: 'x', name: 'x轴字段', type: 'text'},
              {key: 'y', name: 'y轴字段', type: 'text'},
              {key: 's', name: '指标名称', type: 'text'}
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
            key: 'options/yAxis/splitLine/lineStyle',
            name: 'y轴分隔线',
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
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/2/itemStyle',
            name: '数据3',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/2/label',
            name: '数据3标签',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/3/itemStyle',
            name: '数据4',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/3/label',
            name: '数据4标签',
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
export default lineMulti
