const config = {
  appName: 'message-timeline',
  host: '127.0.0.1',
  port: 3000,
  database: {
    host: 'localhost',
    db: 'message-timeline'
  },
  imgURL: process.env.IMG_URL || '//img.mt.gusaifei.com',
  permission: 100 // [1, 10] 开启登录访问权限, (10,) 开启管理员访问权限
}

module.exports = config
