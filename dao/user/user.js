
'use strict'

// const db = require('../../db/oracle').db
const debug = require('debug')('dao:user:user')

exports.getAll = async ({merchantId, type = "SELECT"}, connection) => {
    const sql = `
SELECT
    *
FROM 
    T_CHENGHUA_USER
    `
    try {
        const conditions = [merchantId]
        const ret = await connection.query(sql, {type, replacements: conditions})
        return Promise.resolve(ret)
    } catch (e) {
        debug('getAllException: %s', e)
        throw new Error(e)
    }
}

exports.addOne = async ({_id, username, gender, type = "INSERT"}, connection = db, transaction) => {
    const sql = `
INSERT INTO
    T_CHENGHUA_USER
VALUES (:_id, :username, :gender)
    `
    try {
        const conditions = {_id, username, gender}
        const ret = await connection.execute(sql, conditions)
        return Promise.resolve(ret)
    } catch (e) {
        logger.info('addOneException: %s', e)
        // throw new Error(e)          // 1
        return Promise.reject(new Error(e))    // 2
    }
}
