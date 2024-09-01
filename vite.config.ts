import { defineConfig } from 'vite'

export default defineConfig({
  base: '/FutGuesser/',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.football-data.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})