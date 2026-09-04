import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  coverImageUrl: text('cover_image_url').default(''),
  content: text('content').notNull(),
  author: text('author').default('Pearl Dental Clinical Team').notNull(),
  category: text('category').default('Oral Health Advice').notNull(),
  published: boolean('published').default(true).notNull(),
  featured: boolean('featured').default(false).notNull(),
  publishedDate: timestamp('published_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
