
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

exports.addOne = async ({id, username, gender}, connection) => {
    const sql = `
INSERT INTO
    T_CHENGHUA_USER(ID, "username", "gender")
VALUES (?, ?, ?)
    `
    const conditions = [id, username, gender]
    try {
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve(rlt)
    } catch (e) {
        logger.info('addOneException: %s', e)
        return Promise.reject(e)
    }
}
