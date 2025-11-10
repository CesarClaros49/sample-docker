import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const backendUrl = process.env.VITE_API_URL || 'http://localhost:3001/api/todos';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3000,
    allowedHosts: ["*"],
    proxy:  {
      '/api/todos': {
        target: backendUrl,
        changeOrigin: true,
        secure: false
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api/todos': {
        target: backendUrl,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
