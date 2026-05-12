import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://the-rake.netlify.app',
  output: 'static',
  integrations: [react()],
});
