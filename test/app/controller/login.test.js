'use strict'
const {app} = require('egg-mock/bootstrap')
describe('test/app/controller/login.test.js', () => {
    it('should POST /api/login', () => {
        return app.httpRequest()
            .post('/api/login')
            .send({"username":"sss"})
            .expect(200)
    })
})
