import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devtool: "source-map",  // 调试专用的   上线必须干掉
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  lintOnSave: false,  // 去除eslist 的规则警告
  base: "./", // 根路径
  mode: "development",  // 代码环境  开发和生产    production
  server: {  //开发的服务器配置
    host: "0.0.0.0", // 0.0.0.0
    port: 1234,
    open: true,  // 自动打开浏览器
    proxy: {   // 反向代理
      '/api': {
        target: 'http://121.196.235.163:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  // @ => src
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  }
})
