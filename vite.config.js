import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    host: 'localhost', // 本地测试地址（默认为 localhost）
    port: 8080, // 本地测试端口（默认为 8080）
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      exclude: ['babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/object/keys']
    }
  }
})
