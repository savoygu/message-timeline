const service = require('../service')
const User = require('../models/user')

// 管理员
exports.signinRequired = async (ctx, next) => {
  const user = ctx.session.user
  if (!user) {
    return ctx.redirect('/user/signin')
  }
  await next()
}

// 管理员
exports.adminRequired = async (ctx, next) => {
  const user = ctx.session.user
  if (user.role <= 10) {
    const newUser = await service.findOne(User, { _id: user._id })
    if (newUser.role <= 10) {
      return ctx.redirect('/user/signin')
    }
    ctx.session.user = newUser // 更新
    return await next()
  }
  await next()
}
