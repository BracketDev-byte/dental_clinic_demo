import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import {
  siteSettings,
  clinicStats,
  treatmentCategories,
  treatments,
  teamMembers,
  reviews,
  smileCases,
  blogPosts,
  appointmentRequests,
  contactEnquiries,
  clinicalFaqs,
  homepageSections,
} from '@/app/src/db/schemaExports';

// Derived Select types
export type SiteSettings = InferSelectModel<typeof siteSettings>;
export type ClinicStat = InferSelectModel<typeof clinicStats>;
export type TreatmentCategory = InferSelectModel<typeof treatmentCategories>;
export type Treatment = InferSelectModel<typeof treatments>;
export type TeamMember = InferSelectModel<typeof teamMembers>;
export type Review = InferSelectModel<typeof reviews>;
export type SmileCase = InferSelectModel<typeof smileCases>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type AppointmentRequest = InferSelectModel<typeof appointmentRequests>;
export type ContactEnquiry = InferSelectModel<typeof contactEnquiries>;
export type ClinicalFaq = InferSelectModel<typeof clinicalFaqs>;
export type HomepageSection = InferSelectModel<typeof homepageSections>;

// Derived Insert types for mutations & forms
export type NewSiteSettings = InferInsertModel<typeof siteSettings>;
export type NewClinicStat = InferInsertModel<typeof clinicStats>;
export type NewTreatmentCategory = InferInsertModel<typeof treatmentCategories>;
export type NewTreatment = InferInsertModel<typeof treatments>;
export type NewTeamMember = InferInsertModel<typeof teamMembers>;
export type NewReview = InferInsertModel<typeof reviews>;
export type NewSmileCase = InferInsertModel<typeof smileCases>;
export type NewBlogPost = InferInsertModel<typeof blogPosts>;
export type NewAppointmentRequest = InferInsertModel<typeof appointmentRequests>;
export type NewContactEnquiry = InferInsertModel<typeof contactEnquiries>;
export type NewClinicalFaq = InferInsertModel<typeof clinicalFaqs>;
export type NewHomepageSection = InferInsertModel<typeof homepageSections>;
