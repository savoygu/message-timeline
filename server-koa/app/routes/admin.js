const router = require('koa-router')()

const adminController = require('../controllers/admin')

function adminRouter (router) {
  router.get('/message', adminController.findMessage)
  router.get('/messages', adminController.getMessages)
  router.post('/message/reply', adminController.replyMessage)
  router.get('/message/withdraw', adminController.destoryMessage)
}

adminRouter(router)

module.exports = router.middleware()
