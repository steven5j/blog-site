import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { protectedUnlockApi } from './scripts/vite-protected-api.mjs';
import { pagefindDev } from './scripts/vite-pagefind-dev.mjs';

export default defineConfig({
  site: 'https://stevenjhu.com',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        try {
          const { pathname } = new URL(page);
          // Exclude legacy /blog/:slug paths if any appear; keep /blog/
          if (pathname.startsWith('/blog/') && pathname !== '/blog/') return false;
          if (pathname === '/search' || pathname.startsWith('/search/')) return false;
          return true;
        } catch {
          return true;
        }
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), protectedUnlockApi(), pagefindDev()],
  },
});
