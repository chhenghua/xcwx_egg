# xcwx



## 快速入门

<!-- 在此次添加使用文档 -->


### 本地开发

```bash
$ npm install
$ npm run dev
$ open http://localhost:7001/news
```

- 如果想要更改端口，请使用如下命令：
```bash
$ npm run dev --port 7005
```

### 部署

```bash
$ npm start
$ npm stop
```

### 代码编写规范

- 总体规则，全面弃用var关键字，使用const与let代替
- 参数的传递须以对象的形式，不必考虑参数的位置，具体参见方法的使用
- 方法以async/await的方式声明和使用，具体如下
``` js
// ../service/user.js
exports.find = async ({d, e}) => {
    const [a, b, c] = [1, 2, 3]
    return {a, b, c, e, d}
}

// home.js
const user = require('../service/user')
async index() {
    const rlt = await user.find({e: 'a', d: 'e'})
    this.ctx.body = rlt
}
```
- 静态配置写到统一的地方，而不是以全局变量的方式声明
- 代码缩进以4个空格的方式，文件及字符编码为utf8，请勿随意更改

### 有关日志问题
- 在本地开发中可以用console.log，但请勿上传
- 如果有必要上传，请用全局提供的logger方法
```js
logger.info({
    method: request.method,
    url: request.url,
    'Request body': request.body || null,
    time: (new Date() - start) + ' ms',
    'Response data': body
})
```

### 路由、控制器及service的编写规范
- 路由规范及控制器规范，在控制器处需要进行参数的校验
``` js
1.首先需要在./app/router.js以业务模块为主进行注册，如
  用户模块
  // 每个业务路由模块需要在此注册
  const user = require('./router/user')  
  module.exports = app => {
      user(app)
  };
2. 在./app/router/user.js定义具体的路由url，如下
   module.exports = app => {
       app.get('/api/user/getList?name=sss', 'user.getList')
       app.get('/api/user/:userId', 'user.getOne')
       app.post('/api/user/add', 'user.getList')
   }
3.控制器 user.js编写如下
  // ./app/controller/user.js
  const Joi = require('joi')
  const Util = require('../../utils')
  const user = require('../service/user')
  ...
  async getList() {
  
      // 首先定义需要校验的参数
      const schema = Joi.object().keys({
          name: Joi.number().required()
      })

      // 取得query参数
      const query = this.ctx.query

      // 校验
      const {name} = Util.validate(query, schema)
      const rlt = await user.getList({name})
      this.ctx.body = rlt
  };
  ...
4. service ./app/service/user.js
    exports.getList = async ({name}) => {
    
        // select * from user where name like :name
    
        return {
            id: 'xxx',
            name,
            tel: 'xxx'
        }
    }
```

### 单元测试
- 每个业务功能需有单元测试，使用 `npm test` 来执行单元测试


[egg]: https://eggjs.org