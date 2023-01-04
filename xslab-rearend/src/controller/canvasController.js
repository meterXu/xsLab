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
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
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
        let totalRes = await prisma.xs_canvas.findMany({
            where:{
                delete:1,
                state:1
            }
        })
        let resData = await prisma.xs_canvas.findMany({
            where:{
                delete:1,
                state:1
            },
            orderBy: {
                createTime: 'asc',
            },
            skip: (pagination.pageNumber - 1) * pagination.pageSize,
            take: pagination.pageSize
        })

        ctx.success(new ResultModel({
            rows: resData,
            total: totalRes.length,
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
            let canvas = await prisma.xs_canvas.findUnique({
                select: {
                    options: true,
                    data: true
                },
                where: {
                    id: parseInt(ctx.request.query.id)
                }
            })
            if (canvas) {
                ctx.success(new ResultModel(canvas))
            } else {
                ctx.fail(new ResultModel(null))
            }
        } else {
            ctx.fail(new ResultModel(null))
        }
    }

    @request('post', '/canvas/save')
    @summary('保存画布数据')
    @testTag
    @body(CanvasModel.swaggerDocument)
    async saveCanvasData(ctx) {
        const canvas = new CanvasModel(ctx.request.body)
        if (canvas.id) {
            // 更新
            const res = await prisma.xs_canvas.update({
                data:{
                    name:canvas.name,
                    data:JSON.stringify(canvas.data),
                    options:JSON.stringify(canvas.options)
                },
                where:{
                    id:canvas.id
                }
            })
            ctx.success(new ResultModel(res.id))
        } else {
            // 新增
            const res = await prisma.xs_canvas.create({
                data:{
                    name:canvas.name,
                    data:JSON.stringify(canvas.data),
                    options:JSON.stringify(canvas.options)
                }
            })
            ctx.success(new ResultModel(res.id))
        }
    }

    @request('post', '/canvas/delete')
    @summary('删除画布')
    @testTag
    @body({
        id: {type: 'number', required: true, description: '画布id'}
    })
    async delCanvas(ctx) {
        if (ctx.request.body.id!==null&&ctx.request.body.id!==undefined) {
            const res = await prisma.xs_canvas.update({
                data:{
                    delete:2
                },
                where:{
                    id:ctx.request.body.id
                }
            })
            ctx.success(new ResultModel(res.id))
        } else {
            ctx.fail(new ResultModel(ctx.request.body.id))
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
                let dbRes = await prisma.xs_database.findUnique({
                    where:{
                        delete:1,
                        state:1,
                        id:dbArray[i]
                    }
                })
                switch (dbRes.type.toString()) {
                    case "1": {
                        try {
                            let queryData = await db.oracleProvider.query({
                                username: dbRes.username,
                                password: dbRes.password,
                                connectString: dbRes.ipaddress + ":" + dbRes.port + "/" + dbRes.schemas
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
                                ipaddress: dbRes[0].ipaddress,
                                port: dbRes[0].port,
                                username: dbRes[0].username,
                                password: dbRes[0].password,
                                schemas: dbRes[0].schemas
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
                                ipaddress: dbRes[0].ipaddress,
                                port: dbRes[0].port,
                                username: dbRes[0].username,
                                password: dbRes[0].password,
                                schemas: dbRes[0].schemas
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
        ctx.success(new ResultModel(resData))
    }


    @request('get', '/canvas/download')
    @summary('下载画布')
    @testTag
    @query(DownloadModel.swaggerDocument)
    async download(ctx){
        try{
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
                    ctx.fail(new ResultModel(0))
                } else {
                    if(!fs.existsSync('download')){fs.mkdirSync(path.resolve('download'))}
                    Utils.copyDirSync(templatePath, downLoadTmpPath);
                    fs.writeFileSync(destWriteFile,realContent)
                    fs.renameSync(destWriteFile,destWriteFile.replace('art',downloadModel.type===2?'vue':'html'))
                    await Utils.createZip(downLoadTmpPath, downLoadDirName);
                    const zipPath = `download\\${downLoadDirName}.zip`
                    await send(ctx,zipPath)
                    Utils.deleteDir(downLoadTmpPath)
                    fs.unlinkSync(zipPath)
                }
            } else {
                ctx.fail(new ResultModel(null))
            }
        }catch (err){
            ctx.fail(new ResultModel(err.message))
        }

    }

}

export default CanvasController