const userDao = require('../../dao/user/user')
const transaction = require('../../db/transaction')

exports.getList = async ({name}) => {

    const rlt = await userDao.getAll()

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

    const run = async (conn) => {
        const addOne = await userDao.addOne({id: 111, username: 'ch', gender: 0}, conn)
        const addTwo = await userDao.addOne({id: 'sss', username: 'LY', gender: 0}, conn)
        return {ss: 'sss'}
    }

    let ret

    if (transaction) {
        ret = await transaction(run)
    } else {
        ret = await run()
    }

    return {
        id: 'xxx',
        username,
        pas,
        gender,
        ret
    }
}
