<template>
  <Icon class="mt_chart" :class="typeClass"/>
</template>

<script>
import '../../../assets/styles/icon.css'
export default {
  name: 'mtIcon',
  props: {
    type: String
  },
  computed: {
    typeClass () {
      if (this.type) {
        return 'mt_char_' + this.type
      } else {
        return 'mt_char_'
      }
    }
  }
}
</script>
