'use strict'

module.exports = app => {
    app.get('/api/search/index', 'search.indexSearch')
}
