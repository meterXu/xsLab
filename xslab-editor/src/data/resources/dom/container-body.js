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
    type: 'container-body',
    options: {
      background: {
        backgroundColor: 'transparent',
        backgroundImg: window.config.baseUrl+'/material/containerBody-body/1模块标题_模块边框.png',
        backgroundSize: '100%',
        backgroundRepeat: 'round'
      },
      border: {
        borderWidth: 0,
        borderColor: 'transparent',
        borderStyle: 'solid'
      }
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
            key: 'options/background',
            name: '背景',
            sub: [
              {key: 'backgroundImg', name: '图片', type: 'img-selector',props:{
                  title:'背景设置',
                  source:[
                    {
                      title:'图片',
                      imgsUrl:'/api/img/list?bigType=containerBody&smallType=body'
                    }
                  ]
                }},
              {key: 'backgroundSize', name: '大小', type: 'text'},
              {key: 'backgroundRepeat', name: '重复模式', type: 'select', data: commonData.repeat}
            ]
          },
          {
            key: 'options/border',
            name: '边框',
            sub: [
              {key: 'borderWidth', name: '粗细', type: 'number'},
              {key: 'borderStyle', name: '类型', type: 'select', data: commonData.border},
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
            key: 'options/background',
            name: '背景',
            sub: [
              {key: 'backgroundColor', name: '背景色', type: 'color'}
            ]
          },
          {
            key: 'options/border',
            name: '边框',
            sub: [
              {key: 'borderColor', name: '边框色', type: 'color'},
              { key: '', type: 'div', style: { height: 200 } }
            ]
          }
        ]
      }
    ]
  }
}
export default containerBody
