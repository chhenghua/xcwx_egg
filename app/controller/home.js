'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        async index() {
            this.ctx.body = {
                success: 'success',
                data: this.ctx.params
            }
        }
    }

    return HomeController;
};
