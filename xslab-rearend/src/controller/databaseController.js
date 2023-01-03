import {body, query, request, summary, tags} from "koa-swagger-decorator";
import PaginationModel from "../model/paginationModel";
import db from "../common/provider";
import Utils from "../common/utils";
import DatabaseModel from "../model/databaseModel";
import ResultModel from "../model/resultModel";

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const testTag = tags(['test'])

export default class DatabaseController {
    constructor() {
    }

    @request('get', '/database/list')
    @summary('获取数据库列表')
    @testTag
    @query(PaginationModel.swaggerDocument)
    async dataBaseList(ctx) {
        const pagination = new PaginationModel(ctx.request.query)
        let totalRes = await prisma.xs_database.findMany({
            where: {
                delete: 1,
                state: 1
            }
        });
        let databaseList = await prisma.xs_database.findMany({
            select: {
                id: true,
                type: true,
                name: true,
                schemas: true,
                username: true,
                ipaddress: true,
                port: true,
            },
            where: {
                delete: 1,
                state: 1,
            },
            orderBy: {
                createTime: 'asc',
            },
            skip: (pagination.pageNumber - 1) * pagination.pageSize,
            take: pagination.pageSize
        });

        ctx.success(new ResultModel({
            rows: databaseList,
            total: totalRes.length,
            pagination: pagination
        }))
    }

    @request('post', '/database/save')
    @summary('保存数据库')
    @testTag
    @body(DatabaseModel.swaggerDocument)
    async saveDataSource(ctx) {
        const databaseModel = new DatabaseModel(ctx.request.body)
        if (await Utils.testConnect(databaseModel)) {
            if (databaseModel.id) {
                let res = await prisma.xs_database.update({
                    where: {
                        id: databaseModel.id
                    },
                    data: databaseModel
                });
                ctx.success(new ResultModel(res.id))
            } else {
                let res = await prisma.xs_database.create({
                    data: {
                        name:databaseModel.name,
                        type:databaseModel.type,
                        ipaddress:databaseModel.ipaddress,
                        port:databaseModel.port,
                        schemas:databaseModel.schemas,
                        username:databaseModel.username,
                        password:databaseModel.password
                    }
                })
                ctx.success(new ResultModel(res.id))
            }
        } else {
            ctx.fail(new ResultModel(null, '数据库无法连接'))
        }
    }


    @request('post', '/database/delete')
    @summary('删除数据库')
    @testTag
    @body({
        id: {type: "number", required: true, description: '数据库id'}
    })
    async delDataSource(ctx) {
        let id = ctx.request.body.id;
        if (id) {
            let res = await prisma.xs_database.update({
                data:{
                    delete: 1,
                },
                where: {
                    id: id
                }
            })
            ctx.success(new ResultModel(id))
        } else {
            ctx.fail(new ResultModel(id))
        }
    }

}