export default function (){
    return function(ctx,next){
        ctx.success = function (result) {
            ctx.response.body = ctx.response.body||'json'
            if(!result.code) result.code = 200
            if(!result.success) result.success = true
            if(!result.message) result.message = '请求成功！'
            ctx.body = result
        }

        ctx.fail = function (result) {
            ctx.response.body = ctx.response.body||'json'
            if(!result.code) result.code = 500
            if(!result.success) result.success = false
            if(!result.message) result.message = '请求失败！'
            ctx.body = Object.assign(result)
        }
       return next()
    }
}

