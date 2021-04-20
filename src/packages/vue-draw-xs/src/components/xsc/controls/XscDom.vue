<template>
  <div class='basedom'>
    <XscTable v-if="type==='table'" :options="options" :themeData="themeData" :theme="theme"></XscTable>
    <XscImg v-else-if="type==='img'" :options="options"></XscImg>
    <XscText v-else-if="type==='text'" :options="options" :themeData="themeData" :theme="theme"></XscText>
    <XscIframe v-else-if="type==='iframe'" :options="options" :themeData="themeData" :theme="theme" :view="this.view"></XscIframe>
    <XscContainer v-else-if="type==='container'" :options="options" :themeData="themeData" :theme="theme"></XscContainer>
    <XscSlide v-else-if="type==='slide'" :options="options" :themeData="themeData" :theme="theme"></XscSlide>
  </div>
</template>

<script>
import XscImg from './basedom/XscImg'
import XscTable from './basedom/XscTable'
import XscText from './basedom/XscText'
import XscIframe from './basedom/XscIframe'
import XscContainer from './basedom/XscContainer'
import XscSlide from './basedom/XscSlide'
import commData from '../../../data/commonData'
export default {
  name: 'XscDom',
  components: {
    XscImg,
    XscTable,
    XscText,
    XscIframe,
    XscContainer,
    XscSlide
  },
  props: {
    type: String,
    options: Object,
    theme: String,
    view: Boolean
  },
  data () {
    return {
      'themeData': commData.themeData
    }
  }
}
</script>

<style scoped>
  .basedom{
    width: 100%;
    height: 100%;
  }
</style>
