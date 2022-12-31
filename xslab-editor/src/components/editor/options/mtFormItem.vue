<template>
  <div>
    <template v-if="fItem.type==='number'">
      <template v-if="panel.key===''">
        <InputNumber v-model="opNode.config[fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
      <template v-else-if="panel.key.split('/').length===1">
        <InputNumber v-model="opNode.config[panel.key][fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <InputNumber v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <InputNumber v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <InputNumber v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <InputNumber v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" size="small"></InputNumber> {{fItem.unit||'px'}}
      </template>
    </template>
    <template v-else-if="fItem.type==='text'">
      <template v-if="panel.key===''">
        <Input v-model="opNode.config[fItem.key]" size="small"/>
      </template>
      <template  v-else-if="panel.key.split('/').length===1">
        <Input size="small" v-model="opNode.config[panel.key][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <Input v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <Input v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <Input v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <Input v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" size="small"/>
      </template>
    </template>
    <template v-else-if="fItem.type==='color'">
      <template v-if="panel.key===''">
        <mtFormItemColor v-model="opNode.config[fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===1">
        <mtFormItemColor v-model="opNode.config[panel.key][fItem.key]"  size="small" />
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <mtFormItemColor v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <mtFormItemColor v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <mtFormItemColor v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <mtFormItemColor v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" size="small"/>
      </template>
    </template>
    <template v-else-if="fItem.type==='textarea'">
      <template v-if="panel.key===''">
        <Input type="textarea" :rows="4" v-model="opNode.config[fItem.key]" size="small"/>
      </template>
      <template  v-else-if="panel.key.split('/').length===1">
        <Input type="textarea" :rows="4" size="small" v-model="opNode.config[panel.key][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <Input type="textarea" :rows="4" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <Input type="textarea" :rows="4" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <Input type="textarea" :rows="4" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" size="small"/>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <Input type="textarea" :rows="4" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" size="small"/>
      </template>
    </template>
    <template v-else-if="fItem.type==='boolean'">
      <template v-if="panel.key===''">
        <i-switch v-model="opNode.config[fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
      <template  v-if="panel.key.split('/').length===1">
        <i-switch v-model="opNode.config[panel.key][fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <i-switch v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <i-switch v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <i-switch v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <i-switch v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]">
          <Icon type="md-checkmark" slot="open"/>
          <Icon type="md-close" slot="close"/>
        </i-switch>
      </template>
    </template>
    <template v-else-if="fItem.type==='select'">
      <template v-if="panel.key===''">
        <Select size="small" v-model="opNode.config[fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
      <template v-else-if="panel.key.split('/').length===1">
        <Select size="small" v-model="opNode.config[panel.key][fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <Select size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <Select size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <Select size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <Select size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]">
          <Option v-for="item in fItem.data" :key="item.text+item.value" :value="item.value" >{{item.text}}</Option>
        </Select>
      </template>
    </template>
    <template v-else-if="fItem.type==='code'">
      <template v-if="panel.key===''">
        <mtFormItemCode size="small" v-model="opNode.config[fItem.key]" :index="0" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
      <template v-else-if="panel.key.split('/').length===1">
        <mtFormItemCode size="small" v-model="opNode.config[panel.key][fItem.key]" :index="0" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <mtFormItemCode size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" :index="panel.key.split('/')[1]" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <mtFormItemCode size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" :index="panel.key.split('/')[2]" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <mtFormItemCode size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" :index="panel.key.split('/')[3]" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <mtFormItemCode size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" :index="panel.key.split('/')[4]" :field="fItem.key" :mode="fItem.mode" @showFullCode="showFullCode"></mtFormItemCode>
      </template>
    </template>
    <template v-else-if="fItem.type==='div'">
      <div class="mt-emptyDiv" :style="{width: 'auto',height: fItem.style.height+'px'}"></div>
    </template>
    <template v-else-if="fItem.type==='radio'">
      <template v-if="panel.key===''">
        <RadioGroup v-model="opNode.config[fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
      <template v-if="panel.key.split('/').length===1">
        <RadioGroup v-model="opNode.config[panel.key][fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
      <template v-if="panel.key.split('/').length===2">
        <RadioGroup v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
      <template v-if="panel.key.split('/').length===3">
        <RadioGroup v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
      <template v-if="panel.key.split('/').length===4">
        <RadioGroup v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
      <template v-if="panel.key.split('/').length===5">
        <RadioGroup v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]" @on-change="radioChange">
          <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
            <Icon :type="item.icon"></Icon>
            <span>{{item.text}}</span>
          </Radio>
        </RadioGroup>
      </template>
    </template>
    <template v-else>
      <template v-if="panel.key===''">
        <Input  size="small" v-model="opNode.config[fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===1">
        <Input  size="small" v-model="opNode.config[panel.key][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===2">
        <Input  size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===3">
        <Input  size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===4">
        <Input  size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][fItem.key]"/>
      </template>
      <template v-else-if="panel.key.split('/').length===5">
        <Input  size="small" v-model="opNode.config[panel.key.split('/')[0]][panel.key.split('/')[1]][panel.key.split('/')[2]][panel.key.split('/')[3]][panel.key.split('/')[4]][fItem.key]"/>
      </template>
    </template>
  </div>
</template>
<script>
import mtFormItemColor from './mtFormItemColor'
import mtFormItemCode from './mtFormItemCode'
export default {
  name: 'mtFormItem',
  functional:true,
  props: {
    fItem: Object,
    panel: Object,
    opNode: Object
  },
  components: {
    mtFormItemColor,
    mtFormItemCode
  },
  methods:{
    radioChange: function (v) {
      this.$emit('radioChange', v)
    },
    showFullCode: function (v0, v1, v2, v3) {
      this.$emit('showFullCode', v0, v1, v2, v3, this.$parent.$props.label)
    }
  }
}
</script>
