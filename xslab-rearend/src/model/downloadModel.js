import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class DownloadModel {
    @swaggerProperty({ type: "number", required: true,description:'画布类型',default:1 }) type=1
    @swaggerProperty({ type: "number", required: true,description:'画布id' }) id=null
}