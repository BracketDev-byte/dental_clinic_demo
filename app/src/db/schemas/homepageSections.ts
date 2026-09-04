import { pgTable, serial, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const homepageSections = pgTable('homepage_sections', {
  id: serial('id').primaryKey(),
  sectionKey: text('section_key').notNull().unique(),
  eyebrow: text('eyebrow').default(''),
  title: text('title').notNull(),
  subtitle: text('subtitle').default(''),
  description: text('description').default(''),
  primaryCtaLabel: text('primary_cta_label').default(''),
  primaryCtaUrl: text('primary_cta_url').default(''),
  secondaryCtaLabel: text('secondary_cta_label').default(''),
  secondaryCtaUrl: text('secondary_cta_url').default(''),
  badgeText: text('badge_text').default(''),
  imageUrl: text('image_url').default(''),
  secondaryImageUrl: text('secondary_image_url').default(''),
  backgroundImageUrl: text('background_image_url').default(''),
  visible: boolean('visible').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
