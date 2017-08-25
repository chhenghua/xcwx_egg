const userDao = require('../../dao/user/user')
const transaction = require('../../db/transaction').transaction


exports.getList = async ({name}) => {

    const rlt = await userDao.getAll({merchantId: 412})

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
        // const [addOne, addTwo] = Promise.all([
        //     await userDao.addOne({_id: 111, username: "ch", gender: 0}, conn),
        //     await userDao.addOne({_id: 'sss', username: "LY", gender: 0}, conn)
        // ])
        const addOne = await userDao.addOne({id: 111, username: "ch", gender: 0}, conn)
        return {addOne}
        // const addTwo = await userDao.addOne({id: 'sss', username: "LY", gender: 0}, conn)
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
