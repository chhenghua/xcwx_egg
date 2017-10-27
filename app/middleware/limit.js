
const limit = require('request-limit')

const jwtToken = require('./token')
const {verify} = require('./verify')

const urlMap = new Map()
urlMap.set('/api/user/getList.get', {limit: 20, interval: 20, needLogin: false})
urlMap.set('/api/user/add.post', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne.get', {limit: 2, interval: 2})
urlMap.set('/api/login.post', {limit: 2, interval: 20, needLogin: false})
urlMap.set('/api/sss.get', {needLogin: false})
urlMap.set('/api/search/index.post', {needLogin: false})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

const getTokenAndUrl = async ({req}) => {
    const url = `${req.url.split('?')[0]}.${req.method.toLowerCase()}`
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

/**
 * 检查访问频率.
 * @param req
 * @returns {Promise}
 */
const checks = function* (req) {
    return (async () => {
        // 检查访问频率
        return await limit.checkLimit('token', '/api/login.post')
    })()
}

const record = function* (req) {
    return (async () => {
        // const tokenAndUrl = await getTokenAndUrl({req})
        return await limit.record('token', '/api/login.post')
    })()
}

/**
 * 检查访问频率.
 * @param req
 * @returns {Promise}
 */
module.exports = () => {
    return function* logHandler(next) {
        const start = new Date()
        const request = this.request
        const method = request.method
        const url = request.url
        console.log(`\nRequests: ${url} ${method.toUpperCase()} start:`)
        const checkRlt = yield checks(request)
        try {
            if (checkRlt.isLimit) {
                logger.info({
                    'method': method,
                    'url': url,
                    'Request body': request.body || null,
                    'time': (new Date() - start) + ' ms',
                    'Response data': checkRlt
                })
                this.response.status = 401
                this.body = checkRlt
                return
            }
            yield next
            const body = this.body
            logger.info({
                'method': method,
                'url': url,
                'Request body': request.body || null,
                'time': (new Date() - start) + ' ms',
                'Response data': body
            })
        } catch (err) {
            this.app.emit('error', err, this)
            this.body = {
                success: false,
                message: this.app.config.env === 'prod' ? 'Internal Server Error' : err.message
            }
        } finally {
            yield record(request)
            console.log(`Requests: ${url} ${method.toUpperCase()} finish.\n`)
        }
    }
}
