import {query, request, summary, tags} from "koa-swagger-decorator";
import PaginationModel from "../model/paginationModel";
import db from "../common/provider";

const testTag = tags(['test'])

export default class DatabaseController{
    constructor() {
    }

    @request('get', '/database/list')
    @summary('获取数据库列表')
    @testTag
    @query(PaginationModel.swaggerDocument)
    async dataBaseList(ctx){
        ctx.response.type = 'json';
        const pagination = new PaginationModel(parseInt(ctx.request.query.pageNumber), parseInt(ctx.request.query.pageSize))
        let totalRes = await db.sqliteProvider.query('select count(*) total from xs_database where `delete`=1 and state=1');
        let res = await db.sqliteProvider.query('select * from xs_database where `delete`=1 and state=1 order by createTime desc limit ? offset ?',
            [
                pagination.pageSize,
                (pagination.pageNumber - 1) * pagination.pageSize
            ]);
        let resData = [];
        res.map(c => {
            resData.push({
                value: c.ID.toString(),
                type: c.TYPE.toString(),
                text: c.NAME,
                schemas: c.SCHEMAS,
                username: c.USERNAME,
                ipAddress: c.IPADDRESS,
                port: c.PORT.toString(),
                password: ''
            })
        });
        ctx.body = {
            rows:resData,
            total: totalRes[0].total,
            pagination: pagination
        }
    }
}



// router.post('/saveDataSource', async (ctx, next) => {
//     ctx.response.type = 'json';
//     let id = ctx.request.body.value;
//     let name = ctx.request.body.text;
//     let {type, ipAddress, port, schemas, username, password} = ctx.request.body;
//     if (await testConnect({type, ipAddress, port, schemas, username, password: password})) {
//         if (id) {
//             let res = await db.sqliteProvider.exec('update xs_database set name=?,type=?,ipaddress=?,port=?,userName=?,password=?,`schemas`=? where id = ?',
//                 [name, type, ipAddress, port, username, password, schemas, id]);
//             if (res.changes > 0) {
//                 ctx.body = {code: 1, oid: id};
//             } else {
//                 ctx.body = {code: 0, oid: id};
//             }
//         } else {
//             let res = await db.sqliteProvider.exec('insert into xs_database(NAME,TYPE,IPADDRESS,PORT,USERNAME,PASSWORD,`SCHEMAS`,CREATETIME) values(?,?,?,?,?,?,?,?)',
//                 [
//                     name, type, ipAddress, port, username, password, schemas, new Date().valueOf()
//                 ]);
//             if (res.changes > 0) {
//                 ctx.body = {code: 1, oid: res.lastId.toString()};
//             } else {
//                 ctx.body = {code: 0, oid: ''};
//             }
//         }
//     } else {
//         ctx.body = {code: 0, msg: '数据库无法连接'};
//     }
//
// });
// router.post('/delDataSource', async (ctx, next) => {
//     ctx.response.type = 'text';
//     let id = ctx.request.body.oid;
//     if (id) {
//         let c = await db.sqliteProvider.exec('update xs_database set `delete`=? where id = ?', [2, id]);
//         if (c.changes > 0) {
//             ctx.body = '1';
//         } else {
//             ctx.body = '0';
//         }
//     } else {
//         ctx.body = '0';
//     }
// });