import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  clinicName: text('clinic_name').notNull().default('Pearl Dental & Implant Clinic'),
  shortName: text('short_name').notNull().default('Pearl Dental'),
  tagline: text('tagline').notNull().default('Gentle, Honest Dental Care in Kampala'),
  announcement: text('announcement').notNull().default('Routine Dental Checkups and Consultations Open Monday through Saturday'),
  announcementEnabled: boolean('announcement_enabled').notNull().default(true),
  phonePrimary: text('phone_primary').notNull().default('+256 700 123 456'),
  phoneSecondary: text('phone_secondary').notNull().default('+256 772 987 654'),
  whatsappNumber: text('whatsapp_number').notNull().default('+256700123456'),
  emailPrimary: text('email_primary').notNull().default('care@pearldental.ug'),
  address: text('address').notNull().default('Plot 14 Acacia Avenue, Kololo, Kampala, Uganda'),
  googleMapsUrl: text('google_maps_url').default('https://maps.google.com/?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda'),
  googleMapsEmbedUrl: text('google_maps_embed_url').default('https://maps.google.com/maps?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda&t=&z=15&ie=UTF8&iwloc=&output=embed'),
  openingHours: text('opening_hours').notNull().default('Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM | Sun: Emergency On-Call'),
  emergencyNote: text('emergency_note').notNull().default('Sudden toothache or dental injury? WhatsApp or call our line directly.'),
  logoUrl: text('logo_url').default(''),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
