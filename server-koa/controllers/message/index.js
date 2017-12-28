const proxyaddr = require('proxy-addr')
const message = require('../../models/message')
const _service = require('../../service')
const { getIpInfo } = require('../../service/location')

module.exports = {
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

  findMessage: async (ctx) => {},

  addMessage: async (ctx) => {
    let body = {code: '01', result: ''}
    try {
      let nickname = ctx.request.body.nickname || ctx.request.query.nickname
      let content = ctx.request.body.content || ctx.request.query.content
      let email = ctx.request.body.email || ctx.request.query.email
      console.log(nickname, content, email)
      console.log(proxyaddr.all(ctx.req))
      // let location = await getIpInfo()

      // let messageModel = {
      //   nick,
      //   contents,
      //   email
      // }
      // let result = await _service.create(message, messageModel)
      // body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  },

  updateMessage: async (ctx) => {},

  destoryMessage: async (ctx) => {},

  replyMessage: async (ctx) => {}
}
