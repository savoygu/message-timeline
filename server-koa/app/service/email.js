/**
 *
 * @Description 邮件发送 sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor https://github.com/amor520
 * @Created 2016/04/26 15:10
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

/**
 *
 * 支持的服务:'1und1','AOL','DebugMail.io','DynectEmail','FastMail',
 * 'GandiMail','Gmail','Godaddy','GodaddyAsia','GodaddyEurope','hot.ee',
 * 'Hotmail','iCloud','mail.ee','Mail.ru','Mailgun','Mailjet','Mandrill',
 * 'Naver','OpenMailBox','Postmark','QQ','QQex','SendCloud','SendGrid',
 * 'SES','SES-US-EAST-1','SES-US-WEST-1','SES-EU-WEST-1','Sparkpost','Yahoo',
 * 'Yandex','Zoho'
 * email: {
 *   service: 'QQ',
 *   user: '邮箱',
 *   pass: '密码',
 * }
 */
// 邮件配置
const config = require('./config')

// 根据配置文件生成 smtpTransport
const transporter = nodemailer.createTransport(smtpTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}))

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
const sendMail = function (recipient, subject, html, attachments) {
  transporter.sendMail({

    from: config.email.user,
    to: recipient,
    subject: subject,
    html: html,
    attachments: attachments

  }, function (error, response) {
    if (error) {
      console.log(error)
      return
    }
    console.log('发送成功')
  })
}

module.exports = sendMail
