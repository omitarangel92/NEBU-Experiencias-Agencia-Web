import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = `http://127.0.0.1:${env.API_PORT || 8787}`;
  const apiProxy = { '/api': { target: apiTarget, changeOrigin: true } };
  const siteUrl = (env.VITE_SITE_URL || 'https://nebu-experiencias.vercel.app').replace(/\/$/, '');
  let outputDir;
  const siteSeo = {
    name: 'site-seo',
    configResolved(config) {
      outputDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
    closeBundle() {
      writeFileSync(resolve(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`);
      writeFileSync(resolve(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nUser-agent: GPTBot\nDisallow: /\nUser-agent: CCBot\nDisallow: /\nUser-agent: Bytespider\nDisallow: /\nUser-agent: ClaudeBot\nDisallow: /\nUser-agent: Google-Extended\nDisallow: /\nUser-agent: AhrefsBot\nDisallow: /\nUser-agent: SemrushBot\nDisallow: /\nUser-agent: MJ12bot\nDisallow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: Claude-SearchBot\nAllow: /\nUser-agent: Claude-User\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
    },
  };

  return {
    base: '/',
    define: { __SITE_URL__: JSON.stringify(siteUrl) },
    plugins: [react(), siteSeo],
    publicDir: 'public',
    server: { proxy: apiProxy },
    preview: { proxy: apiProxy },
  };
});