import { pgTable, serial, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const clinicalFaqs = pgTable('clinical_faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull().default('General'),
  sortOrder: integer('sort_order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
