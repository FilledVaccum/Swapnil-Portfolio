import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const paperself = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paperself' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    year: z.number(),
    tags: z.array(z.string()),
    link: z.string().url(),
    rating: z.number().min(1).max(5).optional(),
    draft: z.boolean().default(false),
  }),
});

const bookself = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bookself' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    status: z.enum(['reading', 'finished', 'abandoned']),
    draft: z.boolean().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    video: z.string().url().optional(),
    slides: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const diagrams = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diagrams' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    tech: z.array(z.string()),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const ai = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ai' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    embed_url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  paperself,
  bookself,
  talks,
  diagrams,
  projects,
  ai,
  demos,
};
