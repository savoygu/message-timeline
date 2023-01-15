import Vue from 'vue'
import Toast from './toast.vue'

const ToastCtor = Vue.extend(Toast)

let toastVM = null
let timer = null

function showToast ({ text, duration = 3000, appendTo = document.body }) {
  if (timer) {
    clearTimeout(timer)
    toastVM.show = false
  }

  if (!toastVM) {
    toastVM = new ToastCtor()
    const toastEl = toastVM.$mount().$el
    appendTo.appendChild(toastEl)
  }

  toastVM.text = text
  toastVM.show = true

  timer = setTimeout(() => {
    toastVM.show = false
    timer = null
  }, duration)
}

export default function install () {
  Vue.prototype.$toast = showToast
}
