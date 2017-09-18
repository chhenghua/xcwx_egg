
const limit = require('request-limit')

const jwtToken = require('./token')

const urlMap = new Map()
urlMap.set('/api/user/getList.get', {limit: 2, interval: 20, needLogin: true})
urlMap.set('/api/user/add.post', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne.get', {limit: 2, interval: 2})
urlMap.set('/api/login.post', {needLogin: false})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

const checkToken = async ({req, url}) => {
    const authorization = req.header ? req.header.Authorization || req.header.authorization : ''
    if (authorization.trim() === '') {
        return {
            isLogined: false,
            token: ''
        }
    }
    const tokenArr = authorization.split(' ')
    if (tokenArr[0] !== 'Bearer') {
        return {
            isLogined: false,
            token: ''
        }
    }
    let token
    try {
        token = await jwtToken.verifyToken({token: tokenArr[1]})
        return {
            isLogined: true,
            userId: token.data,
            valid: true
        }
    } catch (e) {
        return {
            isLogined: true,
            errmsg: e.message,
            valid: false
        }
    }

}

// 首先检查是否需要登录
const checkLogin = async (req) => {

    const url = `${req.url}.${req.method.toLowerCase()}`
    let rules
    let needLogin = true
    if (urlMap.has(url)) {
        rules = urlMap.get(url)
        needLogin = rules.needLogin === false ? rules.needLogin : true
    }
    return {
        needLogin: needLogin,
        url: url
    }

}

exports.checks = function *(req) {
    return (async () => {
        const needLogin = await checkLogin(req)
        if (!needLogin.needLogin) {
            return {
                needLogin: false
            }
        }
        const getToken = await checkToken({req, url: needLogin.url})
        const limitRlt = await limit.checkLimit('token111', '/api/user/getList.get')
        limitRlt.valid = getToken.valid
        limitRlt.errmsg = limitRlt.errmsg || getToken.errmsg
        return limitRlt
    })()
}

exports.record = function *(req) {
    return (async () => {
        return await limit.record('token111', '/api/user/getList.get')
    })()
}
