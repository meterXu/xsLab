import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class DatabaseModel {
    @swaggerProperty({ type: "number", required: true,description:'数据库id' }) id=null
    @swaggerProperty({ type: "string", required: true,description:'数据库名称' }) name=null
    @swaggerProperty({ type: "number", required: true,description:'数据库类型' }) type=null
    @swaggerProperty({ type: "string", required: true,description:'数据库地址'}) ip=null
    @swaggerProperty({ type: "number", required: true,description:'数据库端口号'}) port=null
    @swaggerProperty({ type: "string", required: true,description:'数据库名称'}) schemas=null
    @swaggerProperty({ type: "string", required: true,description:'数据库用户名'}) username=null
    @swaggerProperty({ type: "string", required: true,description:'数据库密码'}) password=null

}