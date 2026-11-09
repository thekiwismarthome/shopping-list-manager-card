import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(readFileSync(resolve(here, '../../package.json'), 'utf8'));
const REPO = 'https://github.com/thekiwismarthome/shopping-list-manager-card';
const INTEGRATION = 'https://github.com/thekiwismarthome/shopping-list-manager';

const BASE = process.env.SITE_BASE || '/shopping-list-manager-card/';

export default defineConfig({
  title: 'Shopping List Manager',
  description: 'A shared shopping list, product catalogue and loyalty card wallet for Home Assistant.',
  lang: 'en-NZ',
  // Served from /shopping-list-manager-card/ on GitHub Pages. Set SITE_BASE=/ for a custom domain.
  base: BASE,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}logo.svg` }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Shopping List Manager',
    nav: [
      { text: 'Live demo', link: '/demo' },
      { text: 'User manual', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: `v${version}`, items: [
        { text: 'Release notes', link: `${REPO}/releases` },
        { text: 'Card on GitHub', link: REPO },
        { text: 'Integration on GitHub', link: INTEGRATION },
      ] },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Start here', items: [
          { text: 'Getting started', link: '/guide/getting-started' },
        ] },
        { text: 'Using the card', items: [
          { text: 'Lists', link: '/guide/lists' },
          { text: 'Items and quantities', link: '/guide/items' },
          { text: 'Categories', link: '/guide/categories' },
          { text: 'Loyalty cards', link: '/guide/loyalty-cards' },
          { text: 'Households and groups', link: '/guide/groups' },
          { text: 'Supermarkets', link: '/guide/supermarkets' },
        ] },
        { text: 'Settings', items: [
          { text: 'Appearance', link: '/guide/appearance' },
          { text: 'Region and catalogue', link: '/guide/region-and-catalogue' },
          { text: 'Backup and restore', link: '/guide/backup-restore' },
        ] },
        { text: 'Help', items: [
          { text: 'FAQ and troubleshooting', link: '/guide/faq' },
          { text: 'Adding countries and products', link: '/guide/adding-products' },
        ] },
      ],
    },
    socialLinks: [{ icon: 'github', link: REPO }],
    search: { provider: 'local' },
    editLink: { pattern: `${REPO}/edit/main/site/:path`, text: 'Edit this page on GitHub' },
    outline: { level: [2, 3], label: 'On this page' },
    footer: { message: 'Open source under the MIT licence.', copyright: 'Shopping List Manager for Home Assistant' },
  },
  vite: { server: { fs: { allow: ['..'] } } },
});
