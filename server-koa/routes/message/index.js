const messageController = require('../../controllers/message')

module.exports = function (router) {
  router.get('/message', messageController.findMessage)
  router.get('/messages', messageController.getMessages)
  router.post('/message', messageController.addMessage)
  router.post('/message/:id', messageController.updateMessage)
  router.post('/reply', messageController.replyMessage)
  router.post('/withdraw', messageController.destoryMessage)
}
