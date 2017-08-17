'use strict'

module.exports = app => {
    app.post('/api/search/index', 'search.indexSearch')
}
