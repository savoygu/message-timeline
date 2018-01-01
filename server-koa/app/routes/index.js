const router = require('koa-router')()

require('./emoji')(router)
require('./message')(router)

module.exports = router.middleware()
