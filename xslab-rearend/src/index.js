import Koa from 'koa';
import fs from 'fs'
import config from './config.js'
import router from './router'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import http from 'http'
import https from 'https'
import routerResponse from "./middleware/routerResponse";

const app = new Koa();
app.use(koaBody());
app.use(cors());
let sslOptions = null;
let port = 11525;

//Force HTTPS on all page
if(config.enableSsl === true){
    sslOptions = {
        key: fs.readFileSync(config.ssl_key),  //ssl文件路径
        cert: fs.readFileSync(config.ssl_cert)  //ssl文件路径
    };
}
if(config.port&&parseInt(config.port)!==NaN){
    port = config.port
}

app.use(async (ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', '*')
    } else {
        ctx.set('Access-Control-Allow-Origin', config.allowHosts)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    await next();
})
    .use(routerResponse())
    .use(router.routes())

if(config.enableSsl){
    try{
        https.createServer(sslOptions, app.callback()).listen(port,(err)=>{
            if(!!err){
                console.error('HTTPS server FAIL: ', err, (err && err.stack));
            }else{
                console.log(`service started at https://localhost:${port}`);
            }
        });
    }catch (ex) {
        console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
    }
}
else{
    try{
        http.createServer(app.callback()).listen(port,(err)=>{
            if(!!err){
                console.error('HTTP server FAIL: ', err, (err && err.stack));
            }else{
                console.log(`service started at http://localhost:${port}`);
            }
        });
    }catch (ex) {
        console.error('Failed to start HTTP server\n', ex, (ex && ex.stack));
    }
}
