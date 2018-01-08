const request = require('request')
const superagent = require('superagent')
const URL = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='

const _location = module.exports = {}

/**
 * 根据ip地址获取用户位置信息
 * @param {*String} ip ip地址
 */
_location.getLocationInfo = function (ip) {
  return new Promise(function (resolve, reject) {
    request({url: URL + ip, json: true}, function (err, res, body) {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
}

/**
 * 开发获取访问者 ip ，线上获取不到
 */
_location.getIp = function () {
  return new Promise(function (resolve, reject) {
    superagent
      .get('http://www.ip.cn/')
      .set('User-Agent', 'curl/7.31.1')
      .end(function (err, res) {
        if (err) {
          reject(err)
        } else {
          const ip = res.text.match(/\d+\.\d+\.\d+\.\d+/)[0]
          resolve(ip)
        }
      })
  })
}

/**
 * 线上获取访问者 ip
 */
_location.getClientIp = function (req) {
  return req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress
}
