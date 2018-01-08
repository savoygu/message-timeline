const _ = require('underscore')
const _s = require('underscore.string')
const Message = require('../models/message')
const Emoji = require('../models/emoji')
const User = require('../models/user')
const _service = require('../service')
const { getMessages } = require('../service/message')
const { getEmojies } = require('../service/emoji')
const sendMail = require('../service/email')
// const EMOJIES = require('./emojies')
const FOREVER_LOVE = 1314

function replaceEmoji (emojies, content) {
  return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
    let expression = emojies.filter(emoji => emoji.meaning === p)[0].expression
    return `<img src=${'//timeline.creation.gusaifei.com/emoji/expression/' + expression} title=${p} alt=${p}>`
  })
}

function replaceMailEmoji (emojies, content, attachments) {
  let i = 0
  return content.replace(/\[q:(.{1,3})\]/g, function (match, p, offset, string) {
    i++
    // let cid = String(i).padStart(8, '0')
    let cid = _s.pad(i + '', 8, '0')
    let expression = emojies.filter(emoji => emoji.meaning === p)[0].expression
    attachments.push({
      filename: expression,
      path: 'http://timeline.creation.gusaifei.com/emoji/expression/' + expression,
      cid: cid
    })
    return `<img src=${'cid:' + cid} title=${p} alt=${p} style='display: inline; min-height: 1.25rem; vertical-align: middle; margin: 0px 0.3125rem;'>`
  })
}

module.exports = {
  getMessages: async (ctx) => {
    try {
      const result = await getMessages(ctx)
      const emojies = await getEmojies(ctx)
      result.rows = result.rows.map(item => {
        if (!item.content) {
          return item
        }
        item.content = replaceEmoji(emojies.rows, item.content)
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
        const emojies = await getEmojies(ctx)
        message.content = replaceEmoji(emojies.rows, message.content)
        ctx.render('message/reply', {
          title: '回复留言',
          message,
          emojies
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
        if (!_message.reply.time) {
          _message.reply.time = Date.now()
        }
        const newMessage = await _message.save()
        if (newMessage.reviewed) { // 邮件通知
          const data = await getEmojies(ctx)
          const emojies = data.rows
          let attachments = []
          const content = replaceMailEmoji(emojies, newMessage.content, attachments)
          const reply = replaceMailEmoji(emojies, newMessage.reply.text, attachments)
          const htmlTpl = `<h3>你说：</h3>
                           <p>${content}</p>
                           <h3>她说：</h3>
                           <p>${reply}</p>`
          sendMail(newMessage.email, '来自时间轴主人的问候', htmlTpl, attachments)
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
  },

  showSignup: (ctx) => {
    ctx.render('user/signup', {
      title: '注册页面'
    })
  },

  showSignin: (ctx) => {
    ctx.render('user/signin', {
      title: '登录页面'
    })
  },

  signup: async (ctx) => {
    const _user = ctx.request.body.user
    try {
      let oldUser = await _service.findOne(User, {name: _user.name})
      if (oldUser) { // 存在
        return ctx.redirect('/user/signin')
      } else {
        let user = new User(_user)
        let newUser = user.save()
        ctx.session.user = newUser

        return ctx.redirect('/admin/messages')
      }
    } catch (e) {
      console.log(e)
    }
  },

  signin: async (ctx) => {
    const _user = ctx.request.body.user
    const name = _user.name
    const password = _user.password

    try {
      let user = await _service.findOne(User, {name: name})
      if (!user) {
        return ctx.redirect('/admin/user/signup')
      }

      let isMatch = await user.comparePassword(password)
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
    const id = ctx.request.query.id
    let body = {success: 1}

    try {
      if (id) {
        await _service.deleteAll(User, {_id: id})
      }
    } catch (e) {
      body = {success: 0}
    } finally {
      ctx.body = body
    }
  },

  getUsers: async function (ctx) {
    try {
      let users = await _service.findAll(User, {})
      ctx.render('user/list', {
        title: '用户列表页',
        users: users
      })
    } catch (e) {
      console.log(e)
    }
  },

  settingUser: async (ctx) => {
    const id = ctx.request.query.id
    let body = {success: 1}
    try {
      if (id) {
        let user = await _service.findById(User, id)
        if (user) {
          await _service.update(User, {$set: {role: FOREVER_LOVE}}, {_id: id})
        } else {
          body = {success: 0}
        }
      }
    } catch (e) {
      body = {success: 0}
    } finally {
      ctx.body = body
    }
  }
}
