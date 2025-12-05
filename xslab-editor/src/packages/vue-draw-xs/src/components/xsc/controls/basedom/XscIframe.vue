<template>
    <div class="d_mtIframeDiv">
      <iframe class="d_mtIframe" :src="src"></iframe>
      <div class="d_mtIframe_show" v-if="!this.view" :style="{opacity:opacity}"></div>
    </div>
</template>

<script>
export default {
  name: 'XscIframe',
  props: {
    options: Object,
    view: Boolean
  },
  data () {
    return {
      opacity: 1
    }
  },
  computed: {
    src () {
      if (this.options && this.options.src && (this.options.src.indexOf('http') > -1 || this.options.src.indexOf('https') > -1)) {
        return this.options.src
      } else {
        return ''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .d_mtIframeDiv{
    width: 100%;
    height: 100%;
  }
  .d_mtIframe{
    border: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
  }
  .d_mtIframe_show{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0);
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
