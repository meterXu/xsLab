const router = require('koa-router')();
const db = require('../common/provider');
const RSA = require("../common/RSA");
const path = require('path');
const fs = require('fs');
const template = require('art-template');
const compressing = require('compressing');
const send = require('koa-send');
router.get('/', async (ctx, next) => {
    ctx.body = 'hello xscollect!'
});
router.post('/validateBaseUrl', async (ctx, next) => {
    ctx.body = 1
});
router.post('/GetDataBaseList', async (ctx, next) => {
    ctx.response.type = 'json';
    let res = await db.sqliteProvider.query('select * from xs_database where `delete`=1 and state=1 order by createTime desc');
    let resData = [];
    res.map(c => {
        resData.push({
            value: c.ID.toString(),
            type: c.TYPE.toString(),
            text: c.NAME,
            schemas: c.SCHEMAS,
            username: c.USERNAME,
            ipAddress: c.IPADDRESS,
            port: c.PORT.toString(),
            password: ''
        })
    });
    ctx.body = resData
});
router.post('/SaveDataSource', async (ctx, next) => {
    ctx.response.type = 'json';
    let id = ctx.request.body.value;
    let name = ctx.request.body.text;
    let {type, ipAddress, port, schemas, username, password} = ctx.request.body;
    if (await testConnect({type, ipAddress, port, schemas, username, password: password})) {
        if (id) {
            let res = await db.sqliteProvider.exec('update xs_database set name=?,type=?,ipaddress=?,port=?,userName=?,password=?,`schemas`=? where id = ?',
                [name, type, ipAddress, port, username, password, schemas, id]);
            if (res.changes > 0) {
                ctx.body = {code: 1, oid: id};
            } else {
                ctx.body = {code: 0, oid: id};
            }
        } else {
            let res = await db.sqliteProvider.exec('insert into xs_database(NAME,TYPE,IPADDRESS,PORT,USERNAME,PASSWORD,`SCHEMAS`,CREATETIME) values(?,?,?,?,?,?,?,?)',
                [
                    name, type, ipAddress, port, username, password, schemas, new Date().valueOf()
                ]);
            if (res.changes > 0) {
                ctx.body = {code: 1, oid: res.lastId.toString()};
            } else {
                ctx.body = {code: 0, oid: ''};
            }
        }
    } else {
        ctx.body = {code: 0, msg: '数据库无法连接'};
    }

});
router.post('/DelDataSource', async (ctx, next) => {
    ctx.response.type = 'text';
    let id = ctx.request.body.oid;
    if (id) {
        let c = await db.sqliteProvider.exec('update xs_database set `delete`=? where id = ?', [2, id]);
        if (c.changes > 0) {
            ctx.body = '1';
        } else {
            ctx.body = '0';
        }
    } else {
        ctx.body = '0';
    }
});
router.post('/GetCanvasList', async (ctx, next) => {
    const {pageSize,pageNumber} = ctx.request.body
    let totalRes = await db.sqliteProvider.query('select count(*) total from xs_canvas where `delete`=1 and state=1');
    let res = await db.sqliteProvider.query('select * from xs_canvas where `delete`=1 and state=1 order by createTime desc limit ? offset ?',[
        pageSize,
        (pageNumber-1)*pageSize
    ]);
    let resData = [];
    res.forEach(c => {
        resData.push({
            oid: c.ID,
            name: c.NAME,
            insertTime: c.CREATETIME,
        });
    });
    ctx.response.type = 'json';
    ctx.body = {
        rows:resData,
        total:totalRes[0].total,
        page:{
            pageSize:parseInt(pageSize),
            pageNumber:parseInt(pageNumber)
        }
    };
});
router.post('/GetCanvasData', async (ctx, next) => {
    if (ctx.request.body.canvasOid) {
        let res = await db.sqliteProvider.query('select data,options from xs_canvas where id = ?', [ctx.request.body.canvasOid]);
        if (res.length > 0) {
            ctx.response.body = 'json';
            ctx.body = {
                cavOptions: res[0].OPTIONS,
                cavData: res[0].DATA.toString(),
            };
        } else {
            ctx.response.body = 'text';
            ctx.body = '';
        }
    } else {
        ctx.response.body = 'text';
        ctx.body = '';
    }
});
router.post('/SaveCanvasData', async (ctx, next) => {
    ctx.response.body = 'json';
    let id = ctx.request.body.canvasOid;
    let name = ctx.request.body.canvasName;
    let data = ctx.request.body.canvasData;
    let options = ctx.request.body.canvasOptions;
    let c = await db.sqliteProvider.query('select * from xs_canvas where id = ?', [id]);
    if (c.length > 0) {
        // 更新
        let upc = await db.sqliteProvider.exec('update xs_canvas set name=?,data=?,options=? where id=?', [name, data, options, id]);
        if (upc.changes > 0) {
            ctx.body = {
                success: 1,
            };
        } else {
            ctx.body = {
                success: 0,
            };
        }
    } else {
        // 新增
        let inc = await db.sqliteProvider.exec('insert into xs_canvas(id,name,data,options,createtime) values(?,?,?,?,?)', [id, name, data, options, new Date().valueOf()]);
        if (inc.changes > 0) {
            ctx.body = {
                success: 1,
            };
        } else {
            ctx.body = {
                success: 0,
            };
        }
    }
});
router.post('/DelCanvas', async (ctx, next) => {
    ctx.response.body = 'text';
    if (ctx.request.body.canvasOid) {
        let c = await db.sqliteProvider.exec('update xs_canvas set `delete`=? where id = ?', [2, ctx.request.body.canvasOid]);
        if (c.changes > 0) {
            ctx.body = '1';
        } else {
            ctx.body = '0';
        }
    } else {
        ctx.body = '0';
    }
});
router.post('/ExecSql', async (ctx, next) => {
    ctx.response.body = 'json';
    let resData = [];
    let {dbs, sqls} = ctx.request.body;
    let dbArray = [];
    let sqlArray = [];
    if (dbs) {
        dbArray = dbs.split('&')
    }
    if (sqls) {
        sqlArray = sqls.split('&')
    }
    for (let i = 0; i < dbArray.length; i++) {
        if (!dbArray[i] || !sqlArray[i]) {
            ctx.body = null;
        } else {
            var dbRes = await db.sqliteProvider.query('select * from XS_DATABASE where ID=? and `DELETE`=1 and STATE=1', [dbArray[i]]);
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
    ctx.body = resData;
});
router.get('/DownloadCanvas', async (ctx, next) => {
    ctx.response.type = 'text';
    let data = ctx.request.query
    if (data.type && data.canvasOid) {
        let templatePath = "";
        let downLoadDirName = "";
        let downLoadRootPath = "";
        let downLoadTmpPath = "";
        let destWriteFile = "";
        const type = data.type.toString();
        const oid = data.canvasOid;
        switch (type) {
            case "1": {
                templatePath = path.resolve("template\\j_c_xs");
                downLoadDirName = "j_c_xs_" + (new Date()).valueOf();
                downLoadRootPath = path.resolve( "download");
                downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
                destWriteFile = path.join(downLoadTmpPath, "index.art");
            }
                break;
            case "2": {
                templatePath = path.resolve( "template\\v_c_xs");
                downLoadDirName = "v_c_xs_" + (new Date()).valueOf();
                downLoadRootPath = path.resolve("download");
                downLoadTmpPath = path.join(downLoadRootPath, downLoadDirName);
                destWriteFile = path.join(downLoadTmpPath, "src\\components\\HelloWorld.art");
            }
                break;
        }
        const realContent = await createRealContent(templatePath, oid, type);
        if (!realContent) {
            ctx.body = 0
        } else {
            copyDir(templatePath, downLoadTmpPath, (err) => {
                if (err) {
                    ctx.body= 0
                }
            });
            fs.writeFileSync(destWriteFile,realContent)
            fs.renameSync(destWriteFile,destWriteFile.replace('art',type==="2"?'vue':'html'))
            await createZip(downLoadTmpPath, downLoadDirName);
            const zipPath = `download\\${downLoadDirName}.zip`
            ctx.attachment(zipPath)
            ctx.body= 1
            await send(ctx,zipPath)
            deleteDir(downLoadTmpPath)
            fs.unlinkSync(zipPath)
        }
    } else {
        ctx.body= 0
    }
});


async function testConnect(config) {
    try {
        switch (config.type.toString()) {
            case "1": {
                let queryData = await db.oracleProvider.query({
                    user: config.username,
                    password: config.password,
                    connectString: config.ipAddress + ":" + config.port + "/" + config.schemas
                }, 'select 1 VALUE from dual');
                return queryData.rows.length > 0;
                break;
            }
            case "2": {
                let queryData = await db.mssqlProvider.query({
                    host: config.ipAddress,
                    port: config.port,
                    user: config.username,
                    password: config.password,
                    database: config.schemas
                }, 'select 1 as VALUE');
                return queryData.recordset.length > 0;
                break;
            }
            case "3": {
                let queryData = await db.mysqlProvider.query({
                    host: config.ipAddress,
                    port: config.port,
                    user: config.username,
                    password: config.password,
                    database: config.schemas
                }, 'select 1 VALUE from dual', []);
                return queryData.length > 0;
                break;
            }
        }
    } catch (e) {
        return false
    }
}

async function createRealContent(templatePath, oid, type) {
    try {
        const sql = "select * from XS_CANVAS where OID =?";
        const resTable = await db.sqliteProvider.query(sql, [oid])
        if (resTable.length === 0) {
            return null;
        } else {
            const canvasOptionStr = resTable[0]["OPTIONS"];
            const canvasDataStr = resTable[0]["DATA"];
            const realContent = template(path.join(templatePath, type === "1" ? "index.art" : "src\\components\\HelloWorld.art"), {
                charts: canvasDataStr,
                options: canvasOptionStr
            });
            return realContent;
        }
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.track);
        return null;
    }
}

function copyDir(src, dist, callback) {
    try{
        if(!fs.existsSync(dist)){
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
        function _copy(err, src, dist) {
            const paths = fs.readdirSync(src)
            paths.forEach(function (path) {
                const _src = src + '/' + path;
                const _dist = dist + '/' + path;
                // 判断是文件还是目录
                if (fs.statSync(_src).isFile()) {
                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (fs.statSync(_src).isDirectory()) {
                    // 当是目录是，递归复制
                    copyDir(_src, _dist, callback)
                }
            })
        }
    }catch (err) {
        console.error(err.message)
        if(callback){
            callback()
        }
    }

}

async function createZip(dirPath,dirName){
    return compressing.zip.compressDir(dirPath, `download\\${dirName}.zip`)
}

function deleteDir(path) {
    let files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            const curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


module.exports = router;
