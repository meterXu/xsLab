<template>
  <div>
    <div class="p-5">
      <div class="slider">
        <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <template :options="options">
            <slideritem v-for="(item,index) in someList" :pageLength="someList.length" :index="index" :key="index">
              <b-img thumbnail  fluid center :src="item.src" :style="item.style" alt="Image 1"></b-img>
            </slideritem>
          </template>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
    </div>
    <div>
      <b-jumbotron header="XSLab" lead="基于web的可视化图表编辑器">
        <p>免费在线试用</p>
        <b-button variant="primary" :href="config.url.xslab" target="_blank">现在就去</b-button>
      </b-jumbotron>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
import { slider, slideritem } from 'vue-concise-slider'
export default {
  name: 'XsLab',
  components: {
    Footer,
    slider,
    slideritem
  },
  data () {
    return {
      options: {
        loop: true,
        speed: 2000
      }
    }
  },
  computed:{
    someList(){
      return [{
        src: this.config.url.someList[0],
        style: {
        }
      }, {
        src: this.config.url.someList[1],
        style: {
        }
      }, {
        src: this.config.url.someList[2],
        style: {
        }
      }, {
        src: this.config.url.someList[3],
        style: {
        }
      }, {
        src: this.config.url.someList[4],
        style: {
        }
      }]
    }
  },
  mounted () {
    this.$refs.slider.$emit('autoplayStart', 5000)
  }
}
</script>

<style scoped>
.slider{
  width: 100%;
  margin: 0px auto;
  max-width: 1000px;
}
  .jumbotron{
    text-align: center;
  }
  @media screen and (min-width: 900px) {
      .img-thumbnail {
    background: #282c34;
    border-radius: 1rem;
    padding: 1rem;
    border-bottom-width: 24px;
    border-color:#282c34
  }
  }

</style>
