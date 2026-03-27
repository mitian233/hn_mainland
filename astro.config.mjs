// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel({
		isr: {
			// Cache for 5 minutes, then regenerate on next request
			expiration: 300
		}
	})
});
