import {SwaggerRouter} from 'koa-swagger-decorator'
import path from "path";

const router = new SwaggerRouter({
    prefix: '/api',
})


router.swagger({
    title: 'xslab Server',
    description: 'API DOC',
    version: '1.0.3',
    prefix: '/api',
    swaggerHtmlEndpoint: '/swagger-html',
    swaggerJsonEndpoint: '/swagger-json',
})

router.mapDir(path.resolve(__dirname, '../controller/'))
export default router
