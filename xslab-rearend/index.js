const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const config = require('./config');
const router = require('./router/index');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const http = require('http');
const https = require('https');

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
    console.log(`${new Date()}`,`${ctx.method}`,`${ctx.url}`);
    await next();
});
app.use(router.routes());

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
