
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

const getTokenAndUrl = async ({req}) => {
    const url = `${req.url}.${req.method.toLowerCase()}`
    const authorization = req.header ? (req.header.Authorization || req.header.authorization) : ''
    if (!authorization || authorization.trim() === '') {
        return {
            url,
            token: ''
        }
    }
    const tokenArr = authorization.split(' ')
    if (tokenArr[0] !== 'Bearer') {
        return {
            url,
            token: ''
        }
    }
    return {
        url,
        token: tokenArr[1]
    }
}

// 检查token是否合法
const checkToken = async ({req}) => {
    const tokenAndUrl = await getTokenAndUrl({req})
    const token = tokenAndUrl.token
    if (token.trim() === '') {
        return {
            isLogined: false,
            token: ''
        }
    }

    try {
        const verfiyToken = await jwtToken.verifyToken({token: token})
        // if (token.data === req.session.userId) {
        return {
            isLogined: true,
            userId: verfiyToken.data,
            valid: true,
            token: token
        }
        // }
        delete req.session.userId
        return {
            isLogined: true,
            valid: false
        }
    } catch (e) {
        return {
            isLogined: true,
            errmsg: e.message,
            valid: false
        }
    }

}

// 检查是否需要登录, 默认需要登录
const checkLogin = async ({req}) => {

    const tokenAndUrl = await getTokenAndUrl({req})
    const url = tokenAndUrl.url
    let rules
    let needLogin = true
    if (urlMap.has(url)) {
        rules = urlMap.get(url)
        needLogin = !!rules.needLogin
    }
    return {
        needLogin: needLogin,
        url: url
    }

}

/**
 * 这里所做检查依次为:
 * 1.检查是否需要登录;
 * 2.检查token是否合法;
 * 3.检查访问频率.
 * @param req
 * @returns {Promise}
 */
exports.checks = function *(req) {
    return (async () => {
        // 检查是否需要登录
        const needLogin = await checkLogin({req})
        if (!needLogin.needLogin) {
            return {
                needLogin: false,
                valid: true
            }
        }
        // 检查token是否合法
        const getToken = await checkToken({req, url: needLogin.url})
        if (!getToken.valid) {
            return getToken
        }
        // 检查访问频率
        const limitRlt = await limit.checkLimit(getToken.token, needLogin.url)
        limitRlt.valid = getToken.valid
        limitRlt.errmsg = limitRlt.errmsg || getToken.errmsg
        limitRlt.needLogin = getToken.needLogin
        return limitRlt
    })()
}

exports.record = function *(req) {
    return (async () => {
        const tokenAndUrl = await getTokenAndUrl({req})
        return await limit.record(tokenAndUrl.token, tokenAndUrl.url)
    })()
}
