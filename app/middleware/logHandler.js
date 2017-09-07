module.exports = () => {
    return function* logHandler(next) {
        try {
            const start = new Date()
            const request = this.request
            yield next
            const body = this.body
            logger.info({
                method: request.method,
                url: request.url,
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
        }
    }
}
