'use strict';

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1502767796263_9308';

    // add your config here

    // 异常处理
    config['middleware'] = ['errorHandler', 'logHandler'];
    config['errorHandler'] = {
        match: '/*'
    }

    // 日志切割处理
    // config['logrotator'] = {
    //     filesRotateByHour: [],
    //     filesRotateBySize: [],
    //     maxFileSize: 50 * 1024 * 1024,
    //     maxFiles: 10,
    //     rotateDuration: 60000,
    //     maxDays: 10
    // }

    // dev watch
    config['development'] = {
        watchDirs: ['../app/**', '../config', '../dao/**', '../db', '../lib/**'],
        ignoreDirs: [],
        fastReady: true,
        reloadOnDebug: true
    }

    config.logger = {
        consoleLevel: 'INFO',
        level: 'INFO'
    }

    config.security = {
        csrf: false
    }

    // config.redis = {
    //     host: '127.0.0.1',
    //     port: 6379,
    //     db: 0,
    //     password: ''
    // }

    config.session = {
        maxAge: 24 * 60 * 60 * 1000,
        key: 'EGG_SESSION',
        httpOnly: true,
        encrypt: true
    }

    return config;
};
