import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                 // ✅ allow external access
    allowedHosts: 'all',        // ✅ allow ngrok domain
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'gsap'],
          'graphics': ['three'],
          'ui-icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})