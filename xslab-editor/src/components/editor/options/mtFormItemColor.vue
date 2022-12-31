<template>
    <div>
      <ColorPicker v-model="tempValue" alpha  @on-change="onChange" :size="size"/>
    </div>
</template>

<script>
export default {
  name: 'mtFormItemColor',
  props: {
    value: String,
    size: String
  },
  data () {
    return {
      tempValue: null
    }
  },
  model: {
    prop: 'value',
    event: 'update'
  },
  watch: {
    value: {
      handler(nv){
        this.tempValue = nv||''
      },
      immediate:true
    }
  },
  methods: {
    onChange (value) {
      this.$emit('update', value)
    }
  }
}
</script>

<style scoped>

</style>
