module.exports = (app) => {
    return function* logHandler(next) {
        try {
            const start = new Date()
            const request = this.request
            console.log(request)
            yield next;
            const body = this.body
            // console.log(this.app.loggers.logger.info('ssssssss'))
            app.loggers.logger.info(`Request body: ${body}`)
        } catch (err) {
            this.app.emit('error', err, this);
            this.body = {
                success: false,
                message: this.app.config.env === 'prod' ? 'Internal Server Error' : err.message
            };
        }
    }
}