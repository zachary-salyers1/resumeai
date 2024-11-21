import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['zod'],
    exclude: ['@langchain/openai', '@langchain/core'],
  },
  build: {
    commonjsOptions: {
      include: [],
    },
  },
});