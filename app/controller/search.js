'use strict'

module.exports = app => {
    class SearchController extends app.Controller {
        async indexSearch() {
            const query = this.ctx.query
            this.ctx.body = query
        }
    }

    return SearchController
}
