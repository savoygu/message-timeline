const _ = require('underscore')
const Message = require('../models/message')
const _service = require('../service')
const { getMessages } = require('../service/message')

module.exports = {
  getMessages: async (ctx) => {
    try {
      const result = await getMessages(ctx)
      ctx.render('message/list', {
        title: '留言列表',
        data: result
      })
    } catch (e) {
      console.log('留言列表：', e)
    }
  },

  findMessage: async (ctx) => {},

  showMessage: async (ctx) => {
    const id = ctx.params.id
    try {
      if (id) {
        let message = await _service.findById(Message, id)
        console.log(message)
        ctx.render('message/update', {
          title: '更新留言',
          message
        })
      }
    } catch (e) {
      console.log('更新留言：', e)
    }
  },

  updateMessage: async (ctx) => {
    const id = ctx.request.body.message._id
    const message = ctx.request.body.message
    console.log(message)
    let _message
    try {
      if (id) {
        let oldMessage = await _service.findById(Message, id)
        _message = _.extend(oldMessage, message)
        const newMessage = await _message.save()
        ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log('更新留言：', e)
    }
  },

  replyMessage: async (ctx) => {},

  destoryMessage: async (ctx) => {}
}
