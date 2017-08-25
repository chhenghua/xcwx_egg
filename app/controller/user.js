'use strict';

const user = require('../service/user')
const Joi = require('joi')
const Util = require('../../utils')

// 路由层完成参数的检验
module.exports = app => {
    class UserController extends app.Controller {
        async getList() {

            // 首先定义需要校验的参数
            const schema = Joi.object().keys({
                name: Joi.number().required()
            })

            // 取得query参数
            const query = this.ctx.query

            // 校验
            const {name} = Util.validate(query, schema)
            const rlt = await user.getList({name})
            this.ctx.body = rlt
        };

        async getOne() {
            const schema = Joi.object().keys({
                userId: Joi.number().required()
            })
            const params = this.ctx.params
            const {userId} = Util.validate(params, schema)
            const rlt = await user.getOne({userId})
            this.ctx.body = rlt
        };

        async add() {
            const scheme = Joi.object().keys({
                username: Joi.string().required(),
                gender: Joi.string().required(),
                address: Joi.string().required()
            })
            const body = this.ctx.request.body
            const {username, gender, address} = Util.validate(body, scheme)
            const rlt = await user.add({username, gender, address})
            this.ctx.body = rlt
        }
    }

    return UserController;
};
