<template>
    <li class="item">
      <img class="item_img" :src="require('../../../assets/' + this.source.icon)" draggable="true" @dragstart="dragStart"/>
      <label class="item_title">{{source.title}}</label>
    </li>
</template>

<script>
export default {
  name: 'mtNodeItem',
  props: {
    source: Object
  },
  computed: {
  },
  methods: {
    dragStart () { // 开始拖动
      this.$emit('dragStart', this.source)
    }
  }
}
</script>

<style scoped>
  .item{
    display: inline-block;
    width:80px;
    height: 80px;
    margin-left: 10px;
    cursor: pointer;
  }
  .item+.item{
    margin-left: 10px;
  }
.item_img{
  width: 80px;
  height: 60px;
  display: block;
}
  .item_title{
    height: 20px;
    line-height: 20px;
    display: block;
    text-align: center;
    font-size: 12px;
  }
</style>
