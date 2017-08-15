'use strict';

module.exports = app => {
    class SearchController extends app.Controller {
        * indexSearch() {
            this.body = `search : ${this.ctx.query.name}`
        }
    }
    return SearchController
}