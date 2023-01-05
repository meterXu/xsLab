<template>
  <div style="cursor: pointer" @click="showSelector">
    <Icon :size="14" type="ios-image" title="设置"/>
    <span>设置</span>
    <Modal :width="1000"
           v-model="show"
           :mask-closable="true"
           :footer-hide="true"
           :title="title">
      <Tabs>
        <Tab-pane :label="item.title" v-for="item in tmpSource">
          <div class="content-container">
            <ul class="img-ul">
              <li :class="{'img-li':true,'img-active':img.url===value}" v-for="img in item.imgs" @click="setBg(img.url)">
                <img class="image" :src="img.url"/>
                <span>{{img.size}}</span>
              </li>
            </ul>
            <Page style="margin-top: 3px" :total="item.pagination.total" :current.sync="item.pagination.pageNumber" :page-size="item.pagination.pageSize"
                  size="small"
                  @on-change="pageChange(item)" show-total></Page>
          </div>
        </Tab-pane>
        <Tab-pane label="图片地址" icon="social-windows">
          <div class="content-container">
            <Input :value="value" @input="inputUpdate" placeholder="请输入图片网址或base64值"></Input>
          </div>
        </Tab-pane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import {getAction} from "@/request";

export default {
  name: "ImgSelector",
  props:['value','title','source'],
  model:{
    prop:'value',
    event:'update'
  },
  data(){
    return {
      show:false,
      tmpSource:null,
      pagination:{
        total:null,
        pageSize:12,
        pageNumber:1
      }
    }
  },
  methods:{
    showSelector(){
      this.show = true
    },
    setBg(imgUrl){
      this.$emit('update',imgUrl)
    },
    inputUpdate(value){
      this.$emit('update',value)
    },
    pageChange(item){
      getAction(item.imgsUrl,{
        pageSize:item.pagination.pageSize,
        pageNumber:item.pagination.pageNumber,
      }).then(res=>{
        item.imgs = res.data.rows.map(c=>{
          c.url=this.$config.baseUrl+c.url
          return c
        })
        this.tmpSource  = JSON.parse(JSON.stringify(this.tmpSource))
      })
    }
  },
  created() {
    this.tmpSource = this.source
    this.tmpSource.forEach(item=>{
      item.pagination = Object.assign({},this.pagination)
      getAction(item.imgsUrl,{
        pageSize:item.pagination.pageSize,
        pageNumber:item.pagination.pageNumber,
      }).then(res=>{
        item.imgs = res.data.rows.map(c=>{
          c.url=this.$config.baseUrl+c.url
          return c
        })
        item.pagination.total = res.data.total
      })
    })
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
  min-height: 60px;
  span{
    position: absolute;
    left: 6px;
    color: #fff;
  }
}
.img-active:before{
  content:'';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #4791b440;
}
.img-active:after{
  text-align: center;
  line-height: 48px;
  font-size: 24px;
  content: '✓';
  color: #fff;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform:translateX(-50%) translateY(-50%);
  width: 48px;
  height: 48px;
  background: #00cc66;
  border-radius: 24px;
}
</style>