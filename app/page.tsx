import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { HeroSection } from '@/app/components/home/HeroSection';
import { NarrativeQuestionsSection } from '@/app/components/home/NarrativeQuestionsSection';
import { FeaturedTreatmentsSection } from '@/app/components/home/FeaturedTreatmentsSection';
import { TeamShowcaseSection } from '@/app/components/home/TeamShowcaseSection';
import { SmileGalleryPreviewSection } from '@/app/components/home/SmileGalleryPreviewSection';
import { PatientReviewsSection } from '@/app/components/home/PatientReviewsSection';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { BlogPreviewSection } from '@/app/components/home/BlogPreviewSection';
import { getHomepageCompositeData } from '@/app/lib/db-queries';

export const revalidate = 60;

export default async function HomePage() {
  const {
    settings,
    stats,
    treatments,
    team,
    smileCases,
    reviews,
    posts,
    faqs,
    sectionsMap,
  } = await getHomepageCompositeData();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <Navbar settings={settings} />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        {sectionsMap['hero']?.visible !== false && (
          <HeroSection
            settings={settings}
            stats={stats}
            section={sectionsMap['hero']}
          />
        )}

        {sectionsMap['transparency']?.visible !== false && (
          <NarrativeQuestionsSection
            faqs={faqs}
            section={sectionsMap['transparency']}
          />
        )}

        {sectionsMap['treatments']?.visible !== false && (
          <FeaturedTreatmentsSection
            treatments={treatments}
            section={sectionsMap['treatments']}
          />
        )}

        {sectionsMap['team']?.visible !== false && (
          <TeamShowcaseSection
            team={team}
            section={sectionsMap['team']}
          />
        )}

        {sectionsMap['gallery']?.visible !== false && (
          <SmileGalleryPreviewSection
            cases={smileCases}
            section={sectionsMap['gallery']}
          />
        )}

        {sectionsMap['reviews']?.visible !== false && (
          <PatientReviewsSection
            reviews={reviews}
            section={sectionsMap['reviews']}
          />
        )}

        {sectionsMap['booking']?.visible !== false && (
          <BookingCtaSection
            settings={settings}
            section={sectionsMap['booking']}
          />
        )}

        {sectionsMap['blog']?.visible !== false && (
          <BlogPreviewSection
            posts={posts}
            section={sectionsMap['blog']}
          />
        )}
      </main>

      <Footer settings={settings} />
    </div>
  );
}
