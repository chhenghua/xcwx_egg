
'use strict'

const {MySql} = require('../../db/mysql')

exports.getAll = async (connection = MySql) => {
    const sql = `
SELECT
    *
FROM 
    test_user
    `
    try {
        const ret = await connection.query(sql)
        return Promise.resolve(ret)
    } catch (e) {
        logger.info('getAllException: %s', e)
        throw new Error(e)
    }
}

exports.addOne = async ({id, username, gender}, connection) => {
    const sql = `
INSERT INTO
    test_user(_id, username, gender)
VALUES (?, ?, ?)
    `
    const conditions = [id, username, gender]
    try {
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve(rlt)
    } catch (e) {
        logger.info('addOneException: %s', e)
        throw new Error(e)
    }
}
