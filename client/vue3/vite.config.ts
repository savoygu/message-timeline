import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import utilities from 'postcss-utilities'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./node_modules/sass-bem/_bem.scss";`
      }
    },
    postcss: {
      plugins: [
        utilities()
      ]
    }
  },
  plugins: [vue()],
  server: {
    port: 8080
  },
})
