
const egg = require('egg')
const os = require('os')
const cpuLength = 2 // os.cpus().length

const workers = Number(process.argv[2] || cpuLength)

egg.startCluster({
    workers,
    baseDir: __dirname
})
