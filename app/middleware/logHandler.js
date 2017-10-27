
'use strict'

module.exports = () => {
    return function* logHandler(next) {
        const start = new Date()
        const request = this.request
        const method = request.method
        const url = request.url
        console.log(`\nRequests: ${url} ${method.toUpperCase()} start:`)
        try {
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
            console.log(`Requests: ${url} ${method.toUpperCase()} finish.\n`)
        }
    }
}
