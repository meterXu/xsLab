export default {
    name: 'mtFormItem',
    functional: true,
    props: {
        fItem: Object,
        panel: Object,
        opNode: Object
    },
    render(createElement, context) {
        function radioChange(v) {
            this.$emit('radioChange', v)
        }

        function showFullCode(v0, v1, v2, v3) {
            this.$emit('showFullCode', v0, v1, v2, v3, this.$parent.$props.label)
        }

        function getModelProp(key, opNode) {
            let modelObj = null
            const keyDeep = key.split('/')
            keyDeep.forEach(key => {
                if (modelObj) {
                    modelObj = modelObj[key]
                } else {
                    modelObj = opNode.config[key]
                }
            })
            return modelObj
        }

        function renderItem(fItem, modelObj) {
            switch (fItem.type) {
                case 'number': {
                    return (
                        <span>
                            <InputNumber v-model={modelObj[fItem.key]} size="small"></InputNumber> {fItem.unit || 'px'}
                        </span>
                    )
                }
                case 'text': {
                    return (
                        <span>
                            <Input v-model={modelObj[fItem.key]} size="small"/>
                        </span>
                    )
                }
                case 'color': {
                    return (
                        <span>
                            <mtFormItemColor v-model={modelObj[fItem.key]} size="small"/>
                        </span>
                    )
                }
                case 'textarea': {
                    return (
                        <span>
                            <Input type="textarea" rows={4} v-model={modelObj[fItem.key]} size="small"/>
                        </span>
                    )
                }
                case 'boolean': {
                    return (
                        <i-switch v-model={modelObj[fItem.key]}>
                            <Icon type="md-checkmark" slot="open"/>
                            <Icon type="md-close" slot="close"/>
                        </i-switch>
                    )
                }
                case 'select': {
                    return (
                        <Select size="small" v-model={modelObj[fItem.key]}>
                            <Option v-for="item in fItem.data" key={item.text + item.value}
                                    value={item.value}>{item.text}</Option>
                        </Select>
                    )
                }
                case 'code': {
                    return (
                        <span>
                            <mtFormItemCode size="small" v-model={modelObj[fItem.key]} index="0" field={fItem.key}
                                            mode={fItem.mode} onshowFullCode={showFullCode}></mtFormItemCode>
                        </span>
                    )
                }
                case 'radio':{
                    return (
                        <RadioGroup v-model="opNode.config[fItem.key]" @on-change="radioChange">
                        <Radio :label="item.value" v-for="item in fItem.data" :key="item.value">
                        <Icon :type="item.icon"></Icon>
                    <span>{{item.text}}</span>
                </Radio>
                </RadioGroup>
                    )
                }
                case 'div':{
                    return (
                        <div class="mt-emptyDiv" style={{width: 'auto',height: fItem.style.height+'px'}}></div>
                    )
                }
            }
        }

        const {fItem, panel, opNode} = context.props
        const modelObj = getModelProp(panel.key, opNode)
        const item = renderItem(fItem, modelObj)
        return (item)
    }
}