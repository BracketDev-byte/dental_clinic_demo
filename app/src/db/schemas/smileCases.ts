import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const smileCases = pgTable('smile_cases', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  treatment: text('treatment').notNull(),
  description: text('description').notNull(),
  caseDetails: text('case_details').default(''),
  beforeImageUrl: text('before_image_url').default(''),
  afterImageUrl: text('after_image_url').default(''),
  patientLabel: text('patient_label').default('Kampala Patient'),
  featured: boolean('featured').default(true).notNull(),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
