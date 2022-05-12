const service = require('./')
const Message = require('../models/message')

module.exports = {
  getMessages: async (ctx) => {
    const { query, body } = ctx.request
    const current = body.current || query.current || 1
    const pageSize = body.page_size || query.page_size || 32
    const options = {
      current,
      page_size: Number(pageSize),
      sort: '-createTime',
      find_con: {}
    }
    return await service.findAndCountAll(Message, options)
  }
}
