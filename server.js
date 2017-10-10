
const egg = require('egg')
const os = require('os')
const cpuLength = 1 // os.cpus().length

const workers = Number(process.argv[2] || cpuLength)

egg.startCluster({
    workers,
    baseDir: __dirname,
    hostname: '0.0.0.0',
    port: 8000
})
