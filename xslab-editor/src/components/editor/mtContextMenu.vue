<template>
  <Card title="选项" icon="ios-options"
        :padding="0"
        shadow
        :class="{'mtContextMenu':true}"
        :style="pointStyle"
        >
    <CellGroup  @on-click="menuClick">
      <Cell title="上移一层" name="up">
        <Icon type="md-arrow-up" size="22" style="color: #60c795" slot="icon" />
      </Cell>
      <Cell title="下移一层" name="down">
        <Icon type="md-arrow-down" size="22" style="color: #2d8cf0" slot="icon" />
      </Cell>
      <Cell title="删除" name="delete">
        <Icon type="ios-trash" size="22" style="color: #ed4014" slot="icon" />
      </Cell>
    </CellGroup>
  </Card>
</template>

<script>
export default {
  name: 'mtContextMenu',
  props: {
    point: Object
  },
  computed: {
    pointStyle () {
      return {
        left: this.point.x + 'px',
        top: this.point.y + 'px'
      }
    }
  },
  methods: {
    menuClick (name) {
      this.$emit('menuClick', name)
    }
  }
}
</script>

<style scoped>
  .mtContextMenu{
    position: absolute;
    width: 150px;
    border: 1px solid #ddd;
    z-index: 9999;
  }

</style>
