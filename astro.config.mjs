// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	site: 'https://learningdesign.works',
	integrations: [
		mdx(),
		sitemap()
	],
	markdown: {
		// Disable Shiki — verbatim prompts are plain text, not code, and Shiki injects
		// inline backgrounds that fight our theme.
		syntaxHighlight: false,
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex]
	},
	build: {
		inlineStylesheets: 'always',
	},
});
