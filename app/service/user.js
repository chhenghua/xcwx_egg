const sqlMap = require('../../map/sql')


exports.getList = async ({name}) => {

    const options = sqlMap.getOption()
    let sql = await sqlMap.getSql({name: "SELECTALL"})
    sql = await sql.done()
    const rlt = await sqlMap.exec({sql, options})

    return {
        id: 'xxx',
        name,
        tel: 'xxx',
        rlt
    }
}

exports.getOne = async ({userId}) => {

    // select * from user where id = :userId

    return {
        userId,
        username: 'xxx',
        gender: '',
        address: '',
        tel: ''
    }
}

exports.add = async ({username, pas, gender}) => {
    // 这里需要别的操作
    return {
        id: 'xxx',
        username,
        pas,
        gender
    }
}
