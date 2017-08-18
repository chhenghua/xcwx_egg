const path = require('path')

exports.database = [
    {
        dialect: "oracle",
        type: "all",
        database: "orcl",
        username: "dev_ydm",
        password: "dev_ydm",
        options: {
            host: '192.168.0.21',
            logging: false,
            pool: {
                maxConnection: 300,
                minConnection: 0,
                maxIdleTime: 30 * 1000
            },
            timezone: '+08:00',
            dialect: "oracle"
        },
        queue: true,
        maxConcurrentQueries: 150,
        modelPath: path.join(__dirname, '../../module')
    }
]
