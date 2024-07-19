import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocess should be at the root level
  preprocess: preprocess(),

  kit: {
    adapter: adapter({out: 'build',	precompress: false, envPrefix: '', polyfill: true}),

    // No need for the files.hooks configuration
  }
};

export default config;
