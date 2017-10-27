
'use strict'

const {encrypt} = require('../../lib/crypto')

const getParamsFromJSON = (params) => {
    const keys = []
    params = typeof params === 'string' ? JSON.parse(params) : params
    for (let key in params) {
        keys.push(key)
    }
    return {
        verify: !!keys.length,
        keys: keys.sort(),
        paramsMap: params
    }
}

const getParamsFromString = (params) => {
    try {
        params = JSON.parse(params)
        return getParamsFromJSON(params)
    } catch (e) {
    }
    const array = params.split('&')
    const keys = []
    const paramsMap = {}
    array.forEach(item => {
        const every = item.split('=')
        keys.push(every[0])
        paramsMap[item[0]] = item[1]
    })
    return {
        verify: !!keys.length,
        keys: keys.sort(),
        paramsMap
    }
}

const getParamsFromArray = (params) => {
    const keys = []
    const paramsMap = {}
    for (let i = 0; i < params.length; i++) {
        if (i % 2 === 0) {
            keys.push(params[i])
            paramsMap[params[i]] = params[i + 1]
        }
    }
    return {
        verify: !!keys.length,
        keys: keys.sort(),
        paramsMap
    }
}

const getParams = (params) => {
    const type = typeof params
    let sortedParams
    switch (type) {
        case 'string':
            sortedParams = getParamsFromString(params)
            break
        default:
            if (Array.isArray(params)) {
                sortedParams = getParamsFromArray(params)
            } else {
                sortedParams = getParamsFromJSON(params)
            }
    }
    return sortedParams
}

const getSortedString = (keys, paramsMap) => {
    let sortedString = ``
    keys.forEach(key => {
        if (key !== 'sign') {
            sortedString = `${sortedString}&${key}=${paramsMap[key]}`
        }
    })
    return sortedString.substring(1)
}

const verify = (params) => {
    if (!params) {
        return {
            verify: false
        }
    }
    const keysAndParams = getParams(params)
    if (!keysAndParams.verify) {
        return {
            verify: false
        }
    }
    const paramsSign = keysAndParams.paramsMap.sign
    const validSign = encrypt(getSortedString(keysAndParams.keys, keysAndParams.paramsMap))
    return {
        verify: paramsSign === validSign
    }
}

/**
 * 参数验证.
 * @param req
 * @returns {Promise}
 */
module.exports = () => {
    return function* logHandler(next) {
        const request = this.request
        const signParams = request.query.sign ? request.query : request.body
        const checkRlt = verify(signParams)
        try {
            if (!checkRlt.verify) {
                this.response.status = 401
                this.body = checkRlt
                return
            }
            delete request.query.sign
            delete request.body.sign
            yield next
        } catch (err) {
            this.app.emit('error', err, this)
            this.body = {
                success: false,
                message: this.app.config.env === 'prod' ? 'Internal Server Error' : err.message
            }
        }
    }
}
