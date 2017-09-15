
const limit = require('request-limit')

const urlMap = new Map()
urlMap.set('/api/user/getList.get', {limit: 2, interval: 20})
urlMap.set('/api/user/add.post', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne.get', {limit: 2, interval: 2})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

exports.checkLimit = function *(req) {
    return (async () => {
        return await limit.checkLimit('token111', '/api/user/getList.get')
    })()
}

exports.record = function *(req) {
    return (async () => {
        return await limit.record('token111', '/api/user/getList.get')
    })()
}
