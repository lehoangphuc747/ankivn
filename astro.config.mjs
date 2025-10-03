// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const SITE = process.env.SITE_URL || 'https://ankivn.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'utils': ['@astrojs/react'],
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name].[hash].css';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
      },
    },
  },
  markdown: {
    gfm: true,
    smartypants: true,
  },
  integrations: [
    mdx(),
    react(),
    ...(SITE ? [sitemap()] : []),
  ],
});