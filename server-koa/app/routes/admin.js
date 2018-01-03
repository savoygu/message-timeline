const router = require('koa-router')()

const adminController = require('../controllers/admin')

function adminRouter (router) {
  router.get('/messages', adminController.getMessages)
  router.get('/message/:id', adminController.findMessage)
  router.post('/message', adminController.saveMessage)
  router.get('/message/reply/:id', adminController.showText)
  router.post('/message/reply', adminController.replyMessage)
  router.delete('/message', adminController.destoryMessage)

  router.get('/emojies', adminController.getEmojies)
  router.get('/emoji', adminController.newEmoji)
  router.get('/emoji/:id', adminController.findEmoji)
  router.post('/emoji', adminController.saveEmoji)
  router.delete('/emoji', adminController.destoryEmoji)
}

adminRouter(router)

module.exports = router.middleware()
