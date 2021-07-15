<template>
  <div>
    <template v-if="fItem.type==='number'">
      <InputNumber v-model="mtModel.value" size="small"></InputNumber> {{fItem.unit||'px'}}
    </template>
  </div>

</template>

<script>
export default {
  name: 'mtFormItemDetial',
  props: ['fItem', 'mtModel']
}
</script>

<style scoped>

</style>
