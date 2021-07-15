<template>
  <div class="content_index">
    <main class="bd-masthead" id="content" role="main">
      <div class="container">
    <div class="row align-items-center">
      <div class="col-6 mx-auto col-md-6 order-md-2">
          <img class="logo" :src="config.url.xsclublogo" alt="logo"/>
      </div>
      <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
        <h1 class="mb-3 bd-text-purple-bright">XSClub</h1>
        <p class="lead">
          数据可视化解决方案
        </p>
        <p class="lead mb-4">
          XSClub是一套数据可视化解决方案，该方案包含报表编辑器，报表展示页以及可编程的报表绘制组件，可满足您数据大屏展示，系统报表定制化开发，多业务场景下报表切换等需求。所见即所得的操作模式，让您快速成为一个优质报表内容提供者。
        </p>
        <div class="row mx-n2">
          <div class="col-md px-2">
            <b-link class="btn btn-lg btn-outline-primary w-100 mb-3" :to="{name:'DocBody', params:{type: '0',id: '1',html:'0'}}">现在开始</b-link>
          </div>
          <div class="col-md px-2"></div>
        </div>
        <p class="text-muted mb-0">
          当前版本
          <img class="version" :src="config.url.version" alt="version"/>
        </p>
      </div>
    </div>
      </div>
    </main>
    <div class="masthead-followup row m-0 border border-white">
    <div class="col-12 col-md-12 p-3 p-md-5 bg-light border border-white">
      <h3>架构</h3>
      <div class="mx-auto col-md-6 order-md-2">
        <img class="architecture" :src="config.url.architecture" alt="architecture">
      </div>
      <b-link class="btn btn-outline-primary" :to="{name:'DocBody', params:{type:'1',id: '1',html:'0'}}">更多</b-link>
      <!--<a class="btn btn-outline-success" href="/">更多</a>-->
    </div>
  </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'Index',
  components: {
    Footer
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content_index{
  text-align: center;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.logo,.architecture{
  width: 100%;
}
.logo{
  max-width: 256px;
}
.architecture{
  max-width: 786px;
}
.version{
  vertical-align: text-top
}
</style>
