import type { App } from 'vue'
import { createApp } from 'vue'
import Toast from './Toast.vue'

interface ToastProps {
  text: string
  duration?: number
  appendTo?: HTMLElement
}

let timer: NodeJS.Timeout | number | undefined
let toastInstance: App
let mountNode: HTMLElement

export default function createToast({
  text,
  duration = 2000,
  appendTo = document.body,
}: ToastProps) {
  if (timer) {
    clearTimeout(timer)
    clear()
  }

  toastInstance = createApp(Toast, {
    text,
    show: true,
  })

  mountNode = document.createElement('div')
  appendTo.appendChild(mountNode)
  toastInstance.mount(mountNode)

  timer = setTimeout(() => {
    clear()
    timer = undefined
  }, duration)

  function clear() {
    toastInstance.unmount()
    appendTo.removeChild(mountNode)
  }
}
