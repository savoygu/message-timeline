const router = require('koa-router')()
const adminController = require('../../controllers/admin')

router.get('/user/signin', adminController.showSignin)
router.post('/user/signin', adminController.signin)
router.get('*', (ctx) => {
  ctx.render('404', {
    title: '404页面'
  })
})

module.exports = router.middleware()
