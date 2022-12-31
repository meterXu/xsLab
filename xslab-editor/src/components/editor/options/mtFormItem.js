import mtFormItemColor from './mtFormItemColor'
import mtFormItemCode from './mtFormItemCode'
export default {
    name: 'mtFormItem',
    functional: true,
    props: {
        fItem: Object,
        panel: Object,
        opNode: Object
    },
    components: {
        mtFormItemColor,
        mtFormItemCode
    },
    render(createElement, context) {
        function getModelProp(key, opNode) {
            let modelObj = null
            const keyDeep = key.split('/')
            keyDeep.forEach(key => {
                if (modelObj) {
                    modelObj = modelObj[key]
                } else {
                    modelObj = key?opNode.config[key]:opNode.config
                }
            })
            return modelObj
        }

        function renderItem(fItem, modelObj) {
            switch (fItem.type) {
                case 'number': {
                    return (
                        <span>
                            <InputNumber value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}} size="small"></InputNumber> {fItem.unit || 'px'}
                        </span>
                    )
                }
                case 'text': {
                    return (
                        <Input value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}} size="small"/>
                    )
                }
                case 'color': {
                    return (
                        <mtFormItemColor value={modelObj[fItem.key]} onUpdate={$event => {
                            modelObj[fItem.key] = $event;watchNodeConfigChange()
                        }} size="small"/>
                    )
                }
                case 'textarea': {
                    return (
                        <Input type="textarea" rows={4} value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}} size="small"/>
                    )
                }
                case 'boolean': {
                    return (
                        <i-switch value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}>
                            <Icon type="md-checkmark" slot="open"/>
                            <Icon type="md-close" slot="close"/>
                        </i-switch>
                    )
                }
                case 'select': {
                    return (
                        <Select size="small" value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}>
                            {fItem.data.map(item=><Option value={item.value}>{item.text}</Option>)}
                        </Select>
                    )
                }
                case 'code': {
                    return (
                        <mtFormItemCode size="small" value={modelObj[fItem.key]} index="0" field={fItem.key} name={fItem.name}
                                        mode={fItem.mode} onUpdate={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}></mtFormItemCode>
                    )
                }
                case 'radio':{
                    return (
                        <RadioGroup value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}>
                            {fItem.data.map(item=><Radio label={item.value}>
                                <Icon type={item.icon}></Icon>
                                <span>{item.text}</span>
                            </Radio>)}
                        </RadioGroup>
                    )
                }
                case 'div':{
                    return (
                        <div class="mt-emptyDiv" style={{width: 'auto',height: fItem.style.height+'px'}}></div>
                    )
                }
                default:{
                    return (
                        <Input  size="small" value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}/>
                    )
                }
            }
        }

        function watchNodeConfigChange(){
            window.vue.$bus.$emit('nodeConfigChange')
        }

        const {fItem, panel, opNode} = context.props
        const modelObj = getModelProp(panel.key, opNode)
        const item = renderItem(fItem, modelObj)
        return (item)
    }
}