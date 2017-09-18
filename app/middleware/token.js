
'use strict'

const jwt = require('jsonwebtoken')

const expire = 30 * 1000 * 60

const secret = 'secretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecret'

exports.getToken = async (userId) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            data: userId.toString(),
            algorithm: 'HS512'
        }, secret, {expiresIn: expire}, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

exports.verifyToken = async ({token}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {algorithm: 'HS512'}, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}
