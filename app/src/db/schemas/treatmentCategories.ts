import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const treatmentCategories = pgTable('treatment_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').default(''),
  sortOrder: integer('sort_order').default(0).notNull(),
});
