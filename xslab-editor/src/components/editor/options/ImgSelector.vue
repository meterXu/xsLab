<template>
  <div style="cursor: pointer" @click="showSelector">
    <Icon :size="14" type="ios-image" title="设置"/>
    <span>设置</span>
    <Modal :width="1000"
           v-model="show"
           :mask-closable="true"
           :footer-hide="true"
           title="背景设置">
      <Tabs>
        <Tab-pane label="正常图片" icon="social-apple">
          <div class="content-container">
            <ul class="img-ul">
              <li class="img-li" v-for="item in normal" @click="setBg(item.url)">
                <img class="image" :src="item.url"/>
                <span>{{item.size}}</span>
              </li>
            </ul>
          </div>
        </Tab-pane>
        <Tab-pane label="长屏图片" icon="social-apple">
          <div class="content-container">
            <ul class="img-ul">
              <li class="img-li" v-for="item in long" @click="setBg(item.url)">
                <img class="image" :src="item.url"/>
                <span>{{item.size}}</span>
              </li>
            </ul>
          </div>
        </Tab-pane>
        <Tab-pane label="图片地址" icon="social-windows">
          <div class="content-container">
            <Input v-model="value" placeholder="请输入图片网址或base64值"></Input>
          </div>
        </Tab-pane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ImgSelector",
  props:['value'],
  model:{
    prop:'value',
    event:'update'
  },
  data(){
    return {
      show:false,
      normal:[
        {url:'./img/bg/normal_1.png',size:'3840x2160'},
        {url:'./img/bg/normal_2.png',size:'1600x900'},
        {url: './img/bg/normal_3.png',size:'8000x4500'},
        {url: './img/bg/normal_4.png',size:'1920x1080'},
        {url: './img/bg/normal_5.png',size:'1920x1080'},
        {url: './img/bg/normal_6.png',size:'1920x1080'},
        {url: './img/bg/normal_7.png',size:'3840x2160'},
        {url: './img/bg/normal_8.png',size:'960x540'},
        {url: './img/bg/normal_9.png',size:'3840x2160'},
        {url: './img/bg/normal_10.png',size:'3840x2160'},
        {url: './img/bg/normal_11.png',size:'1920x1080'},
        {url: './img/bg/normal_12.png',size:'3840x2160'},
        {url: './img/bg/normal_13.png',size:'1920x1080'},
        {url: './img/bg/normal_14.png',size:'1439x809'},
        {url: './img/bg/normal_15.png',size:'1920x1080'},
        {url: './img/bg/normal_16.png',size:'1920x1080'},
        {url: './img/bg/normal_17.png',size:'1920x1080'},
        {url: './img/bg/normal_18.png',size:'1920x1080'},
        {url: './img/bg/normal_19.png',size:'1920x1080'}
      ],
      long:[
        {url:'./img/bg/long_1.png',size:'8100x2160'},
        {url:'./img/bg/long_2.png',size:'6300x2100'},
        {url:'./img/bg/long_3.png',size:'3240x1080'},
        {url:'./img/bg/long_4.png',size:'8100x2160'}
      ]
    }
  },
  methods:{
    showSelector(){
      this.show = true
    },
    setBg(imgUrl){
      this.$emit('update',imgUrl)
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.content-container{
  padding: 12px;
  max-height: 600px;
  overflow-y: auto;
}
.image{
  width: 290px;
}
.img-ul{
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill,290px);
  grid-gap: 20px 20px;
}
.img-li{
  cursor: pointer;
  position: relative;
  span{
    position: absolute;
    left: 6px;
    top: 6px;
    color: #fff;
  }
}
</style>