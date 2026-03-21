import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { crx } from '@crxjs/vite-plugin'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import manifest from './manifest.config'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    crx({ manifest }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
  ],
  // 强烈建议（开发体验更好）
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
    },
    cors: true,                  // content script / background 更稳定
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 如果你有多个 HTML 入口（popup + sidepanel + options），在这里声明
    rollupOptions: {
      input: {
        main: 'index.html',      // 默认的 Vue 入口
        // popup: 'popup.html',   // 如果有多个页面可加
      },
    },
  },

  // 重要：确保资源路径正确（CRXJS 会帮你处理大部分）
  base: './',                    // 或保持 '/'，两种都可行，看情况
})

