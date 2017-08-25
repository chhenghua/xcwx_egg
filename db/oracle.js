'use strict'

// const Sequelize = require('cu8-sequelize-oracle')
// const config = require('../config/constant/config')
//
// const dbconfig = config.database
//
// const db = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.options)
//
// exports.db = db


const db = require('oracledb')
const config = require('../config/constant/config')
const dbconfig = config.database

const getPool = async () => {
    return new Promise((resolve, reject) => {
        db.createPool({
            user: dbconfig.username,
            password: dbconfig.password,
            connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.0.21)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))`,
            poolMax: dbconfig.options.maxConnections,
            poolTimeout: 30
        }, (error, pool) => {
            if (error) {
                reject(error)
            } else {
                resolve(pool)
            }
        });
    })
}

exports.getPool = getPool
