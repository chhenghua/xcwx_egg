const Joi = require('joi')
const util = require('util')

exports.validate = (value, schema) => {
    if (null === value) {
        throw new Error('参数检查的参数须为json')
    }
    const rlt = Joi.validate(value, schema)
    if (util.isNull(rlt.error)) {
        return rlt.value
    } else {
        throw new Error(rlt.error)
    }
}
