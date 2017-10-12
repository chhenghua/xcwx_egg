
'use strict'

const {app} = require('egg-mock/bootstrap')
const urlParams = require('./index')
const urlArray = urlParams.url

const getFunc = async (each) => {
    return new Promise((resolve, reject) => {
        app.httpRequest()
            .get(`${each.url}`)
            .query(each.params)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return reject(err)
                }
                console.log(res.body)
                return resolve(res)
            })
    })
}

const postFunc = async (each) => {
    return new Promise((resolve, reject) => {
        app.httpRequest()
            .post(`${each.url}`)
            .send(each.params)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return reject(err)
                }
                console.log(res.body)
                return resolve(res)
            })
    })
}

const putFunc = async (each) => {
    return new Promise((resolve, reject) => {
        app.httpRequest()
            .put(`${each.url}`)
            .send(each.params)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return reject(err)
                }
                console.log(res.body)
                return resolve(res)
            })
    })
}

const delFunc = async (each) => {
    return new Promise((resolve, reject) => {
        app.httpRequest()
            .delete(`${each.url}`)
            .send(each.params)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return reject(err)
                }
                console.log(res.body)
                return resolve(res)
            })
    })
}

const optFunc = async (each) => {
    return new Promise((resolve, reject) => {
        app.httpRequest()
            .options(`${each.url}`)
            .send(each.params)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return reject(err)
                }
                console.log(res.body)
                return resolve(res)
            })
    })
}

const switchMethod = async (method, each) => {
    switch (method) {
        case 'get':
            return await getFunc(each)
        case 'post':
            return await postFunc(each)
        case 'put':
            return await putFunc(each)
        case 'delete':
            return await delFunc(each)
        case 'options':
        case 'opt':
            return await optFunc(each)
        default :
            console.log('please input the correct method: get, post, put, delete and options(opt)')
    }
}

const describeMethod = async (each) => {
    describe(`${each.url}.${each.method}`, () => {
        it('should return result', async () => {
            return await switchMethod(each.method.toLowerCase(), each)
        })
    })
}

urlArray.forEach(async (each) => {
    await describeMethod(each)
})
