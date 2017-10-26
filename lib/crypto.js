
'use strict'

const CryptoJS = require('crypto-js')
const {keyAndIV} = require('../config/constant/config')

exports.encrypt = (strData) => {
    const key = CryptoJS.enc.Utf8.parse(keyAndIV.key)
    const iv = CryptoJS.enc.Utf8.parse(keyAndIV.iv)

    const ciphertext = CryptoJS.AES.encrypt(strData, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB
    })
    const hash = CryptoJS.MD5(ciphertext.toString())
    return hash.toString()
}
