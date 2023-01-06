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
    type: 'card',
    theme: 'default',
    options: {
      title: {
        text: '卡片',
        color: null,
        fontSize: 18,
        fontWeight: 'normal',
        fontFamily: '微软雅黑',
        height: 32,
        lineHeight: 32,
        textAlign:'left',
        background: {
          backgroundColor: null,
          backgroundImg: null,
          backgroundSize: '100%',
          backgroundRepeat: 'round'
        },
        border: {
          borderBottomWidth: 0,
          borderBottomColor: null,
          borderBottomStyle: 'solid'
        }
      },
      background: {
        backgroundColor: null,
        backgroundImg: null,
        backgroundSize: '100%',
        backgroundRepeat: 'round'
      },
      border: {
        borderWidth: 0,
        borderRadius:3,
        borderColor: null,
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
            key: 'options/title',
            name: '标题',
            sub: [
              {key: 'text', name: '标题', type: 'text'},
              {
                key: 'textAlign',
                name: '对其方式',
                type: 'select',
                data: [
                  {text: '居左对齐', value: 'left'},
                  {text: '居中对齐', value: 'center'},
                  {text: '居右对齐', value: 'right'}]
              },
              {key: 'fontFamily', name: '字体', type: 'text'},
              {key: 'fontSize', name: '大小', type: 'number'},
              {key: 'fontWeight', name: '粗细', type: 'select', data: commonData.fontWeight},
              {key: 'height', name: '高度', type: 'number'},
              {key: 'lineHeight', name: '行高', type: 'number'}
            ]
          },
          {
            key: 'options/title/background',
            name: '标题背景',
            sub: [
              {key: 'backgroundImg', name: '图片', type: 'img-selector',props:{
                  title:'背景设置',
                  source:[
                    {
                      title:'图片',
                      imgsUrl:'/api/img/list?bigType=containerBody&smallType=title'
                    }
                  ]
                }},
              {key: 'backgroundSize', name: '大小', type: 'text'},
              {key: 'backgroundRepeat', name: '重复模式', type: 'select', data: commonData.repeat}
            ]
          },
          {
            key: 'options/title/border',
            name: '标题下边框',
            sub: [
              {key: 'borderBottomWidth', name: '粗细', type: ''},
              {key: 'borderBottomStyle', name: '类型', type: 'select', data: commonData.border}
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
              {key: 'borderRadius', name: '圆角', type: 'number'},
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
            key: 'options/title',
            name: '标题',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/title/background',
            name: '标题背景',
            sub: [
              {key: 'backgroundColor', name: '背景色', type: 'color'}
            ]
          },
          {
            key: 'options/title/border',
            name: '标题下边框',
            sub: [
              {key: 'borderBottomColor', name: '颜色', type: 'color'}
            ]
          },
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
