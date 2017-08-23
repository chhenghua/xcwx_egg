
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
