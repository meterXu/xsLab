import {swaggerClass, swaggerProperty} from "koa-swagger-decorator";

@swaggerClass()
export default class ExecSqlModel{
    constructor(body) {
        this.dbs = body.dbs
        this.sqls = body.sqls
    }
    @swaggerProperty({ type: "string", required: true,description: '数据库id数组字符串，以&分割' })dbs=''
    @swaggerProperty({ type: "string", required: true,description: 'sql语句，以&分割' })sqls=''
}