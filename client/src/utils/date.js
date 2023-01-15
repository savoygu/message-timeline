/* eslint-disable no-extend-native */
export const formatDate = (date, format) => {
  const dateMap = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const key in dateMap) {
    if (new RegExp('(' + key + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? dateMap[key] : ('00' + dateMap[key]).substr(('' + dateMap[key]).length))
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
export const timeAgo = (time) => {
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
    show = formatDate(new Date(time), 'MM-dd')
  } else {
    show = formatDate(new Date(time), 'yyyy-MM-dd')
  }
  return show
}
