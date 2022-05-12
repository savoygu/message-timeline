const service = require('./')
const Emoji = require('../models/emoji')

module.exports = {
  getEmojis: async (ctx) => {
    const { query, body } = ctx.request
    const current = body.current || query.current || 1
    const pageSize = body.page_size || query.page_size || 32
    const options = {
      current,
      page_size: Number(pageSize),
      find_con: {}
    }
    return await service.findAndCountAll(Emoji, options)
  }
}
