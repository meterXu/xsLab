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
      const nValue = value===''?'currentColor':value
      this.$emit('update', nValue)
    }
  }
}
</script>

<style scoped>

</style>
