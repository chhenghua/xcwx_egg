
'use strict'

exports.generateNonceString = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const maxPos = chars.length
    let nonceStr = ''
    for (let i = 0; i < length; i++) {
        nonceStr = `${nonceStr}${chars[Math.floor(Math.random() * maxPos)]}`
    }
    return nonceStr
}
