const request = require('request')
const superagent = require('superagent')
const URL = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='

const _location = module.exports = {}

_location.getLocationInfo = function (ip) {
  return new Promise(function (resolve, reject) {
    request.get(URL + ip).then(function (response) {
      resolve(response.body)
    })
  })
}

_location.getIp = function () {
  return new Promise(function (resolve, reject) {
    superagent
      .get('http://ip.cn/')
      .set('User-Agent', 'curl/7.31.1')
      .end(function (err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
  })
}
