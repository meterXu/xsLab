import oracledb from 'oracledb';
import mysql from 'mysql';
import sqlite3 from 'sqlite3';
import mssql from 'mssql'
import fs from 'fs';







const db = new sqlite3.Database('db/xscollect.db');

function readSql() {
    return new Promise((resolve, reject) => {
        let sqls = [];
        try {
            fs.readFile('db/xs_canvas.sql', (error, data) => {
                if (error) {
                    throw error
                }
                if (data) {
                    sqls.push(data.toString())
                    fs.readFile('db/xs_database.sql', (error, data) => {
                        if (error) {
                            throw error
                        }
                        if (data) {
                            sqls.push(data.toString())
                        }
                        if (resolve) {
                            resolve(sqls)
                        }
                    })
                }
            });
        } catch (e) {
            if (reject) {
                reject(e)
            }
        }

    })
}

readSql().then(c => {
    c.forEach(sql => {
        db.run(sql)
    });
});


function oracleProvider() {
    this.query = async function (config, sql, success, error) {
        return new Promise((resolve, reject) => {
            oracledb.getConnection(
                {
                    user: config.user,
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
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
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
        return new Promise((resolve, reject)=>{
            (async function(){
                try{
                    let pool = await mssql.connect('mssql://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/'+config.database);
                    let result =await pool.request().query(sql);
                    resolve(result);
                    pool.close()
                    mssql.close();
                }catch (e) {
                    console.error(e);
                    reject(e);
                }
            })()
        });

    }
}

function sqliteProvider() {
    this.query = async function (sql, params) {
        return new Promise((resolve, reject) => {
            db.all(sql, params, function (err, rows) {
                if (err) {
                    console.error(err);
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    };

    this.exec = async function (sql, params) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        lastId: this.lastID,
                        changes: this.changes
                    })
                }
            })
        })
    };
}

function provider() {
    return {
        oracleProvider: new oracleProvider(),
        mysqlProvider: new mysqlProvider(),
        mssqlProvider:new mssqlProvider(),
        sqliteProvider: new sqliteProvider()
    };
}

export default new provider()
