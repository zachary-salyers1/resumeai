import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['@langchain/core', '@langchain/groq'],
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['zod', 'camelcase', 'decamelize'],
    exclude: ['@langchain/openai'],
    esbuildOptions: {
      target: 'es2020',
      format: 'esm',
      mainFields: ['module', 'main'],
    },
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      defaultIsModuleExports: true,
      requireReturnsDefault: 'auto'
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'langchain-vendor': ['@langchain/core', '@langchain/groq'],
        },
      },
    },
  },
});