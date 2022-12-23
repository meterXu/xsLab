import db from "./provider.js";
import template from "art-template";
import path from "path";
import fs from "fs";
import compressing from "compressing";

export class Utils{
    constructor() {}
    static async createRealContent(templatePath, oid, type) {
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

    static copyDir(src, dist, callback) {
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

    static async createZip(dirPath,dirName){
        return compressing.zip.compressDir(dirPath, `download\\${dirName}.zip`)
    }

    static deleteDir(path) {
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

    static async testConnect(config) {
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
}