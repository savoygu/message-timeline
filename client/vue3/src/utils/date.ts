export const formatDate = (date: Date, format: string): string => {
  const dateMap = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds(),
  }

  format = format.replace(/(y+)/, (_, $1) => {
    return `${date.getFullYear()}`.substring(4 - $1.length)
  })

  for (const [k, v] of Object.entries(dateMap)) {
    format = format.replace((new RegExp(`(${k})`)), (_, $1) => {
      return `${v}`.padStart($1.length, '0')
    })
  }

  return format
}

/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时28分钟15秒
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export const timeAgo = (time: string) => {
  // 获取当前时间戳
  const createTime = ~~(new Date(time).getTime() / 1000)
  const currentTime = ~~(new Date().getTime() / 1000)
  const diffTime = currentTime - createTime

  let ago = ''
  if (diffTime === 0)
    ago = '刚刚'

  else if (diffTime < 60)
    ago = `${~~diffTime}秒前`

  else if (diffTime < 60 * 60)
    ago = `${~~(diffTime / 60)}分前`

  else if (diffTime < 60 * 60 * 24)
    ago = `${~~(diffTime / (60 * 60))}小时前`

  else if (diffTime < 60 * 60 * 24 * 7)
    ago = `${~~(diffTime / (60 * 60 * 24))}天前`

  else if (diffTime < 60 * 60 * 24 * 365)
    ago = formatDate(new Date(time), 'MM-dd')

  else
    ago = formatDate(new Date(time), 'yyyy-MM-dd')

  return ago
}
