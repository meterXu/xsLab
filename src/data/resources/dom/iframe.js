import config from '../../../config/config'

const iframe = {
  resource: {
    box: {
      width: 400,
      height: 300,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'iframe',
    theme: config.chartNodeTheme,
    options: {
      href: ''
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
          name: '网址',
          sub: [
            {key: 'src', name: '网址', type: 'text'},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }
      ]
    }
    ]
  }
}
export default iframe
