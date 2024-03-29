export function on(element: HTMLElement | Window, event: string, handler: EventListener) {
  if (element && event && handler)
    element.addEventListener(event, handler, false)
}

export function off(element: HTMLElement | Window, event: string, handler: EventListener) {
  if (element && event)
    element.removeEventListener(event, handler, false)
}

export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls)
    return false
  if (cls.includes(' '))
    throw new Error('className should not contain space.')
  if (el.classList)
    return el.classList.contains(cls)

  else
    return (` ${el.className} `).includes(` ${cls} `)
}

export function addClass(el: HTMLElement, cls: string) {
  if (!el)
    return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (el.classList) { // IE9+
      el.classList.add(clsName)
    }
    else {
      if (!hasClass(el, clsName))
        curClass += ` ${clsName}`
    }
  }
  if (!el.classList)
    el.className = curClass
}

export function trim(str = '') {
  return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls)
    return
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, len = classes.length; i < len; i++) {
    const clsName = classes[i]
    if (!clsName)
      return

    if (el.classList) {
      el.classList.remove(clsName)
    }
    else {
      if (hasClass(el, clsName))
        curClass = curClass.replace(` ${clsName} `, ' ')
    }
  }
  if (!el.classList)
    el.className = trim(curClass)
}
