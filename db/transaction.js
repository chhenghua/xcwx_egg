
const mysql = require('./mysql')

module.exports = async (operation) => {
    const connection = await mysql.getConnection()
    try {
        await connection.beginTransaction()
        const rlt = await operation(connection)
        await connection.commit()
        return Promise.resolve(rlt)
    } catch (e) {
        await connection.rollback()
        return Promise.reject(e)
    } finally {
        await connection.release()
    }
}
