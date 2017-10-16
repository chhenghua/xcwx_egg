
'use strict'

const {writeFile} = require('./file')

const setHttpMethod = (item) => {
    const method = item.method.toLowerCase()
    let itData = `    it('should ${method.toUpperCase()} ${item.url}', () => {\n`
    itData = `${itData}        return app.httpRequest()\n`
    itData = `${itData}            .${method === 'get' || method === 'head' ? 'get' : method}('${item.url}')\n`
    switch (item.method.toLowerCase()) {
        case 'get':
        case 'head':
            itData = `${itData}            .query(${JSON.stringify(item.params)})\n`
            break
        default:
            itData = `${itData}            .send(${JSON.stringify(item.params)})\n`
    }
    itData = `${itData}            .expect(200)\n`
    itData = `${itData}    })\n`
    return itData
}

exports.dataSet = async ({controllerKey, controllerMap}) => {
    const datas = {}
    controllerKey.forEach((each) => {
        let fileData = `'use strict'\n\r`
        fileData = `${fileData}const {app} = require('egg-mock/bootstrap')\n\r`
        fileData = `${fileData}describe('test/app/controller/${each}.test.js', () => {\n`
        controllerMap.get(each).forEach((item) => {
            const itData = setHttpMethod(item)
            fileData = `${fileData}${itData}`
        })
        fileData = `${fileData}})\n\r`
        datas[`${each}`] = fileData
    })
    await writeFile(datas)
}
