import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: [
      'liabilities-walk-assumptions-exchanges.trycloudflare.com'
    ]
  }
})