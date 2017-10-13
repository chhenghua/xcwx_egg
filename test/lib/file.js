
'use strict'

const fs = require('fs')

const writeData2FileSync = async (key, data) => {
    const path = `test/app/controller/${key}.test.js`
    fs.writeFileSync(path, data)
}

exports.writeFile = async (datas) => {
    for (let key in datas) {
        await writeData2FileSync(key, datas[key])
    }
}
