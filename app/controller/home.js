'use strict';

module.exports = app => {
    class HomeController extends app.Controller {
        async index() {
            console.log(app.config)
            this.ctx.body = {
                success: 'success'
            }
        }
    }

    return HomeController;
};
