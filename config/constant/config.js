
exports.database = {
    database: "orcl",
    username: "dev_ydm",
    password: "dev_ydm",
    options: {
        dialect: "oracle",
        host: "192.168.0.21",
        port: 1521,
        pool: {
            maxConnections: 10,
            minConnections: 0,
            maxIdleTime: 30 * 1000,
        },
        timezone: '+08:00',
    }
}

exports.mysqlConfig = {
    database: "xcwx",
    user: "root",
    password: "rootoop",
    host: "localhost",
    port: 3306,
    charset: "utf8",
    timezone: "+08:00",
    connectionLimit: 300,
    queueLimit: 10          // default: 0
}
