
'use strict'

exports.asyncForEach = async (iterator, func) => {
    for (let i = 0; i < iterator.length; i++) {
        await func(iterator[i])
    }
}
