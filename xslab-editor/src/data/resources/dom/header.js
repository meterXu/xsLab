import imgData from "@/data/resources/imgData";

const header = {
  resource: {
    box: {
      width: 1000,
      height: 120,
      x: 0,
      y: 0,
      zIndex: 100
    },
    type: 'img',
    theme: 'default',
    options: {
      src: './img/header/2.png'
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
          name: '图片',
          sub: [
            {key: 'src', name: '图片', type: 'img-selector',props:{
                title:'背景设置',
                source:[
                  {
                    title:'图片',
                    imgs:imgData.header
                  }
                ]
              }},
            { key: '', type: 'div', style: { height: 200 } }
          ]
        }
      ]
    }
    ]
  }
}
export default header
