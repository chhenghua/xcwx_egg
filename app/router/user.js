'use strict'

// 某个具体的业务模块

module.exports = app => {

    // 在定义路由的时候需要写注释清楚路由的业务功能
    app.get('/api/user/getList', 'user.getList')
    app.get('/api/user/:userId', 'user.getOne')
    app.post('/api/user/add', 'user.add')
}
