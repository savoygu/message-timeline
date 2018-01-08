const router = require('koa-router')()
const adminController = require('../../controllers/admin')

router.get('/user/signin', adminController.showSignin)
router.post('/user/signin', adminController.signin)

module.exports = router.middleware()
