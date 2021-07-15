<template>
  <header>
    <b-navbar toggleable="lg" type="dark" :sticky="true" class="bg-xsclub">
      <b-navbar-brand :to="{name:'Index'}">
        <b-img class="logo" :src="config.url.xsclublogo" alt="xsclub"></b-img> XSClub
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name:'Index'}" :active="active('Index')">首页</b-nav-item>
          <b-nav-item :to="{name:'XSLab'}" :active="active('XSLab')">XSLab</b-nav-item>
          <b-nav-item
            :to="{name:'DocBody',params: { type:'0',id:'1',html:'0'}}"
            :active="active('DocBody','0')"
          >用户手册</b-nav-item>
          <b-nav-item
            :to="{name:'DocBody',params: { type:'1',id:'1',html:'0'}}"
            :active="active('DocBody','1')"
          >开发文档</b-nav-item>
          <b-nav-item
            :to="{name:'DocBody',params: { type:'2',id:'1',html:'1'}}"
            :active="active('DocBody','1')"
          >示例</b-nav-item>
          <b-nav-item
           :href="config.url.vuedrawxs"
            target="_blank"
            :active="active('DrawXs')"
          >vue-draw-xs</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import '../assets/nav.css'
export default {
  name: 'Nav',
  computed: {
    active () {
      return function (name, type) {
        if (name === this.$route.name && type === this.$route.params.type) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 26px;
  vertical-align: text-bottom;
}
.bg-xsclub {
  background: #282b3d;
}
</style>
