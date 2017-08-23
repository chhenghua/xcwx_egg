'use strict'
const db = require('oracledb')
const config = require('../config/constant/config')
const dbconfig = config.database

const createPool = async () => {
    const pool = await db.createPool({
        user: dbconfig.username,
        password: dbconfig.password,
        connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.0.21)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))`,
        poolMax: dbconfig.options.maxConnections,
        poolTimeout: 30
    })
    return pool
}

const getConnection = async () => {
    console.log('1111111111111111111')
    const pool = await createPool()
    return await pool.getConnection()
}

exports.transaction = async (operation) => {

    const connection = await getConnection();

    try {
        const result = await operation(connection)
        await connection.commit()
        return Promise.resolve(result)
    } catch (e) {
        await connection.rollback()
        throw new Error(e)
    } finally {
        connection.close()
        connection.release()
    }

    // console.log(db.connectionManager.getConnection())
    // const connection = await db.connectionManager.connect()
    // const transaction = await db.transaction(db)
    // try {
    //     // await connection.beginTransaction()
    //     const ret = await operation(db, transaction)
    //     await connection.commit()
    //     return Promise.resolve(ret)
    // } catch (e) {
    //     await connection.rollback()
    //     return Promise.reject(e)
    // } finally {
    //     await connection.release()
    // }

    // return db.transaction(transaction => {
    //     operation(db, transaction)
    // }).then(result => {
    //     return Promise.resolve(result)
    // }).catch(err => {
    //     return Promise.reject(new Error(err))
    //     console.log(err)
    // })

    // const transaction = await db.transaction(db, {autocommit: false})
    // try {
    //     // const conn = transaction.connection
    //
    //     // await transaction.begin()
    //     const result = await operation(db, transaction)
    //     await transaction.commit()
    //     return Promise.resolve(result)
    // } catch (e) {
    //     await transaction.rollback()
    //     // throw new Error(e)                      // 1.
    //     return Promise.reject(new Error(e))     // 2.
    // // auto release the connection
    // } /*finally {
    //     await transaction.cleanup()
    // }*/




}
