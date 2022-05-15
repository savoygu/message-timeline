const path = require('path')
const Koa = require('koa')
const cors = require('@koa/cors') // 跨域处理
const kodBody = require('koa-body') // 传参获取
const compress = require('koa-compress') // 传输压缩
const Pug = require('koa-pug') // 视图资源
const serve = require('koa-static') // 静态资源
const session = require('koa-session') // session
const mongoose = require('mongoose') // 操作 mongodb
const dayjs = require('dayjs')

const router = require('./app/routes')

const config = require('./config') // 应用和数据库配置
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || config.port || 3000

let dbURL = 'mongodb://127.0.0.1:27017/message-timeline' // 线上地址
// let dbURL = 'mongodb+srv://savoygu:gPOhQwlFx9qxyhEM@aws-hk.bxj11.mongodb.net/message-timeline?retryWrites=true&w=majority'
if (env === 'development') {
  dbURL = 'mongodb://' + config.database.host + '/' + config.database.db
}

const app = new Koa()
/* eslint-disable no-unused-vars */
const pug = new Pug({
  app,
  viewPath: path.join(__dirname, 'app/views/pages'),
  locals: {
    dayjs
  },
  cache: env === 'development'
})

app.use(serve(path.join(__dirname, '/public')))
app.use(kodBody())
app.use(compress())
app.use(cors())

app.keys = ['secret is only a secret']
app.use(
  session(
    {
      key: 'message-timeline' /** (string) cookie key (default is koa:sess) */,
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      overwrite: true /** (boolean) can overwrite or not (default true) */,
      httpOnly: true /** (boolean) httpOnly or not (default true) */,
      signed: true /** (boolean) signed or not (default true) */,
      rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
    },
    app
  )
)

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method}, ${ctx.url}, ${ms}`)

  if (!ctx.body) {
    await ctx.render('404', {
      title: '留言时间轴'
    })
  }
})

// 错误监听
app.on('error', (err, ctx) => {
  console.log('error: ', err)
})

// 开发配置
if (env === 'development') {
  mongoose.set('debug', true)
}

// 挂载路由
app.use(router.routes(), router.allowedMethods())

run()

// 数据库连接
async function run () {
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    // .on('disconnected', run)
    .once('open', listen)

  await mongoose.connect(dbURL)
    .catch(console.error.bind(console, 'connect error:'))
}

function listen () {
  app.listen(port, () => {
    console.log(
      '%s BackEnd Server is running on: http://%s:%s',
      config.appName,
      config.host,
      port
    )
  })
}
