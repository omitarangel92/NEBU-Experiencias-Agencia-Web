import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = `http://127.0.0.1:${env.API_PORT || 8787}`;
  const apiProxy = { '/api': { target: apiTarget, changeOrigin: true } };

  return {
    base: '/',
    plugins: [react()],
    publicDir: 'public',
    server: { proxy: apiProxy },
    preview: { proxy: apiProxy },
  };
});