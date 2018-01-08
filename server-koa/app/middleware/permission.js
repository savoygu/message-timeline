// 管理员
exports.signinRequired = async function (ctx, next) {
  const user = ctx.session.user

  if (!user) {
    return ctx.redirect('/user/signin')
  }

  await next()
}

// 管理员
exports.adminRequired = async function (ctx, next) {
  const user = ctx.session.user
  console.log(user)
  if (user.role <= 10) {
    return ctx.redirect('/user/signin')
  }

  await next()
}
