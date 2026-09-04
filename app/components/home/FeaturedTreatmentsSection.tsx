import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Tag, Stethoscope } from 'lucide-react';
import type { Treatment, HomepageSection } from '@/app/lib/types';

interface FeaturedTreatmentsSectionProps {
  treatments: Treatment[];
  section?: HomepageSection | null;
}

export function FeaturedTreatmentsSection({ treatments, section }: FeaturedTreatmentsSectionProps) {
  if (!treatments || treatments.length === 0) return null;

  const eyebrow = section?.eyebrow || 'Core Treatments';
  const title = section?.title || 'Gentle Treatments Tailored to Your Teeth';
  const subtitle = section?.subtitle || 'From everyday hygiene cleanings to root canals and aesthetic restorations, our primary commitment is preserving your natural dentition with modern equipment.';
  const badgeText = section?.badgeText || 'SPECIALIZED PROCEDURES';
  const ctaLabel = section?.primaryCtaLabel || 'View All Treatments';
  const ctaUrl = section?.primaryCtaUrl || '/treatments';

  return (
    <section aria-labelledby="treatments-heading" className="bg-[#F8FDFE] border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">03</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL DISCIPLINES</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Header with View All link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-block border-l-2 border-cyan-600 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
                {eyebrow}
              </p>
            </div>
            <h2 id="treatments-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              {title}
            </h2>
            <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-950 hover:text-cyan-700 transition-colors whitespace-nowrap pb-1 border-b border-cyan-300 self-start md:self-end min-h-[44px]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Structured Treatment Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <article
              key={t.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white border border-cyan-200/80 hover:border-cyan-400 transition-colors shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-cyan-900 font-semibold tracking-wider uppercase mb-3">
                  <span className="bg-[#F4FBFC] px-2.5 py-1 rounded border border-cyan-100 font-mono">
                    Clinical Procedure
                  </span>
                  {t.priceText && (
                    <span className="text-slate-600 font-medium font-mono text-[11px] flex items-center gap-1">
                      <Tag className="w-3 h-3 text-cyan-700" aria-hidden="true" />
                      {t.priceText}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-sans group-hover:text-cyan-800 transition-colors">
                  <Link href={`/treatments/${t.slug}`} className="focus:outline-hidden">
                    {t.name}
                  </Link>
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {t.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-100 flex items-center justify-between text-xs">
                {t.durationText ? (
                  <span className="text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
                    {t.durationText}
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono">Consultation recommended</span>
                )}

                <Link
                  href={`/treatments/${t.slug}`}
                  className="font-semibold text-cyan-900 hover:text-cyan-700 inline-flex items-center gap-1 py-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
