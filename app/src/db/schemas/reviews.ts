import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  patientName: text('patient_name').notNull(),
  reviewText: text('review_text').notNull(),
  rating: integer('rating').notNull().default(5),
  treatment: text('treatment').default('General Dentistry'),
  source: text('source').default('Google Reviews'),
  imageUrl: text('image_url').default(''),
  featured: boolean('featured').default(true).notNull(),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
