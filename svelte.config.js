import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocess should be at the root level
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // No need for the files.hooks configuration
  }
};

export default config;
