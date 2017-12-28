const message = require('../../models/message')
const _service = require('../../service')

module.exports = {
  addMessage: async (ctx) => {
    let body = {code: '01', result: ''}
    try {
      let nick = ctx.request.body.nick || ctx.request.query.nick
      let contents = ctx.request.body.contents || ctx.request.query.contents
      let email = ctx.request.body.email || ctx.request.query.email
      console.log(ctx)
      let messageModel = {
        nick,
        contents,
        email
      }
      let result = await _service.create(message, messageModel)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  },

  getMessages: async (ctx) => {
    let body = {code: '01', result: ''}
    try {
      let page = ctx.request.body.page || ctx.request.query.page || 1
      let limit = ctx.request.body.limit || ctx.request.query.limit || 32
      let options = {
        current: page,
        page_size: limit,
        find_con: {}
      }
      let result = await _service.findAndCountAll(message, options)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  },

  replyMessage: async (ctx) => {

  }
}
