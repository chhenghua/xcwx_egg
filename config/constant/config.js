
exports.database = {
    database: 'orcl',
    username: 'dev_ydm',
    password: 'dev_ydm',
    options: {
        dialect: 'oracle',
        host: '192.168.0.21',
        port: 1521,
        pool: {
            maxConnections: 10,
            minConnections: 0,
            maxIdleTime: 30 * 1000
        },
        timezone: '+08:00'
    }
}

exports.mysqlConfig = {
    database: 'xcwx',
    user: 'root',
    password: 'rootoop',
    host: 'localhost',
    port: 3306,
    charset: 'utf8',
    timezone: '+08:00',
    connectionLimit: 300,
    queueLimit: 10 // default: 0
}

exports.keyAndIV = {
    key: 'H,GA(kv_m:.Eg%gsY8AG^VRbnCXt3_^U9aC)y|w$df$q=X?A*><O?PocQRyrZ@.i9T);Iv)%;+laG8j8rRbl5ro2S_rACNeKqYkv>vT/*ndNh$LespL2?,*n=nd,o(-<',
    iv: ''
}
