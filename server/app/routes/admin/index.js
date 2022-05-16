const Router = require('@koa/router')
const router = new Router()

const adminController = require('../../controllers/admin')

function adminRouter (router) {
  router.get('/messages', adminController.getMessages)
  router.get('/message/:id', adminController.findMessage)
  router.post('/message', adminController.saveMessage)
  router.get('/message/reply/:id', adminController.showText)
  router.post('/message/reply', adminController.replyMessage)
  router.delete('/message', adminController.destoryMessage)

  router.get('/emojis', adminController.getEmojis)
  router.get('/emoji', adminController.newEmoji)
  router.get('/emoji/:id', adminController.findEmoji)
  router.post('/emoji', adminController.saveEmoji)
  router.delete('/emoji', adminController.destoryEmoji)

  router.get('/user/signup', adminController.showSignup)
  router.post('/user/signup', adminController.signup)
  router.get('/user/logout', adminController.logout)
  router.delete('/user', adminController.destroyUser)
  router.get('/users', adminController.getUsers)
  router.get('/user/setting', adminController.settingUser)
}

// 权限设置
const config = require('../../../config')
if (config.permission > 0) {
  const Permission = require('../../middleware/permission')
  router.use(Permission.signinRequired)
  if (config.permission > 10) router.use(Permission.adminRequired)
}

router.use(async (ctx, next) => { // 获取 session 中的 user
  ctx.state.user = ctx.session.user

  await next()
})

adminRouter(router)

module.exports = router
