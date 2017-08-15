'use strict';

module.exports = app => {
    app.get('/api/sss', 'home.index');
    app.get('/earch', 'search.indexSearch')
};
