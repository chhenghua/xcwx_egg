const userDao = require('../../dao/user/user')


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
    // 这里需要别的操作
    return {
        id: 'xxx',
        username,
        pas,
        gender
    }
}
