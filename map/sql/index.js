'use strict'

const _ = require('lodash')
const util = require('util')
const map = require('./map')
const $ = require('zbmy-orm')

const functions = {
    CIF: (isDone, done, ntdone) => {
        return isDone ? done : ntdone || null
    },
    CFOR: (collection, open, separator, close) => {
        if (!util.isArray(collection)) {
            return ""
        }
        let result = open
        for (const key in collection) {
            if (key + 1 === collection.length) {
                result += ` ${collection[key] ${close}}`
                break
            }
            result += ` ${collection[key] ${separator}}`
        }
        return result
    }
}

class SqlBase {
    constructor(options) {
        this._params = {}
        this._type = typeof options.type === 'string' ? options.type.toUpperCase() : options.type
        this._name = typeof options.name === 'string' ? options.name.toUpperCase(): options.name
        this._isPagination = options.isPagination || false
        this._pool = {}
        this._sqlworker = null
    }

    init(self) {
        if (!self._type || !self._name) {
            logger.info('------------sqlmap params is null---------------')
            return "SELECT 1"
        }
        self._sqlworker = map[self._type][self._name]
        let sql = typeof self._sqlworker !== 'function' ? self._sqlworker : self._sqlworker(_.assign(self._pool, functions))
        if (self._isPagination) {
            sql = doPagination(sql, self._type)
        }
        return sql
    }

    done(params) {
        if (typeof params !== 'object') {
            return this.init(this)
        }
        for (const key of params) {
            Object.defineProperty(this._pool, key, {value: params[key]})
        }
        return this.init(this)
    }
}

exports.getSql = async ({type = "SELECT", name, isPagination}) => {
    let base = new SqlBase({type, name, isPagination})
    return {
        done: async (params) => {
            const buffer = base.done(params)
            base = null
            return buffer
        }
    }
}

exports.getOption = async ({params, type}) => {
    return {
        replacements: params,
        type: type || 'SELECT'
    }
}

exports.exec = async ({sql, options}) => {
    return new Promise((resolve, reject) => {
        logger.info(`SQL: ${sql}`)
        $('test_chenghua_user').invokeSQL(sql, options, (err, result) => {
            if (err) {
                logger.info(`ERROR: ${err}`)
                return reject(err)
            } else {
                logger.info(`result: ${result}`)
                return resolve(result)
            }
        })
    })
}
