
'use strict'

const db = require('oracledb')
const moment = require('moment')
const config = require('../../config/constant/config')
const dbconfig = config.database
db.outFormat = db.OBJECT
db.autoCommit = true

const getPool = async () => {
    return new Promise((resolve, reject) => {
        db.createPool({
            user: dbconfig.username,
            password: dbconfig.password,
            connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.0.21)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))`,
            poolMax: dbconfig.options.maxConnections,
            poolTimeout: 30
        }, (error, pool) => {
            if (error) {
                reject(error)
            } else {
                resolve(pool)
            }
        });
    })
}

const getConn = async (pool) => {
    return await db.getConnection(pool)
}

class Oracle {
    constructor(conn) {
        this.conn = conn
    }
    async rollback() {
        return new Promise((resolve, reject) => {
            this.conn.rollback((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db rollback success!------------------'))
                }
            })
        })
    }
    async commit() {
        return new Promise((resolve, reject) => {
            this.conn.commit((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db commit success!------------------'))
                }
            })
        })
    }
    async release() {
        return new Promise((resolve, reject) => {
            this.conn.close((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db release success!------------------'))
                }
            })
        })
    }
    async query(sql, params) {
        return new Promise((resolve, reject) => {
            this.conn.execute(sql, params, {metaData: true}, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }
}

const replaceSql = (sql, params) => {
    // sql = sql.replace(/\n/g, ' ')
    let val
    for (let i = 0; i < params.length; i++) {
        switch (typeof params[i]) {
            case 'number':
                val = params[i]
                break
            case 'string':
                val = `'${params[i]}'`
                break
            case 'object':
                if (params[i] instanceof Date) {
                    val = `to_date('${moment(params[i]).format('YYYY-MM-DD HH:mm:ss')}', 'yyyy-mm-dd hh24:mi:ss')`
                    break
                }
                if (!params[i]) {
                    val = null
                    break
                }
            default:
                val = JSON.parse(params[i])
        }
        sql = sql.replace(/:(\s*\w+)(?=[\{\[\,\]\}\)\(\s]?)/, val)
    }
    return sql
}

const executePrintSql = (sql) => {
    console.log(`${'#'.repeat(25)} Execute sql start ${'#'.repeat(25)}`)
    console.log(sql)
    console.log(`${'#'.repeat(25)} Execute sql end ${'#'.repeat(25)}`)
}

const printSql = (sql, params) => {
    if (params.length === 0) {
        return executePrintSql(sql)
    }
    return executePrintSql(replaceSql(sql, params))
}

exports.oracle = {
    query: async (sql, params) => {
        params = params || []
        const oracle = new Oracle(await getConn(await getPool()))
        printSql(sql, params)
        const rlt = await oracle.query(sql, params)
        await oracle.release()
        return rlt
    }
}

exports.getConnection = async () => {
    return new Oracle(await getConn(await getPool()))
}

