import Koa from 'koa';
import fs from 'fs'
import config from './config.js'
import api from './router/api'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import koastatic from 'koa-static'
import http from 'http'
import https from 'https'
import routerResponse from "./middleware/routerResponse";
import path from "path";

const app = new Koa();
app.use(koaBody());
app.use(cors());
let sslOptions = null;

//Force HTTPS on all page
if(config.enableSsl === true){
    sslOptions = {
        key: fs.readFileSync(config.ssl_key),  //ssl文件路径
        cert: fs.readFileSync(config.ssl_cert)  //ssl文件路径
    };
}
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    await next();
})
    .use(koastatic(path.resolve('web')))
    .use(routerResponse())
    .use(api.routes())

if(config.enableSsl){
    try{
        https.createServer(sslOptions, app.callback()).listen(config.port,(err)=>{
            if(!!err){
                console.error('HTTPS server FAIL: ', err, (err && err.stack));
            }else{
                console.log(`service started at ${config.NODE_ENV} https://localhost:${config.port}`);
            }
        });
    }catch (ex) {
        console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
    }
}
else{
    try{
        http.createServer(app.callback()).listen(config.port,(err)=>{
            if(!!err){
                console.error('HTTP server FAIL: ', err, (err && err.stack));
            }else{
                console.log(`service started at ${config.NODE_ENV} http://localhost:${config.port}`);
            }
        });
    }catch (ex) {
        console.error('Failed to start HTTP server\n', ex, (ex && ex.stack));
    }
}
