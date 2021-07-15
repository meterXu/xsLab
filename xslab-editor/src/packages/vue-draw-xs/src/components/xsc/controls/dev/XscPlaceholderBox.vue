<template>
<div :class="view?'xscPlaceHolder-block':'xscPlaceHolder-table'">
  <div v-if="view">
    <slot :name="options.key"></slot>
  </div>
  <span v-else class="devInfo">{{text}}</span>
</div>
</template>

<script>
export default {
  name: 'XscPlaceholderBox',
  props: {
    options: Object,
    view: Boolean
  },
  computed: {
    text () {
      return this.options.key || `</>`
    }
  }
}
</script>

<style scoped>
.xscPlaceHolder-table{
  display: table;
  height: 100%;
  width: 100%;
}
.xscPlaceHolder-block{
  display: block;
  height: 100%;
}
.devInfo{
  display: table-cell;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  vertical-align: middle;
}
</style>
