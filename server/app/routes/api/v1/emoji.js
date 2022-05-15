const emojiController = require('../../../controllers/emoji')

module.exports = (router) => {
  router.get('/emojis', emojiController.getEmojis)
}
