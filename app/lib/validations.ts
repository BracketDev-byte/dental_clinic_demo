import { z } from 'zod';

export const appointmentSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(8, 'Please enter a valid phone number (e.g. +256 700 123 456)'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  preferredContact: z.enum(['WhatsApp', 'Phone Call', 'SMS', 'Email']).default('WhatsApp'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().optional().or(z.literal('')),
  preferredTime: z.string().optional().or(z.literal('')),
  patientType: z.enum(['New Patient', 'Existing Patient']).default('New Patient'),
  message: z.string().optional().or(z.literal('')),
});

export const contactEnquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(2, 'Please specify your inquiry subject'),
  message: z.string().min(5, 'Please provide more details regarding your message'),
});

export const siteSettingsSchema = z.object({
  clinicName: z.string().min(2),
  shortName: z.string().min(2),
  tagline: z.string().min(5),
  announcement: z.string(),
  announcementEnabled: z.boolean(),
  phonePrimary: z.string().min(6),
  phoneSecondary: z.string(),
  whatsappNumber: z.string().min(6),
  emailPrimary: z.string().email(),
  address: z.string().min(5),
  googleMapsUrl: z.string().optional().or(z.literal('')),
  googleMapsEmbedUrl: z.string().optional().or(z.literal('')),
  openingHours: z.string(),
  emergencyNote: z.string(),
});

export const clinicalFaqSchema = z.object({
  question: z.string().min(3, 'Question must be at least 3 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  sortOrder: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export const homepageSectionSchema = z.object({
  sectionKey: z.string().min(2),
  eyebrow: z.string().optional().default(''),
  title: z.string().min(2, 'Title is required'),
  subtitle: z.string().optional().default(''),
  description: z.string().optional().default(''),
  primaryCtaLabel: z.string().optional().default(''),
  primaryCtaUrl: z.string().optional().default(''),
  secondaryCtaLabel: z.string().optional().default(''),
  secondaryCtaUrl: z.string().optional().default(''),
  badgeText: z.string().optional().default(''),
  imageUrl: z.string().optional().default(''),
  secondaryImageUrl: z.string().optional().default(''),
  backgroundImageUrl: z.string().optional().default(''),
  visible: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});
