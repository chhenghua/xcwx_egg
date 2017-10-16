
'use strict'

const fs = require('fs')

const createDir = async (path) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                return resolve(false)
            }
            return resolve(true)
        })
    })
}

const writeData2FileSync = async (key, data) => {
    const path = `test/app/controller/${key}.test.js`

    await createDir('test/app/')
    await createDir('test/app/controller')
    fs.writeFileSync(path, data)
}

exports.writeFile = async (datas) => {
    for (let key in datas) {
        await writeData2FileSync(key, datas[key])
    }
}
