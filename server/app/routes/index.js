const Router = require('@koa/router')
const router = new Router()

const admin = require('./admin')
const user = require('./admin/user')
const apiV1 = require('./api/v1')

router.redirect('/', '/user/signin')
router.use('/user', user.routes(), user.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/api/v1', apiV1.routes(), apiV1.allowedMethods())

module.exports = router
