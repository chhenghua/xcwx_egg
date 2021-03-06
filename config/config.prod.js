exports.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG'
    // 这里可以自定义日志路径
    // dir: ''
}

exports.cluster = {
    listen: {
        port: 7001,
        hostname: '127.0.0.1',
        workers: 2
    }
}

// 中间件加载: 这里按顺序加载
exports.middleware = ['limit', 'verify']
exports.limit = {
    match: '/*'
}
exports.verify = {
    match: '/*'
}
