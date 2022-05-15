const { getEmojis } = require('../../service/emoji')

module.exports = {
  getEmojis: async (ctx) => {
    const body = { code: '01', result: '' }
    try {
      const result = await getEmojis(ctx)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  }
}
