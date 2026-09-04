import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import { getSiteSettings, getSmileCases } from '@/app/lib/db-queries';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Smile Gallery & Case Studies | Pearl Dental Kampala',
  description: 'View before and after smile transformations completed at Pearl Dental Clinic in Kololo, Kampala. Gap closure, fluorosis stain clearing, and restorative ceramic crowns.',
};

export default async function SmileGalleryPage() {
  const [settings, cases] = await Promise.all([
    getSiteSettings(),
    getSmileCases(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Clinical Case Studies
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Real Smile Transformations in Kampala
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Every smile tells a story. Explore actual treatment results completed by our dental team in Kololo, preserving healthy tooth structure while restoring aesthetic confidence.
            </p>
          </div>
        </section>

        {/* Gallery Cards Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {cases.map((c) => (
                <div
                  key={c.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#F8FDFE] border border-cyan-100 shadow-2xs space-y-5"
                >
                  {/* Case Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block text-xs font-semibold text-cyan-800 bg-cyan-100/70 px-3 py-0.5 rounded-full">
                        {c.treatment}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 font-sans mt-2">
                        {c.title}
                      </h2>
                    </div>
                    {c.patientLabel && (
                      <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
                        {c.patientLabel}
                      </span>
                    )}
                  </div>

                  {/* Side-by-side Before & After Images */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* Before Image */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Before Treatment
                      </p>
                      {/* TODO: Add before-treatment image URL */}
                      <PlaceholderImage
                        label="Before Treatment"
                        comment="TODO: Add before-treatment image URL"
                        aspect="aspect-[4/3]"
                        imageUrl={c.beforeImageUrl || undefined}
                      />
                    </div>

                    {/* After Image */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-700" />
                        <span>After Treatment</span>
                      </p>
                      {/* TODO: Add after-treatment image URL */}
                      <PlaceholderImage
                        label="After Treatment"
                        comment="TODO: Add after-treatment image URL"
                        aspect="aspect-[4/3]"
                        imageUrl={c.afterImageUrl || undefined}
                      />
                    </div>
                  </div>

                  {/* Case Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {c.description}
                  </p>

                  {/* Booking CTA for this treatment */}
                  <div className="pt-4 border-t border-cyan-100/70 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Want similar results?
                    </span>
                    <Link
                      href={`/book?service=${encodeURIComponent(c.treatment)}`}
                      className="text-xs font-semibold text-cyan-900 hover:text-cyan-700 underline"
                    >
                      Book a smile consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Photography Privacy */}
            <div className="mt-16 text-center max-w-xl mx-auto text-xs text-slate-500">
              <p>
                All clinical photography is published with express written patient consent. Individual treatment results vary depending on jaw structure, oral hygiene, and bone density.
              </p>
            </div>
          </div>
        </section>

        <BookingCtaSection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
