
'use strict'

const {mysql} = require('../../db/mysql')
const {oracle} = require('../../db/oracle/oracle')

exports.getAll = async (connection = mysql) => {
    const sql = `
SELECT
    *
FROM 
    test_user
    `
    try {
        console.log(`sql: ${sql}`)
        const ret = await connection.query(sql)
        return Promise.resolve(ret)
    } catch (e) {
        logger.info('getAllException: %s', e)
        throw new Error(e)
    }
}

exports.addOne = async ({id, username, gender}, connection = oracle) => {
    const sql = `
SELECT
    *
FROM
    TRAIN_DEP
    `
    try {
        console.log(`sql: ${sql}`)
        const conditions = [id, username, gender]
        const rlt = await connection.query(sql)
        return Promise.resolve(rlt.rows)
    } catch (e) {
        throw new Error(e)
    }
}

exports.addEmployee = async ({id, name, birthday, employeetime}, connection = oracle) => {
    const sql = `
insert into 
    train_employee(id, name, birthday, employeetime)
values
    (:id, :name, to_date(:birthday, 'yyyy-mm-dd'), to_date(:employeetime, 'yyyy-mm-dd'))
    `
    try {
        const conditions = [id, name, birthday, employeetime]
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve(rlt)
    } catch (e) {
        throw new Error(e)
    }
}

exports.addSalary = async ({id, employeeid, salary, salaryDate}, connection = oracle) => {
    const sql = `
insert into 
    train_employee_salary(id, employeeid, salary, salary_date)
values
    (:id, :employeeid, :salary, to_date(:salary_date, 'yyyy-mm-dd'))
    `
    try {
        const conditions = [id, employeeid, salary, salaryDate]
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve(rlt)
    } catch (e) {
        throw new Error(e)
    }
}

exports.addDep = async ({id, depid, employeeid}, connection = oracle) => {
    const sql = `
insert into
    train_dep_employee(id, depid, employeeid, createtime)
values
    (:id, :depid, :employeeid, sysdate)
    `
    try {
        const conditions = [id, depid, employeeid]
        const rlt = await connection.query(sql, conditions)
        return Promise.resolve(rlt)
    } catch (e) {
        throw new Error(e)
    }
}
