const gravatar = require('gravatar')
const message = require('../../models/message')
const service = require('../../service')
const { getMessages } = require('../../service/message')
const { getLocationInfo, getIp } = require('../../service/location')

module.exports = {
  getMessages: async (ctx) => {
    const body = { code: '01', result: '' }
    try {
      const result = await getMessages(ctx)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  },

  addMessage: async (ctx) => {
    const body = { code: '01', result: '' }
    try {
      const { body: bodyParam, query: queryParam } = ctx.request
      const nickname = bodyParam.nickname || queryParam.nickname
      const content = bodyParam.content || queryParam.content
      const email = bodyParam.email || queryParam.email
      const notice = bodyParam.notice || queryParam.notice

      const ip = await getIp()
      console.log('ip：', ip)
      const location = await getLocationInfo(ip)
      console.log('location：', location)

      let avatar = gravatar.url(email, { s: '100' })
      const qqREG = /^(.{1,})@qq\.com$/
      if (qqREG.test(email)) {
        const qq = email.replace(qqREG, '$1')
        avatar = `//q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`
      }

      const messageModel = {
        nickname,
        content,
        email,
        location: {
          ip,
          country: location.country,
          province: location.province || location.region,
          city: location.city,
          district: location.district || location.area
        },
        avatar,
        reviewed: notice
      }
      const result = await service.create(message, messageModel)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  }
}
