import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  base: '/jerry-prompter/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/*.svg'],
      manifest: {
        name: 'Jerry Prompter',
        short_name: 'Prompter',
        description: '유튜브 촬영용 프롬프터 앱',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'fullscreen',
        start_url: '/jerry-prompter/',
        icons: [
          {
            src: '/jerry-prompter/icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
      },
    }),
  ],
})
