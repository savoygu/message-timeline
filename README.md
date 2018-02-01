# 时间轴

> :love_letter:基于 Vue -> Koa2 -> Mongoose Vue 的留言时间轴，记录美好时光。

## 目录

<!-- TOC -->

- [时间轴](#%E6%97%B6%E9%97%B4%E8%BD%B4)
  - [目录](#%E7%9B%AE%E5%BD%95)
  - [效果预览](#%E6%95%88%E6%9E%9C%E9%A2%84%E8%A7%88)
  - [项目运行](#%E9%A1%B9%E7%9B%AE%E8%BF%90%E8%A1%8C)
  - [前端项目目录](#%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95)
  - [后端项目目录](#%E5%90%8E%E7%AB%AF%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95)
  - [项目架构（加载中...）](#%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84%EF%BC%88%E5%8A%A0%E8%BD%BD%E4%B8%AD%EF%BC%89)

<!-- /TOC -->

## 效果预览

[emmmmmmm](https://timeline.vue.gusaifei.com)
## 项目运行

```bash
# 安装依赖
npm run bootstrap

# 前端
npm run start

# 后端
npm run server

# 同时开启
npm run all
```

## 前端项目目录

生成方式：参考文档 [https://github.com/jrainlau/filemap](https://github.com/jrainlau/filemap)

```bash
npm run filemap
```

```bash
|__ build                                             # webpack 配置
  |__ build.js
  |__ check-versions.js
  |__ dev-client.js
  |__ dev-server.js
  |__ salad.config.json
  |__ utils.js
  |__ vue-loader.conf.js
  |__ webpack.base.conf.js
  |__ webpack.dev.conf.js
  |__ webpack.prod.conf.js
|__ config
  |__ dev.env.js
  |__ index.js
  |__ prod.env.js
|__ server-koa                                        # koa：目录在下面
|__ src                                               # vue 源代码
  |__ App.vue                                           # vue 入口
  |__ assets                                            # 静态资源
    |__ emoji                                             # emoji 图片
      |__ 1.gif
      |__ 2.gif
      |__ 3.gif
      |__ ....gif
    |__ fonts                                             # 字体
      |__ iconfont.eot
      |__ iconfont.svg
      |__ iconfont.ttf
      |__ iconfont.woff
    |__ logo.png
  |__ components                                        # vue 组件
    |__ loading.vue                                       # 加载中组件
    |__ message                                           # 留言页面
      |__ pagination.vue                                    # 分页组件
      |__ publish.vue                                       # 发布留言组件
      |__ timeline.vue                                      # 留言列表组件
    |__ message.vue                                       # 留言页面
    |__ switch.vue                                        # 开关组件
    |__ toast.vue                                         # 提示组件
  |__ http                                              # http 请求
    |__ index.js                                          # axios 配置及 GET、POST请求方法封装
  |__ main.js                                           # webpack 入口
  |__ router                                            # 路由配置
    |__ index.js
  |__ styles                                            # 样式
    |__ less
    |__ postcss
      |__ icon.css
      |__ index.css
      |__ loading.css
      |__ message.css
      |__ pagination.css
      |__ publish.css
      |__ timeline-backup.css
      |__ timeline.css
      |__ var.css
    |__ scss
    |__ stylus
    |__ tipsy.css
  |__ utils                                             # 工具方法
    |__ date.js
    |__ dom.js
|__ static
  |__ .gitkeep
|__ .babelrc
|__ .editorconfig
|__ .eslintignore
|__ .eslintrc.js
|__ .gitignore
|__ .postcssrc.js
|__ index.html
|__ package-lock.json
|__ package.json
|__ README.md
|__ yarn.lock
```

**[⬆ back to top](#目录)**

## 后端项目目录

/server-koa/

```bash
|__ app                                                # 应用
  |__ controllers                                        # 控制层
    |__ admin.js                                           # 管理后台：用户、留言、emoji
    |__ emoji                                              # emoji
      |__ index.js
    |__ emojies.js                                         # emoji 数据（接口已经存在了）
    |__ message                                            # 留言接口：新增留言、留言列表
      |__ index.js
  |__ middleware                                         # 中间件
    |__ permission.js                                      # 权限控制：登录及管理员
  |__ models                                             # 模型
    |__ emoji.js                                           # emoji
    |__ message.js                                         # 留言
    |__ user.js                                            # 用户
  |__ routes                                             # 路由
    |__ admin.js                                           # 管理后台路由：需要登录
    |__ emoji                                              # emoji 路由
      |__ index.js
    |__ index.js                                           # 合并emoji 路由、留言路由
    |__ message                                            # 留言路由
      |__ index.js
    |__ user                                               # 管理后台路由：开放登录
      |__ index.js
  |__ service                                            # 服务层
    |__ config.js                                          # 发送邮件配置（见下面的emoji.js 说明）
    |__ email.js                                           # 发送邮件
    |__ emoji.js                                           # emoji
    |__ index.js
    |__ location.js                                        # 地理位置
    |__ message.js                                         # 留言
  |__ views                                              # 视图层
    |__ includes                                           # 通用模板
      |__ head.pug
      |__ header.pug
    |__ layout.pug                                         # 布局模板
    |__ pages                                              # 页面
      |__ 404.pug                                            # 404 页面
      |__ emoji                                              # emoji 页面
        |__ add.pug                                            # 新增emoji 页面
        |__ list.pug                                           # emoji 列表页面
      |__ message                                            # 留言页面
        |__ list.pug                                             # 留言列表页面
        |__ reply.pug                                            # 回复留言页面
        |__ update.pug                                           # 更新留言页面
      |__ user                                               # 管理员页面
        |__ list.pug                                               # 管理员列表页面
        |__ signin.pug                                               # 登录页面
        |__ signup.pug                                               # 注册页面
|__ config                                                # 应用和数据库配置
  |__ index.js
|__ public                                                # 静态资源
  |__ js                                                    # 删除操作
    |__ admin.js
  |__ libs                                                  # 类库
    |__ bootstrap
    |__ jquery
|__ .bowerrc
|__ .editorconfig
|__ .eslintrc.json
|__ app.js                                                # 应用入口
|__ bower.json
|__ gruntfile.js                                          # grunt 配置
|__ gulpfile.js                                           # gulp 配置
|__ package.json
```

**[⬆ back to top](#目录)**

## 项目架构（加载中...）
