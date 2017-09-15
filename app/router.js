'use strict'

// 每个业务路由模块需要在此注册
const home = require('./router/home')
const search = require('./router/search')
const user = require('./router/user')

module.exports = app => {
    home(app)
    search(app)
    user(app)
    // console.log('app@@@@@'.repeat(20))
    // console.log(app.router.stack)
}
