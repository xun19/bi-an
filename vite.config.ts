import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 若__dirname报lint，则需要安装 @types/node
      // 为了ts不报lint，还得在tsconfig.json里配置 path
      '@': path.resolve(__dirname, 'src')
    }
  }
})
