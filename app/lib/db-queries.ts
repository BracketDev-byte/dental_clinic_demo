import { db, cleanDbUrl } from '@/app/src';
import { neon } from '@neondatabase/serverless';
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
import { desc, eq, asc } from 'drizzle-orm';
import type {
  SiteSettings,
  ClinicStat,
  TreatmentCategory,
  Treatment,
  TeamMember,
  Review,
  SmileCase,
  BlogPost,
  AppointmentRequest,
  ContactEnquiry,
  ClinicalFaq,
  HomepageSection,
} from '@/app/lib/types';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const res = await db.select().from(siteSettings).limit(1);
    return res[0] || null;
  } catch (err) {
    console.error('Error fetching siteSettings:', err);
    return null;
  }
}

export async function getClinicStats(): Promise<ClinicStat[]> {
  try {
    return await db
      .select()
      .from(clinicStats)
      .where(eq(clinicStats.published, true))
      .orderBy(asc(clinicStats.sortOrder));
  } catch (err) {
    console.error('Error fetching clinicStats:', err);
    return [];
  }
}

export async function getTreatmentCategories(): Promise<TreatmentCategory[]> {
  try {
    return await db
      .select()
      .from(treatmentCategories)
      .orderBy(asc(treatmentCategories.sortOrder));
  } catch (err) {
    console.error('Error fetching treatmentCategories:', err);
    return [];
  }
}

export async function getFeaturedTreatments(): Promise<Treatment[]> {
  try {
    return await db
      .select()
      .from(treatments)
      .where(eq(treatments.published, true))
      .orderBy(asc(treatments.sortOrder))
      .limit(6);
  } catch (err) {
    console.error('Error fetching featured treatments:', err);
    return [];
  }
}

export async function getAllTreatments(): Promise<Treatment[]> {
  try {
    return await db
      .select()
      .from(treatments)
      .where(eq(treatments.published, true))
      .orderBy(asc(treatments.sortOrder));
  } catch (err) {
    console.error('Error fetching treatments:', err);
    return [];
  }
}

export const getTreatments = getAllTreatments;

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  try {
    const res = await db
      .select()
      .from(treatments)
      .where(eq(treatments.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch (err) {
    console.error('Error fetching treatment by slug:', err);
    return null;
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    return await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.published, true))
      .orderBy(asc(teamMembers.sortOrder));
  } catch (err) {
    console.error('Error fetching teamMembers:', err);
    return [];
  }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const res = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch (err) {
    console.error('Error fetching teamMember by slug:', err);
    return null;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.published, true))
      .orderBy(asc(reviews.sortOrder));
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return [];
  }
}

export async function getSmileCases(): Promise<SmileCase[]> {
  try {
    return await db
      .select()
      .from(smileCases)
      .where(eq(smileCases.published, true))
      .orderBy(asc(smileCases.sortOrder));
  } catch (err) {
    console.error('Error fetching smileCases:', err);
    return [];
  }
}

export async function getSmileCaseBySlug(slug: string): Promise<SmileCase | null> {
  try {
    const res = await db
      .select()
      .from(smileCases)
      .where(eq(smileCases.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch (err) {
    console.error('Error fetching smileCase by slug:', err);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedDate));
  } catch (err) {
    console.error('Error fetching blogPosts:', err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch (err) {
    console.error('Error fetching blogPost by slug:', err);
    return null;
  }
}

export async function getAppointmentRequests(): Promise<AppointmentRequest[]> {
  try {
    return await db
      .select()
      .from(appointmentRequests)
      .orderBy(desc(appointmentRequests.createdAt));
  } catch (err) {
    console.error('Error fetching appointmentRequests:', err);
    return [];
  }
}

export async function getContactEnquiries(): Promise<ContactEnquiry[]> {
  try {
    return await db
      .select()
      .from(contactEnquiries)
      .orderBy(desc(contactEnquiries.createdAt));
  } catch (err) {
    console.error('Error fetching contactEnquiries:', err);
    return [];
  }
}

export async function getClinicalFaqs(): Promise<ClinicalFaq[]> {
  try {
    return await db
      .select()
      .from(clinicalFaqs)
      .where(eq(clinicalFaqs.published, true))
      .orderBy(asc(clinicalFaqs.sortOrder));
  } catch (err) {
    console.error('Error fetching clinicalFaqs:', err);
    return [];
  }
}

export async function getAllClinicalFaqs(): Promise<ClinicalFaq[]> {
  try {
    return await db
      .select()
      .from(clinicalFaqs)
      .orderBy(asc(clinicalFaqs.sortOrder));
  } catch (err) {
    console.error('Error fetching all clinicalFaqs:', err);
    return [];
  }
}

export async function getHomepageSections(): Promise<HomepageSection[]> {
  try {
    return await db
      .select()
      .from(homepageSections)
      .orderBy(asc(homepageSections.sortOrder));
  } catch (err) {
    console.error('Error fetching homepageSections:', err);
    return [];
  }
}

export async function getHomepageSectionsMap(): Promise<Record<string, HomepageSection>> {
  try {
    const sections = await getHomepageSections();
    const map: Record<string, HomepageSection> = {};
    for (const s of sections) {
      map[s.sectionKey] = s;
    }
    return map;
  } catch (err) {
    console.error('Error getting homepage sections map:', err);
    return {};
  }
}

function snakeToCamel<T = unknown>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const n: Record<string, unknown> = {};
    for (const k of Object.keys(obj as Record<string, unknown>)) {
      const camel = k.replace(/_([a-z0-9])/g, (_, g) => g.toUpperCase());
      n[camel] = snakeToCamel((obj as Record<string, unknown>)[k]);
    }
    return n as unknown as T;
  }
  return obj as T;
}

export interface HomepageCompositeData {
  settings: SiteSettings | null;
  stats: ClinicStat[];
  treatments: Treatment[];
  team: TeamMember[];
  smileCases: SmileCase[];
  reviews: Review[];
  posts: BlogPost[];
  faqs: ClinicalFaq[];
  sections: HomepageSection[];
  sectionsMap: Record<string, HomepageSection>;
}

export async function getHomepageCompositeData(): Promise<HomepageCompositeData> {
  const dbUrl = cleanDbUrl(process.env.DATABASE_URL);
  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      const res = await sql`
        SELECT json_build_object(
          'settings', (SELECT row_to_json(s) FROM (SELECT * FROM site_settings LIMIT 1) s),
          'stats', (SELECT json_agg(st) FROM (SELECT * FROM clinic_stats WHERE published = true ORDER BY sort_order ASC) st),
          'treatments', (SELECT json_agg(t) FROM (SELECT * FROM treatments WHERE published = true ORDER BY sort_order ASC LIMIT 6) t),
          'team', (SELECT json_agg(tm) FROM (SELECT * FROM team_members WHERE published = true ORDER BY sort_order ASC) tm),
          'smileCases', (SELECT json_agg(sc) FROM (SELECT * FROM smile_cases WHERE published = true ORDER BY sort_order ASC) sc),
          'reviews', (SELECT json_agg(r) FROM (SELECT * FROM reviews WHERE published = true ORDER BY sort_order ASC) r),
          'posts', (SELECT json_agg(bp) FROM (SELECT * FROM blog_posts WHERE published = true ORDER BY published_date DESC LIMIT 3) bp),
          'faqs', (SELECT json_agg(f) FROM (SELECT * FROM clinical_faqs WHERE published = true ORDER BY sort_order ASC) f),
          'sections', (SELECT json_agg(hs) FROM (SELECT * FROM homepage_sections ORDER BY sort_order ASC) hs)
        ) AS data;
      `;
      if (res && res[0]?.data) {
        const converted = snakeToCamel<{
          settings?: SiteSettings;
          stats?: ClinicStat[];
          treatments?: Treatment[];
          team?: TeamMember[];
          smileCases?: SmileCase[];
          reviews?: Review[];
          posts?: BlogPost[];
          faqs?: ClinicalFaq[];
          sections?: HomepageSection[];
        }>(res[0].data);

        const sectionsList: HomepageSection[] = converted.sections || [];
        const sectionsMap: Record<string, HomepageSection> = {};
        for (const sec of sectionsList) {
          if (sec.sectionKey) {
            sectionsMap[sec.sectionKey] = sec;
          }
        }

        return {
          settings: converted.settings || null,
          stats: converted.stats || [],
          treatments: converted.treatments || [],
          team: converted.team || [],
          smileCases: converted.smileCases || [],
          reviews: converted.reviews || [],
          posts: converted.posts || [],
          faqs: converted.faqs || [],
          sections: sectionsList,
          sectionsMap,
        };
      }
    } catch (err) {
      console.error('Fast composite query failed, falling back to individual queries:', err);
    }
  }

  // Fallback to individual Drizzle queries if composite fails
  const [
    settings,
    stats,
    treatmentsList,
    teamList,
    casesList,
    reviewsList,
    postsList,
    faqsList,
    secMap,
    secList,
  ] = await Promise.all([
    getSiteSettings(),
    getClinicStats(),
    getFeaturedTreatments(),
    getTeamMembers(),
    getSmileCases(),
    getReviews(),
    getBlogPosts(),
    getClinicalFaqs(),
    getHomepageSectionsMap(),
    getHomepageSections(),
  ]);

  return {
    settings,
    stats,
    treatments: treatmentsList,
    team: teamList,
    smileCases: casesList,
    reviews: reviewsList,
    posts: postsList,
    faqs: faqsList,
    sections: secList,
    sectionsMap: secMap,
  };
}
