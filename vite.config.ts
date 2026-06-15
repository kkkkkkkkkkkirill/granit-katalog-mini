import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// База путей для GitHub Pages приходит через env VITE_BASE_PATH
// (например '/granit-katalog/'). В dev и singlefile-режиме оставляем
// './' — относительные пути работают и при file:// и при subpath.
const PAGES_BASE = process.env.VITE_BASE_PATH || './';

export default defineConfig(({ mode }) => ({
  plugins:
    mode === 'singlefile'
      ? [react(), viteSingleFile()]
      : [react()],
  base: mode === 'singlefile' ? './' : PAGES_BASE,
  server: {
    port: 5174,
    allowedHosts: ['.trycloudflare.com', '.cfargotunnel.com'],
  },
  build:
    mode === 'singlefile'
      ? {
          assetsInlineLimit: 100_000_000,
          cssCodeSplit: false,
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : {},
}));
