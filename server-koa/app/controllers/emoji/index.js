const { getEmojies } = require('../../service/emoji')

module.exports = {
  getEmojies: async (ctx) => {
    let body = {code: '01', result: ''}
    try {
      const result = await getEmojies(ctx)
      body.result = result
    } catch (e) {
      body.code = '02'
      body.result = e.message
    } finally {
      ctx.body = body
    }
  }
}
