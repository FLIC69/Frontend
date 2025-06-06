// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // server: {
  //   proxy: {
  //     // Anything you fetch from '/api/...' will be forwarded to 'https://172.28.69.143/...'
  //     '/api': {
  //       target: `https://${import.meta.env?.VITE_API_URL ?? "172.28.69.143"}`,
  //       changeOrigin: true,
  //       // secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),

  //       // Optional (see note below) if your backend sets cookies with a domain of 172.28.69.143.
  //       // cookieDomainRewrite: 'localhost',
  //     },
  //   },
  // },
})
