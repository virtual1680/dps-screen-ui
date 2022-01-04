import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
    },
  },
  server: {
    fs: {
      strict: false,
    },
    port: 3000,
    proxy: {
      "/api": {
        target: 'http://api.test.travel.lecent.cn/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/')
      },
    }
  },
  plugins: [vue()]
})
