const _service = require('./')
const message = require('../models/message')
const _message = module.exports = {}

_message.getMessages = async (ctx) => {
  let current = ctx.request.body.current || ctx.request.query.current || 1
  let page_size = ctx.request.body.page_size || ctx.request.query.page_size || 32
  let options = {
    current,
    page_size,
    sort: '-createTime',
    find_con: {}
  }
  let result = await _service.findAndCountAll(message, options)
  return result
}
