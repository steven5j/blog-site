import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const topicEnum = z.enum(['software', 'business', 'life']);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topic: topicEnum,
    series: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    wpId: z.number().optional(),
    legacyUrl: z.string().optional(),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: topicEnum,
    order: z.number().default(0),
    coverImage: z.string().optional(),
    intro: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().optional(),
    type: z.enum(['project', 'cert']),
    image: z.string().optional(),
    link: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, series, projects };
