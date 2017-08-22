
'use strict'

const connection = require('cu8-sequelize-oracle')
const debug = require('debug')('dao:user:user')

exports.getAll = async ({merchantId}, transaction = null) => {
    const sql = `
SELECT
    *
FROM 
    A_ALIPAY_ORDER
WHERE
    MERCHANT_ID = ?
    `
    try {
        const conditions = [merchantId]
        const ret = await connection.query(sql, {type: "SELECT", replacements: conditions, transaction})
        return Promise.resolve(ret)
    } catch (e) {
        debug('getAllException: %s', e)
        throw new Error(e)
    }
}
