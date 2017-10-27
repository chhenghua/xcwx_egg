exports.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG'
}

// 中间件加载
// exports.middleware = ['limit', 'verify']
// exports.limit = {
//     match: '/*'
// }
// exports.verify = {
//     match: '/*'
// }

exports.middleware = ['logHandler']
exports.logHandler = {
    match: '/*'
}
