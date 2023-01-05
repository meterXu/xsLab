import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class PaginationModel {
    constructor(query) {
        this.pageNumber = parseInt(query.pageNumber)
        this.pageSize = parseInt(query.pageSize)
    }
    @swaggerProperty({ type: "number", required: true,default:1 })pageNumber=1
    @swaggerProperty({ type: "number", required: true,default:10 })pageSize=10
}

@swaggerClass()
export class ImgPaginationModel extends PaginationModel {
    constructor(query) {
        super(query);
        this.bigType = query.bigType
        this.smallType = query.smallType
    }
    @swaggerProperty({ type: "string", required: true,default:'bg' })bigType='bg'
    @swaggerProperty({ type: "string", required: false,default:'' })smallType=''
}
