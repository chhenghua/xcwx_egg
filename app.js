'use strict'

// const orm = require('zbmy-orm')
const config = require('./config/constant/config')

module.exports = app => {
    // const dbconfig = config.database
    // Object.keys(dbconfig).forEach((key) => {
    //     orm.init(dbconfig[key])
    // })
    global.logger = app.loggers.logger
}
