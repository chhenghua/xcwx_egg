const db = require('./oracle')

const getPoolConnection = async () => {
    const pool = await db.getPool()
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) => {
            if (error) {
                reject(error)
            } else {
                resolve(conn)
            }
        })
    })
}

class GetConnection {
    constructor(conn) {
        this.conn = conn
    }
    commit() {
        return new Promise((resolve, reject) => {
            this.conn.commit((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db commit success!------------------'))
                }
            })
        })
    };
    rollback() {
        return new Promise((resolve, reject) => {
            this.conn.rollback((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db rollback success!------------------'))
                }
            })
        })
    };
    close() {
        return new Promise((resolve, reject) => {
            this.conn.close((error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(logger.info('-----------db release success!------------------'))
                }
            })
        })
    };
}

// GetConnection.prototype.commit = async () => {
//     let self = this
//     return new Promise((resolve, reject) => {
//         self.conn.commit((error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(logger.info('-----------db commit success!------------------'))
//             }
//         })
//     })
// }
//
// GetConnection.prototype.rollback = async () => {
//     let self = this
//     return new Promise((resolve, reject) => {
//         self.conn.rollback((error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(logger.info('-----------db rollback success!------------------'))
//             }
//         })
//     })
// }
//
// GetConnection.prototype.close = async () => {
//     let self = this
//     return new Promise((resolve, reject) => {
//         self.conn.close((error) => {
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(logger.info('-----------db release success!------------------'))
//             }
//         })
//     })
// }

module.exports = async () => {
    return new GetConnection(await getPoolConnection())
}
