'use strict'

const Joi = require('joi')
const Util = require('../../utils')
const token = require('../middleware/token')

// 路由层完成参数的检验
module.exports = app => {
    class LoginController extends app.Controller {
        async loginIn() {

            // 首先定义需要校验的参数
            const schema = Joi.object().keys({
                username: Joi.string().required()
            })
            console.log(this.ctx.request.body)

            // 校验
            const {username} = Util.validate(this.ctx.request.body, schema)
            const rlt = await token.getToken(1234567)
            this.ctx.body = rlt
        }
    }

    return LoginController
}
