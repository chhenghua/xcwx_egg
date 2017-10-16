exports.url = [
    {
        url: '/api/login',
        method: 'post',
        params: {username: 'sss'},
        controller: 'login'
    },
    {
        url: '/api/user/getOne',
        method: 'get',
        params: {userId: 111},
        controller: 'user'
    },
    {
        url: '/api/sss',
        method: 'get',
        controller: 'home'
    },
    {
        url: '/api/search/index',
        method: 'post',
        controller: 'search'
    },
    {
        url: '/api/user/getList',
        method: 'get',
        params: {name: 'name'},
        controller: 'user'
    },
    {
        url: '/api/user/add',
        method: 'post',
        params: {username: 'username', gender: '1', address: '深圳市'},
        controller: 'user'
    }
]
