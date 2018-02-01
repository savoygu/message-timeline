const path = require('path')
const Koa = require('koa')
const cors = require('koa-cors') // 跨域处理
const bodyparser = require('koa-bodyparser') // 传参获取
const compress = require('koa-compress') // 传输压缩
const mount = require('koa-mount') // 路由挂载
const convert = require('koa-convert') // 封装中间件
const mongoose = require('mongoose') // 操作 mongodb
const Pug = require('koa-pug') // 视图资源
const serve = require('koa-static') // 静态资源
const session = require('koa-session') // session
const liveload = require('koa-liveload') // 重载
const moment = require('moment')

const config = require('./config') // 应用和数据库配置
const env = process.env.NODE_ENV || 'development'

let dbURL = 'mongodb://127.0.0.1:27017/timeline' // 线上地址
if (env === 'development') {
  dbURL = 'mongodb://' + config.database.host + '/' + config.database.db
}

const app = new Koa()
const pug = new Pug({
  app,
  viewPath: path.join(__dirname, 'app/views/pages'),
  pretty: true,
  locals: {
    moment
  },
  noCache: env === 'development'
})

app.use(serve(path.join(__dirname, '/public')))
app.use(convert(bodyparser()))
app.use(convert(compress()))
app.use(convert(cors()))

app.keys = ['secret is only a secret']
app.use(session({
  key: 'timeline-koa2', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
}, app))

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(`${ctx.method}, ${ctx.url}, ${ms}`)
})

// 错误监听
app.on('error', (err, ctx) => {
  console.log('error: ', err)
})

// 开发配置
if (env === 'development') {
  // 开发配置
  mongoose.set('debug', true)

  app.use(liveload(__dirname, {
    includes: ['pug']
  }))
}

// 挂在路由
app.use(mount('/admin', require('./app/routes/admin')))
app.use(mount('/api/v1', require('./app/routes')))
app.use(mount('/', require('./app/routes/user'))) // 放开登录页面

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

function listen () {
  app.listen(config.port, () => {
    console.log('%s BackEnd Server is running on: http://%s:%s', config.appName, config.host, config.port)
  })
}

// 数据库连接
function connect () {
  mongoose.Promise = global.Promise // resolve a bug that mpromise is deprecated,plug in your own promise library instead
  return mongoose.connect(dbURL, {
    useMongoClient: true
  })
}
