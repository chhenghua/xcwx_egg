
exports.getList = async ({name}) => {

    // select * from user where name like :name

    return {
        id: 'xxx',
        name,
        tel: 'xxx'
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
