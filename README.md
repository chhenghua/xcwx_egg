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
```
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

### 单元测试
- 每个业务功能需有单元测试，使用 `npm test` 来执行单元测试


[egg]: https://eggjs.org