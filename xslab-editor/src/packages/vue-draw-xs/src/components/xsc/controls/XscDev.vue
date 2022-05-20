<template>
    <div class="xscdev">
        <XscPlaceholderBox v-if="type==='placeholderBox'" :id="id" :options="options" :view="view">
          <template v-slot:[options.key]>
             <slot :name="options.key"></slot>
          </template>
        </XscPlaceholderBox>
    </div>
</template>

<script>
import XscPlaceholderBox from './dev/XscPlaceholderBox'
export default {
  name: 'xscDev',
  props: {
    id: Number,
    type: String,
    options: Object,
    view: Boolean
  },
  components: {
    XscPlaceholderBox
  }
}
</script>

<style scoped>
.xscdev{
  height: 100%;
}
</style>>
