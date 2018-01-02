const router = require('koa-router')()

const adminController = require('../controllers/admin')

function adminRouter (router) {
  router.get('/message', adminController.findMessage)
  router.get('/messages', adminController.getMessages)
  router.get('/message/update/:id', adminController.showMessage)
  router.post('/message/update', adminController.updateMessage)
  router.post('/message/reply', adminController.replyMessage)
  router.get('/message/withdraw', adminController.destoryMessage)
}

adminRouter(router)

module.exports = router.middleware()
