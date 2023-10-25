import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/apiSer': {
        target: 'https://www.fastmock.site/mock/9518df0fae3b5d6561637754c83ec80c/manager/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiSer/, '')
      }
    }
  }
})
