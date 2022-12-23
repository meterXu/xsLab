import commonData from '../commonData'

const text = {
  resource: {
    box: {
      width: 80,
      height: 40,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'text',
    theme: 'default',
    options: {
      text: {
        fontFamily: '微软雅黑',
        content: 'Ta',
        fontSize: 30,
        color: null,
        fontWeight: 'normal'
      },
      boxSpace: {
        lineHeight: 40,
        textAlign: 'center'
      },
      background: {
        color: 'transparent'
      },
      border: {
        width: 0,
        style: 'solid',
        color: 'transparent'
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
            key: 'options/text',
            name: '文字',
            sub: [
              {key: 'fontFamily', name: '字体', type: 'text'},
              {key: 'content', name: '内容', type: 'text'},
              {key: 'fontSize', name: '大小', type: 'number'},
              {
                key: 'fontWeight',
                name: '粗细',
                type: 'select',
                data: [
                  {text: '正常', value: 'normal'},
                  {text: '加粗', value: 'bold'},
                  {text: '细化', value: 'lighter'}
                ]
              }
            ]
          },
          {
            key: 'options/boxSpace',
            name: '空间',
            sub: [
              {key: 'lineHeight', name: '行高', type: 'number'},
              {
                key: 'textAlign',
                name: '对其方式',
                type: 'select',
                data: [
                  {text: '居左对齐', value: 'left'},
                  {text: '居中对齐', value: 'center'},
                  {text: '居右对齐', value: 'right'}]
              }
            ]
          },
          {
            key: 'options/border',
            name: '边框',
            sub: [
              {key: 'width', name: '大小', type: 'number'},
              {
                key: 'style',
                name: '样式',
                type: 'select',
                data: commonData.border
              },
              {key: '', type: 'div', style: {height: 200}}
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
              {
                key: 'theme',
                name: '主题',
                type: 'select',
                data: commonData.theme
              }
            ]
          },
          {
            key: 'options/text',
            name: '文字',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/background',
            name: '背景',
            sub: [
              {key: 'color', name: '颜色', type: 'color'}
            ]
          },
          {
            key: 'options/border',
            name: '边框',
            sub: [
              {key: 'color', name: '颜色', type: 'color'},
              {key: '', type: 'div', style: {height: 240}}
            ]
          }
        ]
      }]
  }
}
export default text
