import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  role: text('role').notNull(),
  qualifications: text('qualifications').notNull(),
  portraitUrl: text('portrait_url').default(''),
  shortBio: text('short_bio').notNull(),
  fullBio: text('full_bio').notNull(),
  specialties: jsonb('specialties').$type<string[]>().default([]),
  yearsExperience: integer('years_experience').default(5).notNull(),
  registrationInfo: text('registration_info').default(''),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
