import {request, summary, tags} from "koa-swagger-decorator";
const testTag = tags(['test'])
class Index{
    @request('get', '/')
    @summary('xslab api')
    @testTag
    async api(ctx){
        ctx.body = 'hello xslab!'
    }

    @request('get', '/validate')
    @summary('xslab api校验')
    @testTag
    async validate(ctx){
        ctx.body = 1
    }

}

export default Index