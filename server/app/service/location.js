const bent = require('bent')
const formurlencoded = require('form-urlencoded')
const superagent = require('superagent')

const post = bent('https://ip.taobao.com', 'POST', 'json')

module.exports = {
  /**
   * 根据ip地址获取用户位置信息
   * @param {*String} ip ip地址
   */
  getLocationInfo: async (ip) => {
    try {
      const res = await post('/outGetIpInfo', formurlencoded({
        ip,
        accessKey: 'alibaba-inc'
      }), {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
      return res.data
    } catch (err) {
      console.log('[location getLocationInfo]: ', err)
    }
  },
  /**
   * 开发获取访问者 ip ，线上获取不到
   */
  getIp: async () => {
    try {
      const res = await superagent
        .get('https://tool.lu/ip/')
        .set('User-Agent', 'curl/7.31.1')
      return res.text.match(/\d+\.\d+\.\d+\.\d+/)[0]
    } catch (err) {
      console.log('[location getIp]: ', err)
    }
  },

  /**
   * 线上获取访问者 ip
   */
  getClientIp: (req) => {
    return req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
  }
}
