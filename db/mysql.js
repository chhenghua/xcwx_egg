'use strict'

const config = require('../config/constant/config')
const mysql = require('mysql')
const mysqlConfig = config.mysqlConfig

const pool = mysql.createPool(mysqlConfig)

const getConn = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            } else {
                logger.info('--------db getConn success----------------')
                resolve(conn)
            }
        })
    })
}

class MySql {
    constructor(conn) {
        this.conn = conn
    }
    async commit() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.commit((err) => {
                if (err) {
                    return reject(err)
                }
                return resolve(logger.info('--------db commit  success----------------'))
            })
        })
    }
    async rollback() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.rollback((error) => {
                if (error) {
                    return reject(error)
                }
                return resolve(logger.info('--------db rollback success---------------'))

            })
        })
    }
    async release() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.release()
            return resolve(logger.info('--------db release success----------------'))
        })
    }
    async query(sql, conditions) {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.query(sql, conditions, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)

            })
        })
    }
    async beginTransaction() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.beginTransaction((err) => {
                if (err) {
                    return reject(err)
                }
                return resolve(logger.info('--------db begin transaction -------------'))

            })
        })
    }
}

exports.getConnection = async () => {
    return new MySql(await getConn())
}

exports.mysql = {
    query: async (sql, conditions) => {
        const mysql = new MySql(await getConn())
        const rlt = await mysql.query(sql, conditions)
        await mysql.release()
        return rlt
    }
}
