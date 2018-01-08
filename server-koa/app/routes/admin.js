const router = require('koa-router')()

const adminController = require('../controllers/admin')
const Permission = require('../middleware/permission')

function adminRouter (router) {
  router.get('/messages', adminController.getMessages)
  router.get('/message/:id', adminController.findMessage)
  router.post('/message', adminController.saveMessage)
  router.get('/message/reply/:id', adminController.showText)
  router.post('/message/reply', adminController.replyMessage)
  router.delete('/message', adminController.destoryMessage)

  router.get('/emojies', adminController.getEmojies)
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

// 权限已关闭
// router.use(Permission.signinRequired)
// router.use(Permission.adminRequired)

router.use(function (ctx, next) { // 获取 session 中的 user
  const _user = ctx.session.user

  ctx.state.user = _user

  return next()
})

adminRouter(router)

module.exports = router.middleware()
