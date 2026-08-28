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
    /** ASCII public URL slug — required when file id contains non-ASCII characters */
    slug: z
      .string()
      .regex(/^[a-zA-Z0-9._~-]+$/)
      .optional(),
    legacyUrl: z.string().optional(),
    /** Key for protected-content/{slug}.md — unlock via /api/unlock */
    protectedSlug: z.string().optional(),
    /** When true, public body is hidden; only password gate + unlocked HTML */
    protectedOnly: z.boolean().default(false),
    /** When true, unlock gate is rendered inside the post body (MDX), not at footer */
    protectedInline: z.boolean().default(false),
    /** Link to the public summary post (for protected-only pages) */
    protectedPublicUrl: z.string().optional(),
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
    credlyUrl: z.string().url().optional(),
    role: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    ctaLabel: z.string().default('點擊查看'),
    order: z.number().default(0),
  }),
});

export const collections = { blog, series, projects };
