const userDao = require('../../dao/user/user')
const {transaction} = require('../../db/oracle/transaction')
const stringUtil = require('../../lib/stringUtil')

/**
 * @param name
 * @returns {Promise.<{id: string, name: *, tel: string, rlt: *}>}
 */

exports.getList = async ({name}) => {

    const rlt = await userDao.getAll()

    return {
        id: 'xxx',
        name,
        tel: 'xxx',
        rlt
    }
}

/**
 * @param userId
 * @returns {Promise.<{userId: *, username: string, gender: string, address: string, tel: string}>}
 */

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

/**
 * @param username
 * @param pas
 * @param gender
 * @param sss
 * @returns {Promise.<{id: string, username: *, pas: *, gender: *, ret: *}>}
 */

exports.add = async ({username, pas, gender, sss}) => {

    // const run = async (conn) => {
    //     const addOne = await userDao.addOne({id: 111, username: 'ch', gender: 0}, conn)
    //     // const addTwo = await userDao.addOne({id: 'sss', username: 'LY', gender: 0}, conn)
    //     return {ss: 'sss'}
    // }
    //
    // let ret
    //
    // if (transaction) {
    //     ret = await transaction(run)
    // } else {
    //     ret = await run()
    // }

    const addOne = await userDao.addOne({id: 111, username: 'ch', gender: 0})
    // const addTwo = await userDao.addOne({id: 'sss', username: 'LY', gender: 0}, conn)

    return {
        id: 'xxx',
        username,
        pas,
        gender,
        addOne
    }
}

exports.addEmployee = async () => {

    const year = ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990']
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const day = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
        '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
    ]
    const employeetime = '2016-05-01'
    const run = async (conn) => {
        for (let i = 1; i <= 1000; i++) {
            let birthday = `${year[Math.floor(Math.random() * (year.length))]}-${month[Math.floor(Math.random() * (month.length))]}-${day[Math.floor(Math.random() * (day.length))]}`
            const name = stringUtil.generateNonceString(5)
            console.log(`birthday: ${birthday}---------------------------1`)
            await userDao.addEmployee({id: i, name, birthday, employeetime}, conn)
        }
    }
    let rlt
    if (transaction) {
        rlt = await transaction(run)
    } else {
        rlt = await run()
    }
    return rlt
}

exports.addSalary = async () => {
    const month = [
        '2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01', '2016-12-01',
        '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01', '2017-06-01'
    ]

    const monthLen = month.length

    const run = async (conn) => {
        for (let i = 1; i <= 1000; i++) {
            for (let key = 0; key < monthLen; key++ ) {
                console.log(`salaryDate: ${monthLen * (i - 1) + key + 1}`)
                await userDao.addSalary({id: monthLen * (i - 1) + key + 1, employeeid: i, salary: (Math.random() * 3000).toFixed(2), salaryDate: month[key]}, conn)
            }
        }
    }
    let rlt
    if (transaction) {
        rlt = await transaction(run)
    } else {
        rlt = await run()
    }
    return {}
}

exports.addDep = async () => {
    const dep = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const depLen = dep.length
    const run = async (conn) => {
        for (let i = 1; i <= 1000; i++) {
            await userDao.addDep({id: i, depid: dep[Math.floor(Math.random() * depLen)], employeeid: i}, conn)
        }
    }
    let rlt
    if (transaction) {
        rlt = await transaction(run)
    } else {
        rlt = await run()
    }
    return {}
}
