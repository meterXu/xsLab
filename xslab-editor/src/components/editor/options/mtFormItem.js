import mtFormItemColor from './mtFormItemColor'
import mtFormItemCode from './mtFormItemCode'
import ImgSelector from './ImgSelector'
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
        mtFormItemCode,
        ImgSelector
    },
    render(createElement, context) {
        function getModelProp(proPath, opNode,key) {
            let modelObj = null
            const proDeep = proPath.split('/')
            proDeep.forEach(pro => {
                if (modelObj) {
                    modelObj = modelObj[pro]
                } else {
                    modelObj = pro?opNode.config[pro]:opNode.config
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
                case 'img-selector':{
                    return (
                        <ImgSelector value={modelObj[fItem.key]}
                                     onUpdate={$event => {modelObj[fItem.key] = $event;watchNodeConfigChange()}}
                                     title={fItem.props.title}
                                     source={fItem.props.source}
                        >
                        </ImgSelector>
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
        const modelObj = getModelProp(panel.key, opNode,fItem.key)
        const item = renderItem(fItem, modelObj)
        return (item)
    }
}
