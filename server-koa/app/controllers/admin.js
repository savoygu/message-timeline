const message = require('../models/message')
const _service = require('../service')
const { getMessages } = require('../service/message')

module.exports = {
  getMessages: async (ctx) => {
    let body = {code: '01', result: ''}
    try {
      const result = await getMessages(ctx)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.render('message/messages', {
        title: '留言列表',
        data: body.result
      })
    }
  },

  findMessage: async (ctx) => {},

  destoryMessage: async (ctx) => {},

  replyMessage: async (ctx) => {}
}
