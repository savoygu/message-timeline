const Koa = require('koa')
const cors = require('koa-cors') // 跨域处理
const bodyparser = require('koa-bodyparser') // 传参获取
const compress = require('koa-compress') // 传输压缩
const mount = require('koa-mount') // 路由挂载
const convert = require('koa-convert') // 封装中间件
const mongoose = require('mongoose')

const config = require('./config')

const app = new Koa()

app.proxy = true

app.use(convert(bodyparser()))
app.use(convert(compress()))
app.use(convert(cors()))

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
if (process.env.NODE_ENV === 'development') {
  // 开发配置
  mongoose.set('debug', true)
}

// 挂在路由
app.use(mount('/api/v1', require('./routes')))

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
  return mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db, {
    useMongoClient: true
  })
}
