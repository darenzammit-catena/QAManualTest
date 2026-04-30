import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/QAManualTest/',
  plugins: [react({ include: /\.(jsx|js)$/ })],
  server: {
    open: true,
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
