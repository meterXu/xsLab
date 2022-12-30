import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class DownloadModel {
    constructor(query) {
        this.id = parseInt(query.id)
        this.type = parseInt(query.type)
    }
    @swaggerProperty({ type: "number", required: true,description:'下载类型',default:1 }) type=1
    @swaggerProperty({ type: "number", required: true,description:'画布id' }) id=null
}