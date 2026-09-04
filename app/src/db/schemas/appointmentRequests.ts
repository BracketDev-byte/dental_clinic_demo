import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const appointmentRequests = pgTable('appointment_requests', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').default(''),
  preferredContact: text('preferred_contact').default('WhatsApp').notNull(),
  service: text('service').default('General Checkup').notNull(),
  preferredDate: text('preferred_date').default(''),
  preferredTime: text('preferred_time').default('Morning (9:00 AM - 12:00 PM)'),
  patientType: text('patient_type').default('New Patient').notNull(),
  message: text('message').default(''),
  status: text('status').default('new').notNull(), // 'new', 'contacted', 'confirmed', 'completed', 'cancelled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
