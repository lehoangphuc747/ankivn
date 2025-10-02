// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const SITE = process.env.SITE_URL || undefined;

export default defineConfig({
  site: SITE,
  output: 'static',
  compressHTML: true,
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
      rollupOptions: {
        output: {
          manualChunks: {
            'react': ['react', 'react-dom'],
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