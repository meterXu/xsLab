<template>
    <div id="mtDbSetting">
      <div id="setProp">
        <div id="setPropContent">
          <Form ref="formValidate" :label-width="100" :model="config" :rules="ruleValidate">
            <FormItem label="后端地址" prop="baseUrl">
              <div style="text-align: left">{{config.baseUrl}}</div>
            </FormItem>
            <FormItem label="编辑器主题" prop="editorTheme" style="text-align: left">
              <RadioGroup v-model="config.editorTheme" type="button">
                <Radio readonly  v-for="(item, id) in commonData.editorTheme" :label="item.value" :key="id"><span>{{item.text}}</span></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem style="text-align: left">
              <Button type="success" @click="saveSetProp">保存</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
import commonData from '../../data/resources/commonData'
import {mapGetters} from "vuex";
import {getAction} from "./../../request";
import Vue from "vue";
import createRequest from "@/config/api";
export default {
  name: 'mtSetting',
  data () {
    return {
      commonData: commonData,
      ruleValidate: {
        baseUrl: [
          { required: true, message: '后端地址必填', trigger: 'blur' }
        ],
        editorTheme: [
          { required: true, message: '编辑器主题必选', trigger: 'blur' }
        ]
      },
      config:{
        baseUrl:null,
        editorTheme:null,
      }
    }
  },
  watch:{
    'config.editorTheme':{
      handler:function (nv){
        this.changeTheme(nv)
      },
      immediate: true
    }
  },
  methods: {
    saveSetProp: function () {
      this.$refs.formValidate.validate(res => {
        if (res) {
          getAction(this.action.validateBaseUrl).then(c => {
            debugger
            if (c.data) {
              this.$store.commit('setBaseUrl',this.config.baseUrl)
              this.$store.commit('setEditorTheme',this.config.editorTheme)
              this.$ajax =  createRequest()
              this.$Message.success('保存成功！')
            }
          }).catch(c => {
            this.$Message.error('后端地址错误，请确保正确的后端地址！')
          })
        }
      })
    },
    changeTheme(theme){
      document.getElementsByTagName('html')[0].setAttribute('data-theme', theme)
    }
  },
  created() {
    this.config.baseUrl = this.$store.getters.baseUrl
    this.config.editorTheme = this.$store.getters.editorTheme
  }
}
</script>

<style scoped>
  #mtDbSetting{
    width: 100%;
    height: 100%;
    background: var(--db-bg-color,#d0d0d0);
    text-align: center;
  }
  #setProp{
    width: 800px;
    min-height: 100px;
    margin-top: 100px;
    display: inline-block;
    background-color: var(--prop-bg-color,#fff);
    border-radius: 5px;
  }
  #setPropContent{
    width: 600px;
    margin: 60px auto 40px;
  }
  .ivu-form-item{
    margin-bottom: 20px !important;
  }
</style>
