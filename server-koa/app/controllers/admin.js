const _ = require('underscore')
const Message = require('../models/message')
const Emoji = require('../models/emoji')
const _service = require('../service')
const { getMessages } = require('../service/message')
const { getEmojies } = require('../service/emoji')

function replaceEmoji (emojies, content) {
  return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
    let expression = emojies.filter(emoji => emoji.meaning === p)[0].expression
    return `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + expression} title=${p} alt=${p}>`
  })
}

module.exports = {
  getMessages: async (ctx) => {
    try {
      const result = await getMessages(ctx)
      const emojies = await getEmojies(ctx).rows
      result.rows = result.rows.map(item => {
        if (!item.content) {
          return item
        }
        item.content = replaceEmoji(emojies, item.content)
        return item
      })
      ctx.render('message/list', {
        title: '留言列表',
        data: result
      })
    } catch (e) {
      console.log('留言列表：', e)
    }
  },

  findMessage: async (ctx) => {
    const id = ctx.params.id
    try {
      if (id) {
        let message = await _service.findById(Message, id)
        ctx.render('message/update', {
          title: '更新留言',
          message
        })
      }
    } catch (e) {
      console.log('回显留言：', e)
    }
  },

  saveMessage: async (ctx) => {
    const id = ctx.request.body.message._id
    let message = ctx.request.body.message
    message.reviewed = message.reviewed === '1'
    try {
      let _message
      if (id) {
        let oldMessage = await _service.findById(Message, id)
        _message = _.extend(oldMessage, message)
        await _message.save()
        ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log('更新留言：', e)
    }
  },

  showText: async (ctx) => {
    const id = ctx.params.id
    try {
      if (id) {
        let message = await _service.findById(Message, id)
        ctx.render('message/reply', {
          title: '回复留言',
          message
        })
      }
    } catch (e) {
      console.log('回显回复：', e)
    }
  },

  replyMessage: async (ctx) => {
    const id = ctx.request.body.message._id
    let message = ctx.request.body.message
    try {
      let _message
      if (id) {
        let oldMessage = await _service.findById(Message, id)
        _message = _.extend(oldMessage, message)
        const newMessage = await _message.save()
        if (newMessage.reviewed) { // 邮件通知

        }
        ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log('回复留言：', e)
    }
  },

  destoryMessage: async (ctx) => {
    const id = ctx.request.query.id
    let body = {success: 1}

    try {
      if (id) {
        await _service.deleteAll(Message, {_id: id})
      }
    } catch (e) {
      body = {success: 0}
    } finally {
      ctx.body = body
    }
  },

  getEmojies: async (ctx) => {
    try {
      const result = await getEmojies(ctx)
      result.rows = result.rows.map(item => {
        item.dynamic = `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + item.expression} title=${item.meaning} alt=${item.meaning}>`
        return item
      })
      ctx.render('emoji/list', {
        title: 'Emoji 列表',
        data: result
      })
    } catch (e) {
      console.log('Emoji 列表：', e)
    }
  },

  newEmoji: async (ctx) => {
    try {
      ctx.render('emoji/add', {
        title: 'Emoji 添加',
        emoji: {
          expression: '',
          meaning: ''
        }
      })
    } catch (e) {
      console.log('Emoji 添加', e)
    }
  },

  findEmoji: async (ctx) => {
    const id = ctx.params.id
    try {
      if (id) {
        let emoji = await _service.findById(Emoji, id)
        emoji.dynamic = `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + emoji.expression} title=${emoji.meaning} alt=${emoji.meaning}>`
        ctx.render('emoji/add', {
          title: '更新 Emoji',
          emoji
        })
      }
    } catch (e) {
      console.log('回显 Emoji：', e)
    }
  },

  saveEmoji: async (ctx) => {
    const id = ctx.request.body.emoji._id
    let emoji = ctx.request.body.emoji
    try {
      let _emoji
      if (id) {
        let oldEmoji = await _service.findById(Emoji, id)
        _emoji = _.extend(oldEmoji, emoji)
      } else {
        _emoji = await _service.create(Emoji, emoji)
      }
      await _emoji.save()
      ctx.redirect('/admin/emojies')
    } catch (e) {
      console.log('更新 Emoji：', e)
    }
  },

  destoryEmoji: async (ctx) => {
    const id = ctx.request.query.id
    let body = {success: 1}

    try {
      if (id) {
        await _service.deleteAll(Emoji, {_id: id})
      }
    } catch (e) {
      body = {success: 0}
    } finally {
      ctx.body = body
    }
  }
}
