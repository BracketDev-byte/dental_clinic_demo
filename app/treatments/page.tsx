import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { getSiteSettings, getTreatments, getTreatmentCategories } from '@/app/lib/db-queries';
import { Clock, Tag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Dental Treatments & Procedures | Pearl Dental Kampala',
  description: 'Comprehensive dental treatments in Kampala: routine hygiene, tooth extractions, root canals, ceramic crowns, teeth whitening, and orthodontic braces.',
};

export default async function TreatmentsPage() {
  const [settings, treatments, categories] = await Promise.all([
    getSiteSettings(),
    getTreatments(),
    getTreatmentCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Dental Services Directory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Gentle, Modern Dental Treatments in Kampala
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Every procedure is carried out using modern techniques designed to minimize discomfort, protect your natural tooth structure, and deliver long-lasting oral health.
            </p>
          </div>
        </section>

        {/* Treatments Directory */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category summary tags */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">
                  Clinical Focus Areas:
                </span>
                {categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs font-medium text-cyan-900 bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-full"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            {/* Treatment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between p-7 rounded-2xl bg-[#F8FDFE] border border-cyan-100 shadow-2xs hover:shadow-md hover:border-cyan-300 transition-all"
                >
                  <div>
                    {/* Time & Price Badge */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      {t.durationText && (
                        <span className="flex items-center gap-1 text-cyan-800 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {t.durationText}
                        </span>
                      )}

                      {t.priceText && (
                        <span className="flex items-center gap-1 font-semibold text-slate-900 bg-white border border-cyan-200 px-2.5 py-0.5 rounded">
                          <Tag className="w-3 h-3 text-cyan-700" />
                          {t.priceText}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 font-sans">
                      <Link href={`/treatments/${t.slug}`} className="hover:text-cyan-800 transition-colors">
                        {t.name}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {t.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-4 border-t border-cyan-100 flex items-center justify-between">
                    <Link
                      href={`/treatments/${t.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-900 hover:text-cyan-700"
                    >
                      <span>Treatment Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/book"
                      className="text-xs font-semibold bg-[#083344] hover:bg-[#0E4B56] text-white px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      Book Visit
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Note on Treatment Planning */}
            <div className="mt-16 p-8 rounded-2xl bg-cyan-50/70 border border-cyan-200 max-w-3xl mx-auto text-center space-y-2">
              <h3 className="text-base font-bold text-cyan-950 font-sans">
                Need a thorough examination before deciding?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Book an initial consultation at our Kololo clinic. Our dental surgeon will take digital intraoral images, explain the root cause of your concern, and outline all medical options in plain language.
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
