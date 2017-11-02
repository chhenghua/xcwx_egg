
'use strict'

const oracle = require('./oracle')

exports.transaction = async (operation) => {

    const connection = await oracle.getConnection()
    try {
        // await connection.beginTransaction()
        const rlt = await operation(connection)
        await connection.commit()
        return Promise.resolve(rlt)
    } catch (e) {
        await connection.rollback()
        return Promise.reject(e)
    } finally {
        await connection.release()
    }

}
