import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

type SchemaContext = { image: () => any };

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			authors: z.array(z.string()).optional(),
			toc: z.boolean().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			year: z.number(),
			status: z.string().default('Completed'),
			role: z.string().optional(),
			organization: z.string().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			externalLinks: z
				.array(z.object({ label: z.string(), href: z.string() }))
				.optional(),
			featured: z.boolean().optional(),
			order: z.number().optional(),
		}),
});

const prompts = defineCollection({
	loader: glob({ base: './src/content/prompts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }: SchemaContext) =>
		z.object({
			title: z.string(),
			description: z.string(),
			suite: z.string().optional(),
			lastUpdated: z.coerce.date(),
			order: z.number().optional(),
			tags: z.array(z.string()).optional(),
			heroImage: image().optional(),
		}),
});

const tutorials = defineCollection({
	loader: glob({ base: './src/content/tutorials', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			category: z.enum([
				'Getting Started',
				'Under the Hood',
				'Working with Agents',
				'Workflow Patterns',
				'Deep Dives',
			]),
			series: z.enum(['core', 'deep-dive']).default('core'),
			order: z.number().optional(),
			duration: z.string().optional(),
			status: z.enum(['Coming Soon', 'In Production', 'Published']).default('Coming Soon'),
			videoUrl: z.string().optional(),
			videoThumbnail: z.string().optional(),
			learn: z.array(z.string()).optional(),
			recommendedNext: z
				.array(z.object({ title: z.string(), href: z.string() }))
				.optional(),
			notes: z
				.array(z.object({ label: z.string(), href: z.string() }))
				.optional(),
			showOnIndex: z.boolean().default(true),
		}),
});

export const collections = { blog, projects, prompts, tutorials };
