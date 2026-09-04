import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { treatmentCategories } from './treatmentCategories';

export const treatments = pgTable('treatments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  categoryId: integer('category_id').references(() => treatmentCategories.id),
  shortDescription: text('short_description').notNull(),
  fullContent: text('full_content').notNull(),
  imageUrl: text('image_url').default(''),
  benefits: jsonb('benefits').$type<string[]>().default([]),
  procedureSteps: jsonb('procedure_steps').$type<{ step: string; detail: string }[]>().default([]),
  suitabilityContent: text('suitability_content').default(''),
  priceText: text('price_text').default(''),
  durationText: text('duration_text').default(''),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  seoTitle: text('seo_title').default(''),
  seoDescription: text('seo_description').default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
