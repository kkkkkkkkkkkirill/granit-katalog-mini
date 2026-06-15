import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Base путь передаётся через CLI (`vite build --base=/repo/`) в Pages-workflow.
// В dev и singlefile-режиме оставляем './' — относительные пути работают
// и при file:// и при subpath.
export default defineConfig(({ mode }) => ({
  plugins:
    mode === 'singlefile'
      ? [react(), viteSingleFile()]
      : [react()],
  base: './',
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
