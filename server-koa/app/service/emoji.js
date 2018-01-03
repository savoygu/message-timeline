const _service = require('./')
const Emoji = require('../models/emoji')
const _emoji = module.exports = {}

_emoji.getEmojies = async (ctx) => {
  let current = ctx.request.body.current || ctx.request.query.current || 1
  let page_size = ctx.request.body.page_size || ctx.request.query.page_size || 32
  let options = {
    current,
    page_size: Number(page_size),
    find_con: {}
  }
  let result = await _service.findAndCountAll(Emoji, options)
  return result
}
