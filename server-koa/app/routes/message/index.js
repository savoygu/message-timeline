const messageController = require('../../controllers/message')

module.exports = function (router) {
  router.get('/messages', messageController.getMessages)
  router.post('/message', messageController.addMessage)
}
