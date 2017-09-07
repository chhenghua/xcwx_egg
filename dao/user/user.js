
'use strict'

// const console = require('../../lib/log')

const {mysql} = require('../../db/mysql')

exports.getAll = async (connection = mysql) => {
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

exports.addOne = async ({id, username, gender}, connection = mysql) => {
    const sql = `
INSERT INTO
    test_user(_id, username, gender)
VALUES (?, ?, ?)
    `
    // const conditions = [id, username, gender]
    try {
        console.log(__FILE__, __LINE__, `sql: ${sql}`)
        // const rlt = await connection.query(sql, conditions)
        return Promise.resolve({})
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
