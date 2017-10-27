
const {dataSet} = require('./dataSet')

exports.subBarrels = async (urlArray) => {

    const controllerMap = new Map()
    const controllerKey = []
    const urlMap = {}

    // 对controller进行分桶
    urlArray.forEach((each) => {
        if (!controllerMap.has(each.controller)) {
            controllerMap.set(each.controller, [])
            controllerKey.push(each.controller)
        }
        const getValue = controllerMap.get(each.controller)
        if (!urlMap[`${each.url}.${each.method.toLowerCase()}`]) {
            getValue.push(each)
            urlMap[`${each.url}.${each.method.toLowerCase()}`] = true
        }
        controllerMap.set(each.controller, getValue)
    })
    await dataSet({controllerKey, controllerMap})
}
