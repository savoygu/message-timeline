const Router = require('@koa/router')
const router = new Router()
const adminController = require('../../controllers/admin')

router.get('/signin', adminController.showSignin)
router.post('/signin', adminController.signin)

module.exports = router
