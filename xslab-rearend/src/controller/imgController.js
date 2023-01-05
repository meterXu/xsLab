import {query, request, summary, tags} from "koa-swagger-decorator";
import {ImgPaginationModel} from "../model/paginationModel";
import ResultModel from "../model/resultModel";
import fs from "fs";
import path from "path"
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const testTag = tags(['test'])
import sizeOf from 'image-size'

export default class ImgController{
    constructor() {
    }

    @request('get', '/img/list')
    @summary('获取图片列表')
    @testTag
    @query(ImgPaginationModel.swaggerDocument)
    async imgList(ctx) {
        const imgPagination = new ImgPaginationModel(ctx.request.query)
        let totalRes = await prisma.xs_img.findMany({
            where: {
                delete: 1,
                state: 1,
                bigType:imgPagination.bigType,
                smallType:imgPagination.smallType
            }
        });
        let imgList = await prisma.xs_img.findMany({
            where: {
                delete: 1,
                state: 1,
                bigType:imgPagination.bigType,
                smallType:imgPagination.smallType
            },
            orderBy: {
                id: 'desc',
            },
            skip: (imgPagination.pageNumber - 1) * imgPagination.pageSize,
            take: imgPagination.pageSize
        });

        ctx.success(new ResultModel({
            rows: imgList,
            total: totalRes.length,
            pagination: imgPagination
        }))
    }

    @request('get', '/img/init')
    @summary('初始化图片资源')
    @testTag
    async initList(ctx){
        let types = fs.readdirSync(path.resolve('web/material')).filter(c=>c!=='.DS_Store')
        types.forEach(type=>{
            let imgs = fs.readdirSync(path.resolve(`web/material/${type}`))
            imgs.forEach(async (img)=>{
                const url = `/material/${type}/${img}`
                const dimensions = sizeOf(path.join('web',url))
                try{
                    await prisma.xs_img.create({
                        data:{
                            name:img,
                            bigType:type,
                            smallType:'',
                            url:url,
                            size:`${dimensions.width}x${dimensions.height}`
                        }
                    })
                    console.log(`初始化成功-${img}`)
                }catch (ex){
                    console.error(`初始化失败-${img}`)
                }
            })
        })
    }
}