
'use strict'

const request = require('request')
const crypto = require('crypto')
const qs = require('querystring')
const stringUtil = require('./stringUtil')

const AppID = 1106388406
const AppKey = 'M9NBO6J1MHnnQhix'
const urlPrefix = 'https://api.ai.qq.com/fcgi-bin/ocr/'

const ocrType = {
    general: 'ocr_generalocr'
}

const getSign = function(image, time_stamp, nonce_str) {
    const concatStr = 'app_id=' + AppID +
                      '&image=' + encodeURIComponent(image) +
                      '&nonce_str=' + nonce_str +
                      '&time_stamp=' + time_stamp +
                      '&app_key=' + AppKey
    const md5 = crypto.createHash('md5')

    const sign = md5.update(concatStr.trim()).digest('hex').toUpperCase()
    return sign
}

const setBody = function(image) {

    const time_stamp = parseInt(new Date().getTime() / 1000)
    const nonce_str = stringUtil.generateNonceString(20)
    const sign = getSign(image, time_stamp, nonce_str)

    const body = {
        'app_id': AppID,
        'time_stamp': time_stamp,
        'nonce_str': nonce_str,
        'sign': sign,
        'image': image
    }
    return qs.stringify(body)
}

const send = async (image, type) => {
    const body = setBody(image)

    return new Promise((resolve, reject) => {
        request({
            url: urlPrefix + ocrType[type],
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Host': 'api.ai.qq.com',
                'User-Agent': 'Mozilla (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
            },
            body,
            json: false
        }, (err, res, body) => {
            if (err) {
                return reject(err)
            }
            if (res.statusCode !== 200) {
                return reject({
                    result: -1,
                    errmsg: 'http code' + res.statusCode
                })
            }
            body = typeof body === 'string' ? JSON.parse(body) : body
            return resolve(body)
        })
    })
}

module.exports = async (image) => {
    const type = 'general'
    return await send(image, type)
}
