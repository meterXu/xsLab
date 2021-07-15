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
    value: function (nv) {
      this.tempValue = nv || ''
    }
  },
  methods: {
    onChange (value) {
      this.$emit('update', value)
    }
  },
  created () {
    if (this.value) {
      this.tempValue = this.value
    } else {
      this.tempValue = ''
    }
  }
}
</script>

<style scoped>

</style>
