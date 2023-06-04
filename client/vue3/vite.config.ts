import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import utilities from 'postcss-utilities'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: (env.NODE_ENV === 'production' && mode === 'gh-pages') ? '/message-timeline/' : '/',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "sass-bem-next/_bem.scss";',
        },
      },
      postcss: {
        plugins: [
          utilities(),
        ],
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [vue()],
    server: {
      port: 8080,
    },
  }
})
