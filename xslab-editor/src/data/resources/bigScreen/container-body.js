import commonData from '../commonData'
const containerBody = {
  resource: {
    box: {
      width: 500,
      height: 400,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'div',
    options: {
      backgroundColor: 'transparent',
      backgroundImg: window.config.baseUrl+'/material/container-body/aaa.png',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
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
            name: '背景',
            sub: [
              {key: 'backgroundImg', name: '图片', type: 'img-selector',props:{
                  title:'背景设置',
                  source:[
                    {
                      title:'图片',
                      imgsUrl:'/api/img/list?bigType=container&smallType=body'
                    }
                  ]
                }},
              {key: 'backgroundSize', name: '大小', type: 'text'},
              {key: 'backgroundRepeat', name: '重复模式', type: 'select', data: commonData.repeat}
            ]
          }
        ]
      },
      {
        type: '样式',
        icon: 'md-brush',
        con: [
          {
            key: 'options',
            name: '背景',
            sub: [
              {key: 'backgroundColor', name: '背景色', type: 'color'}
            ]
          }
        ]
      }
    ]
  }
}
export default containerBody
