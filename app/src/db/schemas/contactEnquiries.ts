import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contactEnquiries = pgTable('contact_enquiries', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  subject: text('subject').default('General Inquiry').notNull(),
  message: text('message').notNull(),
  status: text('status').default('new').notNull(), // 'new', 'read', 'replied', 'archived'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
