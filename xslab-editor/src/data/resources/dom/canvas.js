import commonData from '../commonData'
const canvas = {
  resource: {
    type: 'canvas',
    theme: 'default',
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
            {key: 'backgroundImage', name: '图片', type: 'img-selector',props:{
                title:'背景设置',
                source:[{
                  title:'正常图片',
                  imgsUrl:'/api/img/list?bigType=bg&smallType=normal'
                },{
                  title:'长屏图片',
                  imgsUrl:'/api/img/list?bigType=bg&smallType=long'
                }]
              }},
            {key: 'backgroundSize', name: '大小', type: 'text'},
            {key: 'backgroundRepeat', name: '重复模式', type: 'select', data: commonData.repeat},
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
          key: 'options',
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
            {key: 'backgroundColor', name: '颜色', type: 'color'},
            { key: '', type: 'div', style: { height: 300 } }
          ]
        }
      ]
    }]
  }
}
export default canvas
