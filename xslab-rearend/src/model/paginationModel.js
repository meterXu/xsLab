import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class PaginationModel {
    @swaggerProperty({ type: "number", required: true,default:1 })pageNumber=1
    @swaggerProperty({ type: "number", required: true,default:10 })pageSize=10
}