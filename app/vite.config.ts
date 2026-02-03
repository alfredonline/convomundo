import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://convomundo.com'

/** SPA routes for sitemap (plugin may also add / from index.html). */
const sitemapRoutes = ['/languages', '/work-with-us']

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: sitemapRoutes,
      exclude: [],
      generateRobotsTxt: true,
    }),
  ],
})
