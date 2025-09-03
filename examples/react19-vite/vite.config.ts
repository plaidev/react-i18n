import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dev-only alias to the local build output so we can consume the library
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@plaidev/react-i18n': path.resolve(__dirname, '../../dist/index.es.js')
    }
  }
})


