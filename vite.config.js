import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/predict': {
        target: 'https://16.171.249.240', // Your FastAPI backend
        changeOrigin: true,
        secure: false,  // Disable SSL validation
      },
    },
  },
})
