import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'jwt-decode'], // Include jwt-decode here
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000', // Proxy requests to the backend on port 5000
    },
  },
});
