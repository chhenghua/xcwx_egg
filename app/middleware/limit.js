
const limit = require('../../../request-limit/lib/limit')

const urlMap = new Map()
urlMap.set('/api/user/getList', {limit: 2, interval: 20})
urlMap.set('/api/user/add', {limit: 2, interval: 2})
urlMap.set('/api/user/getOne', {limit: 2, interval: 2})

limit.init(urlMap, {
    store: {
        host: '127.0.0.1',
        port: 6379
    }
})

module.exports = limit
