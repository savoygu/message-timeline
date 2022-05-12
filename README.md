# 留言时间轴

> :love_letter: 留言时间轴，记录美好时刻


## 运行环境

### Mongodb 数据库

所需版本：4.x [macOS](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-os-x/)、[Windows](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/)（本项目采用的 4.4.14）

完成安装后，确保 mongod 服务开启。

### 邮件回复设置【可选】

> 不设置也能正常启动服务，只不过当你在管理端对留言方回复留言时，无法给留言方发送邮件提醒

需要在目录 `server/app/service` 下创建 `config.js` 文件，格式如下：

```node
module.exports = {
  email: {
    service: 'QQ', // QQ、Gmail（谷歌）、Hotmail、Yahoo（雅虎）
    user: '邮箱账号',
    pass: '授权码' // QQ：设置 -> 账户 -> 开启「POP3/SMTP服务」 -> 生成授权码
  }
}
```

## 运行项目

同时启动客户端和服务端

```bash
npm run start
```

## 技术栈

### 客户端

基于 Vue.js 2.x 版本来开发

- [vue.js 2.x](https://cn.vuejs.org/index.html)（渐进式 JavaScript 框架）
- [vue-router](https://v3.router.vuejs.org/zh/installation.html)（Vue.js 官方路由）
- [axios](https://github.com/axios/axios)（基于 Promise 的 HTTP 客户端）
- [postcss](https://postcss.org/)（使用 JS 插件转换样式的工具）

### 服务端

基于 Koa2 来构建 Node.js 服务

- [koa]()（Node.js 的 web 开发框架）
- [@koa/router](https://github.com/koajs/router)（路由器中间件）
- [koa-session](https://github.com/koajs/session)（简单会话中间件）
- [koa-static](https://github.com/koajs/static)（静态文件服务器中间件）
- [koa-pug](https://www.npmjs.com/package/koa-pug)（Pug 中间件）
- ~~[koa-mount](https://github.com/koajs/mount)~~（将其他 Koa 应用程序或中间件装载到给定的路径名）
- [@koa/cors](https://github.com/koajs/cors)（跨域资源共享（CORS））
- [koa-compress](https://github.com/koajs/compress)（压缩中间件）
- [koa-body](https://github.com/koajs/koa-body)（body 解析器中间件）
- [mongoose](https://mongoosejs.com/docs/4.x/)（NoSql 数据库 Mongodb 的 ORM 框架）
- [dayjs](https://day.js.org/zh-CN/)（2kB 大小的JavaScript 时间日期库）
- [nodemailer](https://nodemailer.com/about/  )（让 Node.js 发送 Email 变得简单极了）
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)（零依赖的散列密码的库）

## 功能概览

### 客户端

- 留言功能（支持开启邮件通知）
- 时间轴

### 服务器

- 留言管理
  - 留言列表
  - 回复留言
  - 编辑留言
  - 删除留言
- emoji 管理
  - emoji 列表
  - 新增 emoji
  - 编辑 emoji
- 用户管理
  - 用户列表
  - 设置管理员
  - 删除用户
