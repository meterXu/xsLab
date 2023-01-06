<template>
  <div class='basedom'>
    <XscTable v-if="type==='table'" :id="id" :options="options" :themeData="themeData" :theme="theme"></XscTable>
    <XscImg v-else-if="type==='img'" :id="id" :options="options"></XscImg>
    <XscText v-else-if="type==='text'" :id="id" :options="options" :themeData="themeData" :theme="theme"></XscText>
    <XscIframe v-else-if="type==='iframe'" :id="id" :options="options" :themeData="themeData" :theme="theme" :view="this.view"></XscIframe>
    <XscCard v-else-if="type==='card'" :id="id" :options="options" :themeData="themeData" :theme="theme"></XscCard>
    <XscSlide v-else-if="type==='slide'" :id="id" :options="options" :themeData="themeData" :theme="theme"></XscSlide>
    <XscDiv v-else-if="type==='div'" :id="id" :options="options" :themeData="themeData" :theme="theme"></XscDiv>
  </div>
</template>

<script>
import XscImg from './basedom/XscImg'
import XscTable from './basedom/XscTable'
import XscText from './basedom/XscText'
import XscIframe from './basedom/XscIframe'
import XscCard from './basedom/XscCard'
import XscSlide from './basedom/XscSlide'
import XscDiv from "./basedom/XscDiv";
import commData from '../../../data/commonData'
export default {
  name: 'XscDom',
  components: {
    XscDiv,
    XscImg,
    XscTable,
    XscText,
    XscIframe,
    XscCard,
    XscSlide
  },
  props: {
    id: Number,
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
