import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const clinicStats = pgTable('clinic_stats', {
  id: serial('id').primaryKey(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  description: text('description').default(''),
  sortOrder: integer('sort_order').default(0).notNull(),
  published: boolean('published').default(true).notNull(),
});
