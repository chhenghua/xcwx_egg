'use strict'

// const orm = require('zbmy-orm')
// const config = require('./config/constant/config')
const log = require('tracer').console({
    format: "{{timestamp}} <{{title}}> <{{path}}> in row {{line}}: {{message}}",
    dateformat: "yyyy-mm-dd HH:MM:ss,l"
})

module.exports = (app) => {
    // const dbconfig = config.database
    // Object.keys(dbconfig).forEach((key) => {
    //     orm.init(dbconfig[key])
    // })
    global.logger = app.logger
    global.mylog = log
}
