<template>
    <div id="mtDbSetting">
      <div id="setProp">
        <div id="setPropContent">
          <Alert show-icon type="warning">验证并保存后才生效</Alert>
          <Form ref="formValidate" :label-width="100" :model="tmpConfig" :rules="ruleValidate">
            <FormItem label="后端地址" prop="baseUrl">
              <Input v-model="tmpConfig.baseUrl" placeholder="请输入后端地址..."/>
            </FormItem>
            <FormItem label="编辑器主题" prop="editorTheme" style="text-align: left">
              <RadioGroup v-model="tmpConfig.editorTheme" type="button">
                <Radio  v-for="(item, id) in commonData.editorTheme" :label="item.value" :key="id"><span>{{item.text}}</span></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="图表主题" prop="chartNodeTheme" style="text-align: left">
              <RadioGroup v-model="tmpConfig.chartNodeTheme" type="button">
                <Radio v-for="(item, id) in commonData.theme" :label="item.value" :key="id"><span>{{item.text}}</span></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem style="text-align: left">
              <Button type="success" @click="saveSetProp">验证&保存</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
</template>

<script>
import commonData from '../../data/resources/commonData'
export default {
  name: 'mtSetting',
  data () {
    return {
      commonData: commonData,
      tmpConfig: {
        editorTheme: 'light',
        chartNodeTheme: 'light',
        baseUrl: null,
        actionUrl: null
      },
      ruleValidate: {
        baseUrl: [
          { required: true, message: '后端地址必填', trigger: 'blur' }
        ],
        editorTheme: [
          { required: true, message: '编辑器主题必选', trigger: 'blur' }
        ],
        chartNodeTheme: [
          { required: true, message: '图表主题必选', trigger: 'blur' }
        ]
      }
    }
  },
  watch:{
    'tmpConfig.editorTheme':{
      handler:function (nv){
        document.getElementsByTagName('html')[0].setAttribute('data-theme', nv)
      },
      deep: true
    }
  },
  methods: {
    saveSetProp: function () {
      this.$refs.formValidate.validate(c => {
        if (c) {
          this.$ajax.post(this.tmpConfig.baseUrl + this.tmpConfig.actionUrl.validateBaseUrl).then(c => {
            if (c.data) {
              Object.assign(this.commonConfig, this.tmpConfig)
              localStorage[this.commonConfig.localStorageKey] = JSON.stringify(this.commonConfig)
              this.$Message.success('保存成功！')
            }
          }).catch(c => {
            this.$Message.error('后台地址错误，请输入正确的后台地址！')
          })
        }
      })
    }
  },
  beforeMount () {
    Object.assign(this.tmpConfig, this.commonConfig)
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
