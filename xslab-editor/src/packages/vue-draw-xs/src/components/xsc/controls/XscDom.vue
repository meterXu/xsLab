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
import darkblue from '../../../data/theme/basedom/dark-blue'
import light from '../../../data/theme/basedom/light'
import normal from '../../../data/theme/basedom/normal'
import dark from '../../../data/theme/basedom/dark'
import chalk from '../../../data/theme/basedom/chalk'
import essos from '../../../data/theme/basedom/essos'
import halloween from '../../../data/theme/basedom/halloween'
import infographic from '../../../data/theme/basedom/infographic'
import macarons from '../../../data/theme/basedom/macarons'
import purplePassion from '../../../data/theme/basedom/purple-passion'
import roma from '../../../data/theme/basedom/roma'
import shine from '../../../data/theme/basedom/shine'
import vintage from '../../../data/theme/basedom/vintage'
import walden from '../../../data/theme/basedom/walden'
import westeros from '../../../data/theme/basedom/westeros'
import wonderland from '../../../data/theme/basedom/wonderland'
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
      themeData: {
        'dark-blue':darkblue,
        'purple-passion':purplePassion,
        light,
        normal,
        dark,
        chalk,
        essos,
        halloween,
        infographic,
        macarons,
        roma,
        shine,
        vintage,
        walden,
        westeros,
        wonderland
      }
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
