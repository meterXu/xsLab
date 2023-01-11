import commonData from '../commonData'
const canvas = {
  resource: {
    type: 'canvas',
    options:{
      id: null,
      name: null,
      width: 0,
      height: 0,
      backgroundColor: null,
      backgroundImage: null,
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      baseUrl: null
    }

  },
  option: {
    config: [
      {
      type: '画布配置',
      icon: 'md-color-palette',
      con: [
        {
          key: 'options',
          name: '基础',
          sub: [
            {key: 'name', name: '名称', type: 'text'}
          ]
        },
        {
          key: 'options',
          name: '大小',
          sub: [
            {key: 'width', name: '宽度', type: 'number'},
            {key: 'height', name: '高度', type: 'number'}
          ]
        },
        {
          key: 'options',
          name: '背景',
          sub: [
            {key: 'backgroundColor', name: '背景色', type: 'color'},
            {key: 'backgroundImage', name: '背景图', type: 'img-selector',props:{
                title:'背景设置',
                source:[{
                  title:'正常图片',
                  imgsUrl:'/api/img/list?bigType=bg&smallType=normal'
                },{
                  title:'长屏图片',
                  imgsUrl:'/api/img/list?bigType=bg&smallType=long'
                }]
              }},
            {key: 'backgroundSize', name: '图片大小', type: 'select',data:commonData.backgroundSize},
            {key: 'backgroundRepeat', name: '重复模式', type: 'select', data: commonData.repeat},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }
      ]
    }]
  }
}
export default canvas
