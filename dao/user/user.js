
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
VALUES (:id, :username, :gender)
    `
    const conditions = [id, username, gender]
    return new Promise((resolve, reject) => {
        connection.execute(sql, conditions, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result)
            }
        })
    })
}
