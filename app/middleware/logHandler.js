
'use strict'

const limit = require('./limit')

module.exports = () => {
    return function* logHandler(next) {
        const start = new Date()
        const request = this.request
        const method = request.method
        const url = request.url
        console.log(`\nRequests: ${url} ${method.toUpperCase()} start:`)
        const checkRlt = yield limit.checks(request)
        try {
            if (!checkRlt.valid || checkRlt.needLogin) {
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
            if (checkRlt.isLimit) {
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
            yield limit.record(request)
            console.log(`Requests: ${url} ${method.toUpperCase()} finish.\n`)
        }
    }
}
