module.exports = () => {
    return function* errorHandler(next) {
        try {
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
