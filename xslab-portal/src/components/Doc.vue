<template>
  <div class="container-fluid">
    <DocNav :menu="menu[type]"></DocNav>
    <div class="page">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import DocNav from './DocNav'
export default {
  name: 'Doc',
  props: {
    type: {
      default: '0',
      type: String
    }
  },
  components: {
    DocNav
  },
  data () {
    return {
      menu: [
        [
          {
            title: '用户手册',
            sub: [
              {
                to: { name: 'DocBody', params: { id: '1', html: '0' } },
                title: 'XSLab介绍'
              },
              {
                to: { name: 'DocBody', params: { id: '2', html: '0' } },
                title: '添加画布'
              },
              {
                to: { name: 'DocBody', params: { id: '3', html: '0' } },
                title: '添加图表'
              },
              {
                to: { name: 'DocBody', params: { id: '4', html: '0' } },
                title: '绑定数据'
              },
              {
                to: { name: 'DocBody', params: { id: '5', html: '0' } },
                title: '配置图表'
              },
              {
                to: { name: 'DocBody', params: { id: '6', html: '0' } },
                title: '保存、预览、分享'
              },
              {
                to: { name: 'DocBody', params: { id: '7', html: '0' } },
                title: '下载画布'
              }
            ]
          }
        ],
        [
          {
            title: 'vue-draw-xs',
            sub: [
              { to: { name: 'DocBody', params: { id: '1', html: '0' } }, title: '快速开始' },
              { to: { name: 'DocBody', params: { id: '2', html: '0' } }, title: '属性' },
              { to: { name: 'DocBody', params: { id: '3', html: '0' } }, title: '方法' }
            ]
          }
        ],
        [
          {
            title: 'vue-draw-xs',
            sub: [
              {
                to: { name: 'DocBody', params: { id: '1', html: '1' } },
                title: '原始图表'
              },
              {
                to: { name: 'DocBody', params: { id: '2', html: '1' } },
                title: '查询条件'
              },
              {
                to: { name: 'DocBody', params: { id: '3', html: '1' } },
                title: '图表切换'
              },
              {
                to: { name: 'DocBody', params: { id: '4', html: '1' } },
                title: '带查询'
              },
              {
                to: { name: 'DocBody', params: { id: '5', html: '1' } },
                title: '带表单'
              },
              {
                to: { name: 'DocBody', params: { id: '6', html: '1' } },
                title: '事件通知'
              }
            ]
          }
        ]
      ]
    }
  }
}
</script>

<style scoped>
.page {
  position: absolute;
  top: 3.5rem;
  bottom: 0;
  left: 20rem;
  right: 0;
  overflow: auto;
}
.content:not(.custom) {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}
</style>
