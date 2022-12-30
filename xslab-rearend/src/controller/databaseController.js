import {body, query, request, summary, tags} from "koa-swagger-decorator";
import PaginationModel from "../model/paginationModel";
import db from "../common/provider";
import Utils from "../common/utils";
import DatabaseModel from "../model/databaseModel";
import ResultModel from "../model/resultModel";

const testTag = tags(['test'])

export default class DatabaseController{
    constructor() {
    }

    @request('get', '/database/list')
    @summary('获取数据库列表')
    @testTag
    @query(PaginationModel.swaggerDocument)
    async dataBaseList(ctx){
        const pagination = new PaginationModel(ctx.request.query)
        let totalRes = await db.sqliteProvider.query('select count(*) total from xs_database where `delete`=1 and state=1');
        let res = await db.sqliteProvider.query('select * from xs_database where `delete`=1 and state=1 order by createTime desc limit ? offset ?',
            [
                pagination.pageSize,
                (pagination.pageNumber - 1) * pagination.pageSize
            ]);
        let resData = [];
        res.map(c => {
            resData.push({
                id: c.ID.toString(),
                type: c.TYPE.toString(),
                name: c.NAME,
                schemas: c.SCHEMAS,
                username: c.USERNAME,
                ipAddress: c.IPADDRESS,
                port: c.PORT.toString(),
                password: ''
            })
        });
        ctx.success(new ResultModel({
            rows:resData,
            total: totalRes[0].total,
            pagination: pagination
        }))
    }

    @request('post', '/database/save')
    @summary('保存数据库')
    @testTag
    @body(DatabaseModel.swaggerDocument)
    async saveDataSource(ctx){
        const databaseModel = new DatabaseModel(ctx.request.body)
        if (await Utils.testConnect(databaseModel)) {
            if (databaseModel.id) {
                let res = await db.sqliteProvider.exec('update xs_database set name=?,type=?,ipaddress=?,port=?,userName=?,password=?,`schemas`=? where id = ?',
                    [databaseModel.name, databaseModel.type, databaseModel.ipAddress, databaseModel.port, databaseModel.username, databaseModel.password, databaseModel.schemas, databaseModel.id]);
                if (res.changes > 0) {
                    ctx.success(new ResultModel(databaseModel.id))
                } else {
                    ctx.fail(new ResultModel(databaseModel.id))
                }
            } else {
                let res = await db.sqliteProvider.exec('insert into xs_database(NAME,TYPE,IPADDRESS,PORT,USERNAME,PASSWORD,`SCHEMAS`,CREATETIME) values(?,?,?,?,?,?,?,?)',
                    [
                        databaseModel.name, databaseModel.type, databaseModel.ipAddress, databaseModel.port, databaseModel.username, databaseModel.password, databaseModel.schemas, new Date().valueOf()
                    ]);
                if (res.changes > 0) {
                    ctx.success(new ResultModel(res.lastId.toString()))
                } else {
                    ctx.fail(new ResultModel(null))
                }
            }
        } else {
            ctx.fail(new ResultModel(null,'数据库无法连接'))
        }
    }


    @request('post', '/database/delete')
    @summary('删除数据库')
    @testTag
    @body({
        id:{ type: "number", required: true,description:'数据库id' }
    })
    async delDataSource(ctx){
        let id = ctx.request.body.id;
        if (id) {
            let c = await db.sqliteProvider.exec('update xs_database set `delete`=? where id = ?', [2, id]);
            if (c.changes > 0) {
                ctx.success(new ResultModel(id))
            } else {
                ctx.fail(new ResultModel(id))
            }
        } else {
            ctx.fail(new ResultModel(id))
        }
    }

}