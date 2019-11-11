import config from '../../../config/config'
import commonData from '../commonData'

const slide = {
  resource: {
    box: {
      width: 600,
      height: 300,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'slide',
    theme: config.chartNodeTheme,
    options: {
      pagination: true,
      pageColor: {
        normal: null,
        active: null
      },
      slides: 'a\nb\nc',
      speed: 1,
      autoplay: 3
    }
  },
  option: {
    config: [{
      type: '基础',
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
          key: 'options',
          name: '配置',
          sub: [
            {key: 'pagination', name: '分页', type: 'boolean'},
            {key: 'speed', name: '速度', type: 'number', unit: 's'},
            {key: 'autoplay', name: '播放时间', type: 'number', unit: 's'},
            {key: 'slides', name: '内容', type: 'code', mode: 'text/javascript'},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }
      ]
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
          key: 'options/pageColor',
          name: '分页',
          sub: [
            {key: 'normal', name: '正常', type: 'color'},
            {key: 'active', name: '活动', type: 'color'}
          ]
        }
      ]
    }
    ]
  }
}
export default slide
