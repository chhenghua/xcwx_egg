'use strict'
const connection = require('./connection')()

exports.transaction = async (operation) => {
    console.log('connection...........')
    console.log(connection)

    try {
        const result = await operation(connection.conn)
        await connection.commit()
        return Promise.resolve(result)
    } catch (e) {
        console.log('eeeeeeeeeeeeeeee')
        console.log(e)
        await connection.rollback()
        return Promise.reject(e)
    } finally {
        await connection.close()
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
