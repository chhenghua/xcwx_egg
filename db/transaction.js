
const db = require('./mysql')

module.exports = async (operation) => {
    const connection = await db()
    try {
        await connection.beginTransaction()
        const rlt = await operation(connection)
        await connection.commit()
        return Promise.resolve(rlt)
    } catch (e) {
        await connection.rollback()
        Promise.reject(e)
    } finally {
        await connection.release()
    }
}
