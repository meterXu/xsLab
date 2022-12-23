import db from "../common/provider.js";
import {request, summary, body, query, tags} from 'koa-swagger-decorator'
import PaginationModel from '../model/paginationModel.js'
import CanvasModel from '../model/canvasModel'
import ExecSqlModel from "../model/execSqlModel";
import path from "path";
import Utils from "../common/utils";
import fs from "fs";
import send from "koa-send";
import DownloadModel from "../model/downloadModel";
import ResultModel from "../model/resultModel";

const testTag = tags(['test'])

class CanvasController {
    constructor() {
    }

    @request('get', '/canvas/list')
    @summary('获取画布列表')
    @testTag
    @query(PaginationModel.swaggerDocument)
    static async canvas(ctx,next) {
        const pagination = new PaginationModel(ctx.request.query)
        let totalRes = await db.sqliteProvider.query('select count(*) total from xs_canvas where `delete`=1 and state=1');
        let res = await db.sqliteProvider.query('select * from xs_canvas where `delete`=1 and state=1 order by createTime desc limit ? offset ?', [
            pagination.pageSize,
            (pagination.pageNumber - 1) * pagination.pageSize
        ]);
        let resData = [];
        res.forEach(c => {
            resData.push({
                id: c.ID,
                name: c.NAME,
                insertTime: c.CREATETIME,
            });
        });

        ctx.success(new ResultModel({
            rows: resData,
            total: totalRes[0].total,
            pagination: pagination
        }))
    }

    @request('get', '/canvas/query')
    @summary('获取画布数据')
    @testTag
    @query({
        id: {type: 'number', required: true, description: '画布id'},
    })
    async canvasData(ctx) {
        if (ctx.request.query.id) {
            let res = await db.sqliteProvider.query('select data,options from xs_canvas where id = ?', [ctx.request.query.id]);
            if (res.length > 0) {
                ctx.success(new ResultModel({
                    cavOptions: res[0].OPTIONS,
                    cavData: res[0].DATA.toString(),
                }))
            } else {
                ctx.success(new ResultModel(null))
            }
        } else {
            ctx.success(new ResultModel(null))
        }
    }

    @request('post', '/canvas/save')
    @summary('保存画布数据')
    @testTag
    @body(CanvasModel.swaggerDocument)
    async saveCanvasData(ctx) {
        const canvas = new CanvasModel(ctx.request.body)
        let c = await db.sqliteProvider.query('select * from xs_canvas where id = ?', [canvas.id]);
        if (c.length > 0) {
            // 更新
            let upc = await db.sqliteProvider.exec('update xs_canvas set name=?,data=?,options=? where id=?',
                [canvas.name, JSON.stringify(canvas.data), JSON.stringify(canvas.options), canvas.id]);
            if (upc.changes > 0) {
                ctx.success(new ResultModel(1))
            } else {
                ctx.success(new ResultModel(0))
            }
        } else {
            // 新增
            let inc = await db.sqliteProvider.exec('insert into xs_canvas(id,name,data,options,createtime) values(?,?,?,?,?)',
                [canvas.id, canvas.name, JSON.stringify(canvas.data), JSON.stringify(canvas.options), new Date().valueOf()]);
            if (inc.changes > 0) {
                ctx.success(new ResultModel(1))
            } else {
                ctx.success(new ResultModel(0))
            }
        }
    }

    @request('post', '/canvas/delete')
    @summary('删除画布')
    @testTag
    @body({
        id: {type: 'number', required: true, description: '画布id'}
    })
    async delCanvas(ctx) {
        if (ctx.request.body.id) {
            let c = await db.sqliteProvider.exec('update xs_canvas set `delete`=? where id = ?', [2, ctx.request.body.id]);
            if (c.changes > 0) {
                ctx.success(new ResultModel(1))
            } else {
                ctx.success(new ResultModel(0))
            }
        } else {
            ctx.success(new ResultModel(0))
        }
    }

    @request('post', '/canvas/execSql')
    @summary('执行sql')
    @testTag
    @body(ExecSqlModel.swaggerDocument)
    async execSql(ctx) {
        let resData = [];
        let execSqlModel = new ExecSqlModel(ctx.request.body);
        let dbArray = [];
        let sqlArray = [];
        if (execSqlModel.dbs) {
            dbArray = execSqlModel.dbs.split('&')
        }
        if (execSqlModel.sqls) {
            sqlArray = execSqlModel.sqls.split('&')
        }
        for (let i = 0; i < dbArray.length; i++) {
            if (!dbArray[i] || !sqlArray[i]) {
                ctx.body = null;
            } else {
                let dbRes = await db.sqliteProvider.query('select * from XS_DATABASE where ID=? and `DELETE`=1 and STATE=1', [dbArray[i]]);
                if (dbRes.length > 0) {
                    switch (dbRes[0].TYPE.toString()) {
                        case "1": {
                            try {
                                let queryData = await db.oracleProvider.query({
                                    user: dbRes[0].USERNAME,
                                    password: dbRes[0].PASSWORD,
                                    connectString: dbRes[0].IPADDRESS + ":" + dbRes[0].PORT + "/" + dbRes[0].SCHEMAS
                                }, sqlArray[i]);
                                let dataList = [];
                                queryData.rows.forEach((c, i) => {
                                    let dataObj = {};
                                    queryData.metaData.forEach((k, j) => {
                                        dataObj[k.name] = c[j];
                                    })
                                    dataList.push(dataObj);
                                });
                                resData.push(JSON.stringify(dataList));
                            } catch (e) {
                                resData.push("[]");
                            }
                            break;
                        }
                        case "2": {
                            try {
                                let queryData = await db.mssqlProvider.query({
                                    host: dbRes[0].IPADDRESS,
                                    port: dbRes[0].PORT,
                                    user: dbRes[0].USERNAME,
                                    password: dbRes[0].PASSWORD,
                                    database: dbRes[0].SCHEMAS
                                }, sqlArray[i]);
                                resData.push(JSON.stringify(queryData.recordset));
                            } catch (e) {
                                resData.push("[]");
                            }
                            break;
                        }
                        case "3": {
                            try {
                                let queryData = await db.mysqlProvider.query({
                                    host: dbRes[0].IPADDRESS,
                                    port: dbRes[0].PORT,
                                    user: dbRes[0].USERNAME,
                                    password: dbRes[0].PASSWORD,
                                    database: dbRes[0].SCHEMAS
                                }, sqlArray[i], [])
                                resData.push(JSON.stringify(queryData));
                            } catch (e) {
                                resData.push("[]");
                            }
                            break;
                        }
                    }
                }
            }
        }
        ctx.success(new ResultModel(resData))
    }


    @request('get', '/canvas/download')
    @summary('下载画布')
    @testTag
    @query(DownloadModel.swaggerDocument)
    async download(ctx){
        let downloadModel = new DownloadModel(ctx.request.query)
        if (downloadModel.type && downloadModel.id) {
            let templatePath = "";
            let downLoadDirName = "";
            let downLoadRootPath = "";
            let downLoadTmpPath = "";
            let destWriteFile = "";
            switch (downloadModel.type) {
                case 2: {
                    templatePath = path.resolve( "template\\v_c_xs");
                    downLoadDirName = "v_c_xs_" + (new Date()).valueOf();
                    downLoadRootPath = path.resolve("download");
                    downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
                    destWriteFile = path.join(downLoadTmpPath, "src\\components\\HelloWorld.art");
                }
                    break;
                default:
                case 1: {
                    templatePath = path.resolve("template\\j_c_xs");
                    downLoadDirName = "j_c_xs_" + (new Date()).valueOf();
                    downLoadRootPath = path.resolve( "download");
                    downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
                    destWriteFile = path.join(downLoadTmpPath, "index.art");
                }
                    break;
            }
            const realContent = await Utils.createRealContent(templatePath, downloadModel.id, downloadModel.type);
            if (!realContent) {
                ctx.success(new ResultModel(0))
            } else {
                Utils.copyDir(templatePath, downLoadTmpPath, (err) => {
                    if (err) {
                        ctx.success(new ResultModel(0,err.message))
                    }
                });
                fs.writeFileSync(destWriteFile,realContent)
                fs.renameSync(destWriteFile,destWriteFile.replace('art',downloadModel.type===2?'vue':'html'))
                await Utils.createZip(downLoadTmpPath, downLoadDirName);
                const zipPath = `download\\${downLoadDirName}.zip`
                ctx.attachment(zipPath)
                ctx.success(new ResultModel(1))
                await send(ctx,zipPath)
                Utils.deleteDir(downLoadTmpPath)
                fs.unlinkSync(zipPath)
            }
        } else {
            ctx.success(new ResultModel(0))
        }
    }

}

export default CanvasController