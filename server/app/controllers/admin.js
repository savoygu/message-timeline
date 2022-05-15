const extend = require('lodash/extend')

const Message = require('../models/message')
const Emoji = require('../models/emoji')
const User = require('../models/user')

const service = require('../service')
const { getMessages } = require('../service/message')
const { getEmojis } = require('../service/emoji')
const sendMail = require('../service/email')

const FOREVER_LOVE = 1314

function replaceEmoji (emojis, content) {
  return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
    const expression = emojis.filter(emoji => emoji.meaning === p)[0].expression
    return `<img src=${'//message-timeline.gusaifei.com/emoji/' + expression} title=${p} alt=${p}>`
  })
}

function replaceMailEmoji (emojis, content, attachments) {
  const emojiMap = emojis.reduce((map, emoji) => {
    map[emoji.meaning] = emoji.expression
    return map
  }, {})

  let i = 0
  return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
    i++
    const cid = String(i).padStart(8, '0')
    const expression = emojiMap[p]
    attachments.push({
      filename: expression,
      path: 'http://message-timeline.gusaifei.com/emoji/' + expression,
      cid
    })
    return `<img src=${'cid:' + cid} title=${p} alt=${p} style='display: inline; min-height: 1.25rem; vertical-align: middle; margin: 0px 0.3125rem;'>`
  })
}

module.exports = {
  getMessages: async (ctx) => {
    try {
      const result = await getMessages(ctx)
      const emojis = await getEmojis(ctx)
      result.rows = result.rows.map(item => {
        if (item.content) {
          item.content = replaceEmoji(emojis.rows, item.content)
        }
        return item
      })
      await ctx.render('message/list', {
        title: '留言列表',
        data: result
      })
    } catch (err) {
      console.log('[admin getMessages]: ', err)
    }
  },

  findMessage: async (ctx) => {
    const { id } = ctx.params
    try {
      if (id) {
        const message = await service.findById(Message, id)
        await ctx.render('message/update', {
          title: '更新留言',
          message
        })
      }
    } catch (err) {
      console.log('[admin findMessage]', err)
    }
  },

  saveMessage: async (ctx) => {
    const { message: newMessage } = ctx.request.body
    const _id = newMessage._id
    newMessage.reviewed = newMessage.reviewed === '1'
    try {
      if (_id) {
        const oldMessage = await service.findById(Message, _id)
        const message = extend(oldMessage, newMessage)
        await message.save()
        ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log('更新留言：', e)
    }
  },

  showText: async (ctx) => {
    const { id } = ctx.params
    try {
      if (id) {
        const message = await service.findById(Message, id)
        const emojis = await getEmojis(ctx)
        message.content = replaceEmoji(emojis.rows, message.content)
        await ctx.render('message/reply', {
          title: '回复留言',
          message,
          emojis
        })
      }
    } catch (e) {
      console.log('回显回复：', e)
    }
  },

  replyMessage: async (ctx) => {
    const { message: newMessage } = ctx.request.body
    const { _id } = newMessage
    try {
      if (_id) {
        const oldMessage = await service.findById(Message, _id)
        const messageModel = extend(oldMessage, newMessage)
        if (!messageModel.reply.time) {
          messageModel.reply.time = Date.now()
        }
        const message = await messageModel.save()
        if (message.reviewed) { // 邮件通知
          const data = await getEmojis(ctx)
          const emojis = data.rows
          const attachments = []
          const content = replaceMailEmoji(emojis, message.content, attachments)
          const reply = replaceMailEmoji(emojis, message.reply.text, attachments)
          const htmlTpl = `<h3>留言：</h3>
                           <p>${content}</p>
                           <h3>TA回复：</h3>
                           <p>${reply}</p>`
          sendMail(message.email, '来自留言时间轴主人的问候', htmlTpl, attachments)
        }
        ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log('回复留言：', e)
    }
  },

  destoryMessage: async (ctx) => {
    const { id } = ctx.request.query
    let body = { success: 1 }
    try {
      if (id) {
        await service.deleteAll(Message, { _id: id })
      }
    } catch (e) {
      body = { success: 0 }
    } finally {
      ctx.body = body
    }
  },

  getEmojis: async (ctx) => {
    try {
      const result = await getEmojis(ctx)
      result.rows = result.rows.map(item => {
        item.dynamic = `<img src=${'//message-timeline.gusaifei.com/emoji/' + item.expression} title=${item.meaning} alt=${item.meaning}>`
        return item
      })
      await ctx.render('emoji/list', {
        title: 'Emoji 列表',
        data: result
      })
    } catch (e) {
      console.log('Emoji 列表：', e)
    }
  },

  newEmoji: async (ctx) => {
    try {
      await ctx.render('emoji/add', {
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
    const { id } = ctx.params
    try {
      if (id) {
        const emoji = await service.findById(Emoji, id)
        emoji.dynamic = `<img src=${'//message-timeline.gusaifei.com/emoji/' + emoji.expression} title=${emoji.meaning} alt=${emoji.meaning}>`
        await ctx.render('emoji/add', {
          title: '更新 Emoji',
          emoji
        })
      }
    } catch (e) {
      console.log('回显 Emoji：', e)
    }
  },

  saveEmoji: async (ctx) => {
    const { emoji: newEmoji } = ctx.request.body
    const { _id } = newEmoji
    try {
      let emoji
      if (_id) {
        const oldEmoji = await service.findById(Emoji, _id)
        emoji = extend(oldEmoji, newEmoji)
      } else {
        emoji = await service.create(Emoji, newEmoji)
      }
      await emoji.save()
      ctx.redirect('/admin/emojis')
    } catch (e) {
      console.log('更新 Emoji：', e)
    }
  },

  destoryEmoji: async (ctx) => {
    const { id } = ctx.request.query
    let body = { success: 1 }
    try {
      if (id) {
        await service.deleteAll(Emoji, { _id: id })
      }
    } catch (e) {
      body = { success: 0 }
    } finally {
      ctx.body = body
    }
  },

  showSignup: async (ctx) => {
    await ctx.render('user/signup', {
      title: '注册页面'
    })
  },

  showSignin: async (ctx) => {
    if (ctx.session.user) {
      ctx.redirect('/admin/messages')
      return
    }

    await ctx.render('user/signin', {
      title: '登录页面'
    })
  },

  signup: async (ctx) => {
    const { user: newUser } = ctx.request.body
    try {
      const oldUser = await service.findOne(User, { name: newUser.name })
      if (oldUser) { // 存在
        return ctx.redirect('/user/signin')
      }

      const user = await service.create(User, newUser)
      ctx.session.user = user

      return ctx.redirect('/admin/messages')
    } catch (e) {
      console.log(e)
    }
  },

  signin: async (ctx) => {
    const { user: { name, password } } = ctx.request.body

    try {
      const user = await service.findOne(User, { name })
      if (!user) {
        return ctx.redirect('/admin/user/signup')
      }

      const isMatch = await user.comparePassword(password)
      if (isMatch) {
        ctx.session.user = user

        return ctx.redirect('/admin/messages')
      } else {
        return ctx.redirect('/user/signin')
      }
    } catch (e) {
      console.log(e)
    }
  },

  logout: (ctx) => {
    delete ctx.session.user

    ctx.redirect('/user/signin')
  },

  destroyUser: async (ctx) => {
    const { id } = ctx.request.query
    let body = { success: 1 }
    try {
      if (id) {
        await service.deleteAll(User, { _id: id })
      }
    } catch (e) {
      body = { success: 0 }
    } finally {
      ctx.body = body
    }
  },

  getUsers: async function (ctx) {
    try {
      const users = await service.findAll(User, {})
      await ctx.render('user/list', {
        title: '用户列表页',
        users
      })
    } catch (e) {
      console.log(e)
    }
  },

  settingUser: async (ctx) => {
    const { id } = ctx.request.query
    let body = { success: 1 }
    try {
      if (id) {
        const user = await service.findById(User, id)
        if (user) {
          await service.update(User, { $set: { role: FOREVER_LOVE } }, { _id: id })
        } else {
          body = { success: 0 }
        }
      }
    } catch (e) {
      body = { success: 0 }
    } finally {
      ctx.body = body
    }
  }
}
