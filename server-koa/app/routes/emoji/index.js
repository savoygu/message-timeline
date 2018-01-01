const emojiController = require('../../controllers/emoji')

module.exports = function (router) {
  router.get('/emojies', emojiController.getEmojies)
}
