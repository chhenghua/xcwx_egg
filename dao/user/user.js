
'use strict'

const {mysql} = require('../../db/mysql')

exports.getAll = async (connection = mysql) => {
    const sql = `
SELECT
    *
FROM 
    test_user
    `
    try {
        mylog.log(`sql: ${sql}`)
        const ret = await connection.query(sql)
        return Promise.resolve(ret)
    } catch (e) {
        logger.info('getAllException: %s', e)
        throw new Error(e)
    }
}

exports.addOne = async ({id, username, gender}, connection = mysql) => {
    const sql = `
INSERT INTO
    test_user(_id, username, gender)
VALUES (?, ?, ?)
    `
    try {
        mylog.log(`sql: ${sql}`)
        const conditions = [id, username, gender]
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve({})
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
