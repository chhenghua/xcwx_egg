
'use strict'
const fs = require('fs')

const urlArrayPath = 'test/lib/urlArray.js'

exports.write2Array = async (url) => {
    const fileArray = fs.readFileSync(urlArrayPath, 'utf8')
    let urlArray
    let prefix
    if (!fileArray) {
        urlArray = []
        prefix = 'exports.urlArray'
    } else {
        const fileSplit = fileArray.split(' = ')
        urlArray = fileSplit[1]
        prefix = fileSplit[0]
    }
    urlArray = typeof urlArray === 'string' ? JSON.parse(urlArray) : urlArray
    urlArray.push(url)
    urlArray = JSON.stringify(urlArray)
    urlArray = urlArray.replace(/},{/g, '},\n{')
    const data = `${prefix} = ${urlArray}`
    fs.writeFileSync(urlArrayPath, data)
}
