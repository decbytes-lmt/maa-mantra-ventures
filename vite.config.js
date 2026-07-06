import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/maa-mantra/',
  plugins: [react()],
  // rest stays same
})
