/* eslint-disable no-extend-native */
Date.prototype.format = function (format) {
  var date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
                         ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时28分钟15秒
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export default function timeToDate (time) {
  console.log(time)
    // 获取当前时间戳
  const createTime = parseInt(new Date(time).getTime() / 1000)
  const currentTime = parseInt(new Date().getTime() / 1000)
  const diffTime = currentTime - createTime

  let show = ''
  if (diffTime === 0) {
    show = '刚刚'
  } else if (diffTime < 60) {
    show = parseInt(diffTime) + '秒前'
  } else if (diffTime < 60 * 60) {
    show = parseInt(diffTime / 60) + '分前'
  } else if (diffTime < 60 * 60 * 24) {
    show = parseInt(diffTime / (60 * 60)) + '小时前'
  } else if (diffTime < 60 * 60 * 24 * 7) {
    show = parseInt(diffTime / (60 * 60 * 24)) + '天前'
  } else if (diffTime < 60 * 60 * 24 * 365) {
    show = new Date(time).format('MM-dd')
  } else {
    show = new Date(time).format('yyyy-MM-dd')
  }
  return show
}
