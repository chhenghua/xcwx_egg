
'use strict'

const {urlArray} = require('./urlArray')
const {subBarrels} = require('./index')

return (async () => {
    await subBarrels(urlArray)
})()
