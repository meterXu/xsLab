import db from "../common/provider.js";
import { request, summary, body,query, tags } from 'koa-swagger-decorator'
import Pagination from '../model/pagination.js'

const testTag = tags(['test'])

class Canvas{
    constructor() {}

    @request('get', '/canvas')
    @summary('获取画布列表')
    @testTag
    @query({
        pageSize: { type: Number, required: false, default: 10, description: '每页个数' },
        pageNumber: { type: Number, required: false, default: 1, description: '页数' },
    })
    static async canvas(ctx) {
        const pagination = new Pagination(parseInt(ctx.request.query.pageNumber),parseInt(ctx.request.query.pageSize))
        let totalRes = await db.sqliteProvider.query('select count(*) total from xs_canvas where `delete`=1 and state=1');
        let res = await db.sqliteProvider.query('select * from xs_canvas where `delete`=1 and state=1 order by createTime desc limit ? offset ?',[
            pagination.pageSize,
            (pagination.pageNumber-1)*pagination.pageSize
        ]);
        let resData = [];
        res.forEach(c => {
            resData.push({
                oid: c.ID,
                name: c.NAME,
                insertTime: c.CREATETIME,
            });
        });
        ctx.response.type = 'json';
        ctx.body = {
            rows:resData,
            total:totalRes[0].total,
            pagination:pagination
        };
    }
}

export default Canvas


// router.get('/getCanvasList', async (ctx, next) => {
//     const {pageSize,pageNumber} = ctx.request.body
//     let totalRes = await db.sqliteProvider.query('select count(*) total from xs_canvas where `delete`=1 and state=1');
//     let res = await db.sqliteProvider.query('select * from xs_canvas where `delete`=1 and state=1 order by createTime desc limit ? offset ?',[
//         pageSize,
//         (pageNumber-1)*pageSize
//     ]);
//     let resData = [];
//     res.forEach(c => {
//         resData.push({
//             oid: c.ID,
//             name: c.NAME,
//             insertTime: c.CREATETIME,
//         });
//     });
//     ctx.response.type = 'json';
//     ctx.body = {
//         rows:resData,
//         total:totalRes[0].total,
//         page:{
//             pageSize:parseInt(pageSize),
//             pageNumber:parseInt(pageNumber)
//         }
//     };
// });
// router.get('/getCanvasData', async (ctx, next) => {
//     if (ctx.request.body.canvasOid) {
//         let res = await db.sqliteProvider.query('select data,options from xs_canvas where id = ?', [ctx.request.body.canvasOid]);
//         if (res.length > 0) {
//             ctx.response.body = 'json';
//             ctx.body = {
//                 cavOptions: res[0].OPTIONS,
//                 cavData: res[0].DATA.toString(),
//             };
//         } else {
//             ctx.response.body = 'text';
//             ctx.body = '';
//         }
//     } else {
//         ctx.response.body = 'text';
//         ctx.body = '';
//     }
// });
// router.post('/saveCanvasData', async (ctx, next) => {
//     ctx.response.body = 'json';
//     let id = ctx.request.body.canvasOid;
//     let name = ctx.request.body.canvasName;
//     let data = ctx.request.body.canvasData;
//     let options = ctx.request.body.canvasOptions;
//     let c = await db.sqliteProvider.query('select * from xs_canvas where id = ?', [id]);
//     if (c.length > 0) {
//         // 更新
//         let upc = await db.sqliteProvider.exec('update xs_canvas set name=?,data=?,options=? where id=?', [name, data, options, id]);
//         if (upc.changes > 0) {
//             ctx.body = {
//                 success: 1,
//             };
//         } else {
//             ctx.body = {
//                 success: 0,
//             };
//         }
//     } else {
//         // 新增
//         let inc = await db.sqliteProvider.exec('insert into xs_canvas(id,name,data,options,createtime) values(?,?,?,?,?)', [id, name, data, options, new Date().valueOf()]);
//         if (inc.changes > 0) {
//             ctx.body = {
//                 success: 1,
//             };
//         } else {
//             ctx.body = {
//                 success: 0,
//             };
//         }
//     }
// });
// router.post('/delCanvas', async (ctx, next) => {
//     ctx.response.body = 'text';
//     if (ctx.request.body.canvasOid) {
//         let c = await db.sqliteProvider.exec('update xs_canvas set `delete`=? where id = ?', [2, ctx.request.body.canvasOid]);
//         if (c.changes > 0) {
//             ctx.body = '1';
//         } else {
//             ctx.body = '0';
//         }
//     } else {
//         ctx.body = '0';
//     }
// });
// router.post('/execSql', async (ctx, next) => {
//     ctx.response.body = 'json';
//     let resData = [];
//     let {dbs, sqls} = ctx.request.body;
//     let dbArray = [];
//     let sqlArray = [];
//     if (dbs) {
//         dbArray = dbs.split('&')
//     }
//     if (sqls) {
//         sqlArray = sqls.split('&')
//     }
//     for (let i = 0; i < dbArray.length; i++) {
//         if (!dbArray[i] || !sqlArray[i]) {
//             ctx.body = null;
//         } else {
//             var dbRes = await db.sqliteProvider.query('select * from XS_DATABASE where ID=? and `DELETE`=1 and STATE=1', [dbArray[i]]);
//             if (dbRes.length > 0) {
//                 switch (dbRes[0].TYPE.toString()) {
//                     case "1": {
//                         try {
//                             let queryData = await db.oracleProvider.query({
//                                 user: dbRes[0].USERNAME,
//                                 password: dbRes[0].PASSWORD,
//                                 connectString: dbRes[0].IPADDRESS + ":" + dbRes[0].PORT + "/" + dbRes[0].SCHEMAS
//                             }, sqlArray[i]);
//                             let dataList = [];
//                             queryData.rows.forEach((c, i) => {
//                                 let dataObj = {};
//                                 queryData.metaData.forEach((k, j) => {
//                                     dataObj[k.name] = c[j];
//                                 })
//                                 dataList.push(dataObj);
//                             });
//                             resData.push(JSON.stringify(dataList));
//                         } catch (e) {
//                             resData.push("[]");
//                         }
//                         break;
//                     }
//                     case "2": {
//                         try {
//                             let queryData = await db.mssqlProvider.query({
//                                 host: dbRes[0].IPADDRESS,
//                                 port: dbRes[0].PORT,
//                                 user: dbRes[0].USERNAME,
//                                 password: dbRes[0].PASSWORD,
//                                 database: dbRes[0].SCHEMAS
//                             }, sqlArray[i]);
//                             resData.push(JSON.stringify(queryData.recordset));
//                         } catch (e) {
//                             resData.push("[]");
//                         }
//                         break;
//                     }
//                     case "3": {
//                         try {
//                             let queryData = await db.mysqlProvider.query({
//                                 host: dbRes[0].IPADDRESS,
//                                 port: dbRes[0].PORT,
//                                 user: dbRes[0].USERNAME,
//                                 password: dbRes[0].PASSWORD,
//                                 database: dbRes[0].SCHEMAS
//                             }, sqlArray[i], [])
//                             resData.push(JSON.stringify(queryData));
//                         } catch (e) {
//                             resData.push("[]");
//                         }
//                         break;
//                     }
//                 }
//             }
//         }
//     }
//     ctx.body = resData;
// });
// router.get('/downloadCanvas', async (ctx, next) => {
//     ctx.response.type = 'text';
//     let data = ctx.request.query
//     if (data.type && data.canvasOid) {
//         let templatePath = "";
//         let downLoadDirName = "";
//         let downLoadRootPath = "";
//         let downLoadTmpPath = "";
//         let destWriteFile = "";
//         const type = data.type.toString();
//         const oid = data.canvasOid;
//         switch (type) {
//             case "1": {
//                 templatePath = path.resolve("template\\j_c_xs");
//                 downLoadDirName = "j_c_xs_" + (new Date()).valueOf();
//                 downLoadRootPath = path.resolve( "download");
//                 downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
//                 destWriteFile = path.join(downLoadTmpPath, "index.art");
//             }
//                 break;
//             case "2": {
//                 templatePath = path.resolve( "template\\v_c_xs");
//                 downLoadDirName = "v_c_xs_" + (new Date()).valueOf();
//                 downLoadRootPath = path.resolve("download");
//                 downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
//                 destWriteFile = path.join(downLoadTmpPath, "src\\components\\HelloWorld.art");
//             }
//                 break;
//         }
//         const realContent = await createRealContent(templatePath, oid, type);
//         if (!realContent) {
//             ctx.body = 0
//         } else {
//             copyDir(templatePath, downLoadTmpPath, (err) => {
//                 if (err) {
//                     ctx.body= 0
//                 }
//             });
//             fs.writeFileSync(destWriteFile,realContent)
//             fs.renameSync(destWriteFile,destWriteFile.replace('art',type==="2"?'vue':'html'))
//             await createZip(downLoadTmpPath, downLoadDirName);
//             const zipPath = `download\\${downLoadDirName}.zip`
//             ctx.attachment(zipPath)
//             ctx.body= 1
//             await send(ctx,zipPath)
//             deleteDir(downLoadTmpPath)
//             fs.unlinkSync(zipPath)
//         }
//     } else {
//         ctx.body= 0
//     }
// });