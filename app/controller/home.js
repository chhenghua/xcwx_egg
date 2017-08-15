'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        * index() {
            throw new Error('This is a test error')
            this.ctx.body = {
                success: 'success',
                data: {},
                status: "success"
            }
        }
    }

    return HomeController;
};
