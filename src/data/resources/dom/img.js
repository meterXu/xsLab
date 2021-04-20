import config from '../../../config/config'

const img = {
  resource: {
    box: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'img',
    theme: config.chartNodeTheme,
    options: {
      src: ''
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
            {key: 'y', name: 'y', type: 'number'}
          ]
        },
        {
          key: 'options',
          name: '路径',
          sub: [
            {key: 'src', name: '路径', type: 'text'},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }
      ]
    }
    ]
  }
}
export default img
