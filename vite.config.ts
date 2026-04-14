import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),basicSsl(),VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // para probar PWA en desarrollo
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Accesos ACHSA',        
        short_name: 'ACHACCESS',           
        description: 'Aplicacion para gestionar accesos en ACHSA', 
        theme_color: '#0a873f',       
        background_color: '#ffffff',
        display: 'standalone',  
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })],
  server: {
    host: true,
  },
  preview: {
    host: true
  }
})
