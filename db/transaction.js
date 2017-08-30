
const {MySql} = require('./mysql')

module.exports = async (operation) => {
    const connection = await MySql()
    try {
        await connection.beginTransaction()
        const rlt = await operation(connection)
        await connection.commit()
        return Promise.resolve(rlt)
    } catch (e) {
        await connection.rollback()
        throw new Error(e)
    } finally {
        await connection.release()
    }
}
