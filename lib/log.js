
Object.defineProperty(global, '__STACK__', {
    get: () => {
        const orig = Error.prepareStackTrace
        Error.prepareStackTrace = (_, stack) => {
            return stack
        }
        const err = new Error()
        Error.captureStackTrace(err, arguments.callee)
        const stack = err.stack
        Error.prepareStackTrace = orig
        return stack
    }
})

Object.defineProperty(global, '__FILE__', {
    get: () => {
        return __STACK__[1].getFileName().toUpperCase()
    }
})

Object.defineProperty(global, '__LINE__', {
    get: () => {
        return `<line: ${__STACK__[1].getLineNumber()}>`
    }
})

// const myconsole = Object.create(console, {
//     log: {
//         value: (args) => {
//             try {
//                 console.log(...args)
//             } catch (e) {
//                 console.error(e.stack)
//             }
//         },
//         configurable: true,
//         enumerable: true
//     }
// })
//
// module.exports = myconsole
