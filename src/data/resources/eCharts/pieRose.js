import commonData from '../commonData'
import config from '../../../config/config'
import sourceConf from '../sourceConf'
const pieRose = {
  resource: {
    box: {
      width: 400,
      height: 300,
      x: 0,
      y: 0,
      zIndex: 100
    },
    theme: config.chartNodeTheme,
    options: {
      title: {
        text: '南丁格尔图',
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
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
        show: true
      },
      legend: {
        show: false,
        type: 'scroll',
        orient: 'vertical',
        x: 'center',
        y: 'bottom',
        left: 0,
        right: 0,
        top: 20,
        bottom: 0,
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
        textStyle: {}
      },
      series:
        {
          name: '面积模式',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          label: {
            show: true,
            formatter: '{b}:{c}',
            fontSize: 12,
            fontWeight: 'normal',
            position: 'outside'
          },
          data: [
            {value: 10, name: 'rose1'},
            {value: 5, name: 'rose2'},
            {value: 15, name: 'rose3'},
            {value: 25, name: 'rose4'},
            {value: 20, name: 'rose5'},
            {value: 35, name: 'rose6'},
            {value: 30, name: 'rose7'},
            {value: 40, name: 'rose8'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
    },
    data: {
      coordinate: 'pie', // 饼图，无坐标系
      loop: true,
      interval: 30,
      source: [
        {type: 2,
          db: '',
          sql: '',
          json: '[{"name":"rose1","value":10},\n' +
            '{"name":"rose2","value":5},\n' +
            '{"name":"rose3","value":15},\n' +
            '{"name":"rose4","value":25},\n' +
            '{"name":"rose5","value":20},\n' +
            '{"name":"rose6","value":35},\n' +
            '{"name":"rose7","value":30},\n' +
            '{"name":"rose8","value":40}]',
          name: 'name',
          value: 'value',
          s: '面积模式',
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
                data: commonData.align_y},
              {key: 'type', name: '类型', type: 'select', data: commonData.legend_type},
              {key: 'orient', name: '布局朝向', type: 'select', data: commonData.legend_orient},
              {key: 'left', name: '左边距', type: 'number'},
              {key: 'right', name: '右边距', type: 'number'},
              {key: 'top', name: '上边距', type: 'number'},
              {key: 'bottom', name: '下边距', type: 'number'}
            ]
          },
          {
            key: 'options/series',
            name: '数据1模式',
            sub: [
              {key: 'roseType', name: '模式', type: 'select', data: commonData.rose_type}
            ]
          },
          {
            key: 'options/series/radius',
            name: '数据1半径',
            sub: [
              {key: '0', name: '内半径', type: 'number'},
              {key: '1', name: '外半径', type: 'number'}
            ]
          },
          {
            key: 'options/series/label',
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
                data: commonData.piePosition},
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
            key: 'options/legend/textStyle',
            name: '图例',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/series/label',
            name: '数据1标签',
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
export default pieRose
