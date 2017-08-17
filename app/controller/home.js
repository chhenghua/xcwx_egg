'use strict';

const user = require('../service/user')

// 路由层完成参数的检验
module.exports = app => {
    class HomeController extends app.Controller {
        async index() {
            const rlt = await user.find({e: 'a', d: 'e'})
            this.ctx.body = rlt
        }
    }

    return HomeController;
};
