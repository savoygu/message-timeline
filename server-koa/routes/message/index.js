const messageController = require('../../controllers/user')

module.exports = function (router) {
  router.post('/message', messageController.addMessage)
  router.get('/message', messageController.findMessage)
  router.get('/messages', messageController.getMessages)
  router.post('/withdraw', messageController.destoryMessage)
}
