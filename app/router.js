'use strict';

// 每个业务路由模块需要在此注册
const home = require('./router/home')
const search = require('./router/search')

module.exports = app => {
    home(app)
    search(app)
};
