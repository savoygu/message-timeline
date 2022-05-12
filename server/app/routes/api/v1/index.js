const Router = require('@koa/router')
const router = new Router()

require('./emoji')(router)
require('./message')(router)

module.exports = router
