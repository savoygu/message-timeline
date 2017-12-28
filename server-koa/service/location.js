const request = require('request')
const URL = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='

export function getIpInfo (ip) {
  return new Promise(function (resolve, reject) {
    request.get(URL + ip).then(function (response) {
      resolve(response.body)
    })
  })
}
