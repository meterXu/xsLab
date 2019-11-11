<template>
    <div id="menu">
      <div class="title">
        <div class="titleCon">组件列表</div>
      </div>
      <div>
        <Menu :accordion="true" width="auto" :open-names="[menuData[0].title]">
          <Submenu  v-for="(item,index) in menuData" :key="index" :name="item.title" style="max-height: 500px;overflow: auto">
            <template slot="title">
              <mtIcon :type="item.icon" />
              {{item.title}}
            </template>
            <template v-for="(sb,index) in item.sub">
              <mtNodeItem :source="sb" :key="index" @dragStart="dragStart"/>
            </template>
          </Submenu>
        </Menu>
      </div>
    </div>
</template>

<script>
import mtNodeItem from './menu/mtNodeItem'
import mtIcon from './icon/mtIcon'
import editorData from '../../data/editorData'
export default {
  name: 'mtMenu',
  props: {
    data: Object
  },
  components: {
    mtNodeItem,
    mtIcon
  },
  data () {
    return editorData
  },
  methods: {
    dragStart (node) {
      this.$emit('dragStart', node)
    }
  }
}
</script>

<style scoped>
  #menu{
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    float: left;
    width: 200px;
    height: auto;
    background: #f5f5f5;
    border-right: 1px solid #ddd;
    box-shadow: 2px 0px 2px 0 rgba(0, 0, 0, 0.1);
    z-index: 2499;
  }
  .title{
    text-align: left;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #dddddd;
  }
  .titleCon{
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
    color: #2c3e50;;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .ivu-menu{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .ivu-menu-vertical.ivu-menu-light:after{
    width: 0;
  }
  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:6px;
    height:6px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:0px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:0px;
    background:#939393;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:#fd5f5f;
  }
</style>
