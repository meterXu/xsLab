import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class CanvasModel {
@swaggerProperty({ type: "number", required: true,description:'画布id' }) id=0
@swaggerProperty({ type: "string", required: true,description:'画布名称' }) name=""
@swaggerProperty({ type: "object", required: true,description:'画布中图表json' }) data={}
@swaggerProperty({ type: "object", required: true,description:'画布自身json'}) options={}
}