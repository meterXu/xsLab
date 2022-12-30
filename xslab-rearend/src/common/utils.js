import db from "./provider.js";
import template from "art-template";
import path from "path";
import fs from "fs";
import compressing from "compressing";

function Utils(){
    this.createRealContent=async function (templatePath, id, type) {
        try {
            const sql = "select * from XS_CANVAS where OID =?";
            const resTable = await db.sqliteProvider.query(sql, [id])
            if (resTable.length === 0) {
                return null;
            } else {
                const canvasOptionStr = resTable[0]["OPTIONS"];
                const canvasDataStr = resTable[0]["DATA"];
                const realContent = template(path.join(templatePath, type === 1 ? "index.art" : "src\\components\\HelloWorld.art"), {
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

    this.copySync=function (src, dist) {
        const paths = fs.readdirSync(src)
        for(let i =0;i<paths.length;i++){
            const _src = src + '/' + paths[i];
            const _dist = dist + '/' + paths[i];
            // 判断是文件还是目录
            if (fs.statSync(_src).isFile()) {
                const con = fs.readFileSync(_src)
                fs.writeFileSync(_dist, con);
            } else if (fs.statSync(_src).isDirectory()) {
                // 当是目录是，递归复制
                this.copyDirSync(_src, _dist)
            }
        }
    }

    this.copyDirSync=function (src, dist) {
        if(!fs.existsSync(dist)){
            fs.mkdirSync(dist);
        }
        this.copySync(src, dist);
    }

    this.createZip=async function (dirPath,dirName){
        return compressing.zip.compressDir(dirPath, `download\\${dirName}.zip`)
    }

    this.deleteDir = function (path) {
        let files = [];
        if(fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
                const curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    this.deleteDir(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    this.testConnect=async function (config) {
        try {
            switch (config.type) {
                case 1: {
                    let queryData = await db.oracleProvider.query({
                        user: config.username,
                        password: config.password,
                        connectString: config.ipAddress + ":" + config.port + "/" + config.schemas
                    }, 'select 1 VALUE from dual');
                    return queryData.rows.length > 0;
                    break;
                }
                case 2: {
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
                case 3: {
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

export default new Utils()