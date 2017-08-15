'use strict';

// had enabled by egg
// exports.static = true;

// 日志处理，默认按天切割
exports.logrotator = {
    enable: true,
    package: 'egg-logrotator'
}

// dev watch
exports.development = {
    enable: true,
    package: 'egg-development'
}
