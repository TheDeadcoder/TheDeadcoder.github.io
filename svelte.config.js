// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     adapter: adapter()
//   },
//   preprocess: vitePreprocess()
// };
// export default config;

import adapter from '@sveltejs/adapter-static'; // Replace adapter-auto
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : '', // Set base path for GitHub Pages
    },
    prerender: {
      entries: ['*', '/sitemap.xml'] 
    }
  },
  preprocess: vitePreprocess()
};
export default config;