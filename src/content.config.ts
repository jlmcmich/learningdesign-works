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

export const collections = { blog, projects, prompts };
