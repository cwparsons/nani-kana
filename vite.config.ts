import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/nani-kana/',
  build: {
    target: 'es2020',
  },
  plugins: [
    VitePWA({ registerType: 'autoUpdate' }),
    vue()
  ],
})
