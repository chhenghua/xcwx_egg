
const {url} = require('../index')
const {subBarrels} = require('./index')
const {write2Array} = require('./writeArray')

return (async () => {
    await subBarrels([url])
    await write2Array(url)
})()


