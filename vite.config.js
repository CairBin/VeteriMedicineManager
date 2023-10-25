import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/apiSer': {
        //target: 'https://www.fastmock.site/mock/9518df0fae3b5d6561637754c83ec80c/manager/',
        target:'http://192.168.0.16:5005/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apiSer/, '')
      },
      '/imgSer':{
        target:'http://192.168.0.16:7070/c/medicine/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/imgSer/, '')
      }
    }
  }
})
