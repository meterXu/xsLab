import oracledb from 'oracledb';
import mysql from 'mysql';
import mssql from 'mssql'

function oracleProvider() {
    this.query = async function (config, sql, success, error) {
        return new Promise((resolve, reject) => {
            oracledb.getConnection(
                {
                    user: config.username,
                    password: config.password,
                    connectString: config.connectString,
                },
                (err, connection) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        connection.execute(sql, (err, result) => {
                            if (err) {
                                console.error(err);
                                connection.close((err) => {
                                    if (err) {
                                        console.error(err);
                                        reject(err);
                                    }
                                });
                                reject(err);
                            }
                            connection.close((err) => {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                }
                            });
                            resolve(result);
                        });
                    }
                },
            );
        });

    };
}

function mysqlProvider() {
    this.query = async function (config, sql, params) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: config.ipaddress,
                port: config.port,
                user: config.username,
                password: config.password,
                schemas: config.schemas,
            });
            connection.connect((err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                connection.query(sql, params, (err, results, fields) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results);
                    connection.end((err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                    });
                });
            });
        });
    };
}

function mssqlProvider(){
    this.query = async function(config,sql){
        return new Promise(async (resolve, reject)=>{
            try{
                let pool = await mssql.connect('mssql://'+config.username+':'+config.password+'@'+config.ipaddress+':'+config.port+'/'+config.schemas);
                let result =await pool.request().query(sql);
                resolve(result);
                pool.close()
                mssql.close();
            }catch (e) {
                console.error(e);
                reject(e);
            }
        });

    }
}


function provider() {
    return {
        oracleProvider: new oracleProvider(),
        mysqlProvider: new mysqlProvider(),
        mssqlProvider:new mssqlProvider()
    };
}

export default new provider()
