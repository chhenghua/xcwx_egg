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
                } else {
                    return resolve(logger.info('--------db commit success-----------------'))
                }
            })
        })
    }
    async rollback() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.rollback((error) => {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(logger.info('--------db rollback success---------------'))
                }
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
                } else {
                    return resolve(result)
                }
            })
        })
    }
    async beginTransaction() {
        const conn = this.conn
        return new Promise((resolve, reject) => {
            conn.beginTransaction((err) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(logger.info('--------db begin transaction -------------'))
                }
            })
        })
    }
}

// exports.getConn = async () => {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, conn) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(conn)
//             }
//         })
//     })
// }
//
// MySQL.prototype.getConnection = async () => {
//     this.conn = await getConn()
// }
//
// MySQL.prototype.commit = async () => {
//     const conn = this.conn
//     return new Promise((resolve, reject) => {
//         conn.commit((err) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(logger.info('--------db commit success-------------'))
//             }
//         })
//     })
// }
//
// MySQL.prototype.rollback = async () => {
//     const conn = this.conn
//     return new Promise((resolve, reject) => {
//         conn.rollback((error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(logger.info('--------db rollback success-------------'))
//             }
//         })
//     })
// }
//
// MySQL.prototype.release = async () => {
//     const conn = this.conn
//     return new Promise((resolve, reject) => {
//         conn.release((error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(logger.info('--------db release success-------------'))
//             }
//         })
//     })
// }
//
// MySQL.prototype.query = async (sql, conditions) => {
//     const conn = this.conn
//     return new Promise((resolve, reject) => {
//         conn.query(sql, conditions, (err, result) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(result)
//             }
//         })
//     })
// }
//
// MySQL.prototype.beginTransaction = async () => {
//     const conn = this.conn
//     return new Promise((resolve, reject) => {
//         conn.beginTransaction((err) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(logger.info('--------db begin transaction -------------'))
//             }
//         })
//     })
// }

module.exports = async () => {
    return new MySql(await getConn())
}
