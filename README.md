## 留言时间轴

[![Netlify Status](https://api.netlify.com/api/v1/badges/caa159e5-26d0-4f97-b7ca-b5b0164b8fd9/deploy-status)](https://app.netlify.com/sites/frolicking-kataifi-7de522/deploys)

### 运行环境

#### Node.js 版本

所需版本：12 以上

#### Mongodb 数据库

所需版本：4.x [macOS](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-os-x/)、[Windows](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-windows/)（本项目采用的 4.4.14）

完成安装后，确保 mongod 服务开启。

#### 邮件回复设置【可选】

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

### 项目说明

管理端的访问需要登录权限，但并未直接开放注册页面。需要手动修改配置文件 `server/config/index.js` 下的 `permission` 属性来控制访问权限的开启：

- 区间 `[1, 10]` 表示开启登录访问权限，以 `/admin` 开头的路由将无法访问；
- 区间 `(10, Infinity]` 表示开启管理员访问权限，要求登录用户的 role 必须大于 10；（可以预设账号）
- 区间 `[-Infinity, 0]` 表示关闭所有权限，每个路由皆可以访问，届时就可以访问注册页面 `/admin/user/signup` 来注册用户。

### 运行项目

同时启动客户端和服务器

```bash
npm run dev
```

客户端地址：

- http://localhost:8080

管理端地址：

- http://localhost:5000（开发）
- http://localhost:3000（生产）

接口地址：

- http://localhost:3000/api/v1

### 技术栈

#### 客户端

##### Vue2 技术栈

基于 Vue.js 2.x 版本来开发

- [vue.js](https://cn.vuejs.org/index.html)（渐进式 JavaScript 框架）
- [vue-router](https://v3.router.vuejs.org/zh/installation.html)（Vue.js 官方路由）
- [axios](https://axios-http.com/docs/intro)（基于 Promise 的 HTTP 客户端）
- [postcss](https://postcss.org/)（使用 JS 插件转换样式的工具）
- [postcss-salad](https://github.com/ElemeFE/postcss-salad)（能够帮助你写出更加简洁、优雅的 CSS 的样式解决方案）

##### Vue3 技术栈

基于 Vue.js 3.x 版本来开发

- [vue.js](https://v3.cn.vuejs.org/)（渐进式 JavaScript 框架）
- [typescript](https://www.typescriptlang.org/)（基于 JavaScript 的强类型编程语言）
- [axios](https://axios-http.com/docs/intro)（基于 Promise 的 HTTP 客户端）
- [sass](https://postcss.org/)（CSS 预处理器）
- [sass-bem](https://github.com/zgabievi/sass-bem)（基于 sass 来编写 BEM 风格样式的包）
- [postcss](https://postcss.org/)（使用 JS 插件转换样式的工具）
- [postcss-utility](https://ismamz.github.io/postcss-utilities/)（postcss 插件，拥有最常用的 mixin、快捷方式和辅助函数）
- [vite](https://cn.vitejs.dev/)（下一代前端开发与构建工具）

#### 服务端

基于 Koa2 来构建 Node.js 服务

- [koa](https://koajs.com/)（Node.js 的 web 开发框架）
- [@koa/router](https://github.com/koajs/router)（路由器中间件）
- [koa-session](https://github.com/koajs/session)（简单会话中间件）
- [koa-static](https://github.com/koajs/static)（静态文件服务器中间件）
- [koa-pug](https://www.npmjs.com/package/koa-pug)（Pug 中间件）
- ~~[koa-mount](https://github.com/koajs/mount)~~（将其他 Koa 应用程序或中间件装载到给定的路径名）
- [@koa/cors](https://github.com/koajs/cors)（跨域资源共享（CORS）中间件）
- [koa-compress](https://github.com/koajs/compress)（压缩中间件）
- [koa-body](https://github.com/koajs/koa-body)（body 解析器中间件）
- [mongoose](https://mongoosejs.com/docs/4.x/)（NoSql 数据库 Mongodb 的 ORM 框架）
- [dayjs](https://day.js.org/zh-CN/)（2kB 大小的 JavaScript 时间日期库）
- [bent](https://github.com/mikeal/bent)（适用于 Node.js 和浏览器的函数式 HTTP 客户端）
- [nodemailer](https://nodemailer.com/about/)（让 Node.js 发送 Email 变得简单）
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)（零依赖的散列密码的库）

### 功能概览

#### 客户端

- 留言功能（支持开启邮件通知）
- 时间轴

#### 服务器

> 即提供接口服务，又提供管理功能

- 管理端

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

- 接口服务
  - 留言列表
  - emoji 列表

### 项目部署

客户端部署在 [netlify](https://app.netlify.com/)，可以通过 [http://mt.gusaifei.com](http://mt.gusaifei.com) 来访问

服务器部署在 [render](https://dashboard.render.com/)，暂不提供访问地址:)

数据库部署在 [Mongodb Atlas](https://cloud.mongodb.com/)

图片存储在 [七牛云](https://portal.qiniu.com/kodo/bucket)

### 后续计划

- [x] Monorepo（支持更多客户端/服务器共存）
- [ ] 加入 前端框架
  - [x] Vue2
  - [x] Vue3
  - [ ] React
- [ ] 加入 Node.js 框架
  - [ ] NestJS
  - [ ] Midway.js
- [ ] 加入 ORM 框架
  - [ ] prisma
  - [ ] mikro-orm
