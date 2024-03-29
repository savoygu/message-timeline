import '@/assets/styles/index.scss'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
app.provide('imgURL', import.meta.env.VITE_APP_IMG_URL)
app.provide('PAGE_SIZE', 32)
app.mount('#app')
