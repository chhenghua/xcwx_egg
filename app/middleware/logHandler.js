
'use strict'

const limit = require('./limit')

module.exports = () => {
    return function* logHandler(next) {
        const start = new Date()
        const request = this.request
        const method = request.method
        const url = request.url
        console.log(`Requests: ${url} ${method.toUpperCase()} start:`)
        const limitRlt = yield limit.checkLimit()
        try {
            if (limitRlt.isLimit) {
                console.log(limitRlt)
                return this.body = {
                    success: false,
                    remaining: limitRlt.remaining,
                    message: limitRlt.errmsg
                }
            }
            yield next
            const body = this.body
            logger.info({
                method: method,
                url: url,
                'Request body': request.body || null,
                time: (new Date() - start) + ' ms',
                'Response data': body
            })
        } catch (err) {
            this.app.emit('error', err, this)
            this.body = {
                success: false,
                message: this.app.config.env === 'prod' ? 'Internal Server Error' : err.message
            }
        } finally {
            yield limit.record()
            console.log(`Requests: ${url} ${method.toUpperCase()} finish.`)
        }
    }
}
