<template>
    <div id="mtDbSetting">
      <div id="setProp">
        <div id="setPropContent">
          <Form ref="formValidate" :label-width="100" :model="config" :rules="ruleValidate">
            <FormItem label="后端地址" prop="baseUrl">
              <Input v-model="config.baseUrl" placeholder="请输入后端地址..."/>
            </FormItem>
            <FormItem label="编辑器主题" prop="editorTheme" style="text-align: left">
              <RadioGroup v-model="config.editorTheme" type="button">
                <Radio  v-for="(item, id) in commonData.editorTheme" :label="item.value" :key="id"><span>{{item.text}}</span></Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="图表主题" prop="chartNodeTheme" style="text-align: left">
              <RadioGroup v-model="config.chartNodeTheme" type="button">
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
import commonData from '@/data/resources/commonData'
export default {
  name: 'mtSetting',
  data () {
    return {
      commonData: commonData,
      config: this.$baseConfig,
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
  methods: {
    saveSetProp: function () {
      this.$ajax.post(this.$baseConfig.baseUrl + this.$baseConfig.actionUrl.validateBaseUrl).then(c => {
        if (c.data) {
          localStorage[this.$baseConfig.localStorageKey] = JSON.stringify(this.$baseConfig)
          this.$Message.success('保存成功！')
        }
      }).catch(c => {
        this.$Message.error('后台地址错误，请输入正确的后台地址！')
      })
    }
  }
}
</script>

<style scoped>
  #mtDbSetting{
    width: 100%;
    height: 100%;
    background: #d0d0d0;
    text-align: center;
  }
  #setProp{
    width: 800px;
    min-height: 100px;
    margin-top: 100px;
    display: inline-block;
    background: #fff;
    border-radius: 5px;
  }
  #setPropContent{
    width: 600px;
    margin:0 auto;
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .ivu-form-item{
    margin-bottom: 20px !important;
  }
</style>
