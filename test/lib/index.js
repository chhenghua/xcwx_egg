
const {dataSet} = require('./dataSet')
const urlArray = require('../index').url

const controllerMap = new Map()
const controllerKey = []

// 对controller进行分桶
urlArray.forEach((each) => {
    if (!controllerMap.has(each.controller)) {
        controllerMap.set(each.controller, [])
        controllerKey.push(each.controller)
    }
    const getValue = controllerMap.get(each.controller)
    getValue.push(each)
    controllerMap.set(each.controller, getValue)
})

return (async () => {
    await dataSet({controllerKey, controllerMap})
})()
