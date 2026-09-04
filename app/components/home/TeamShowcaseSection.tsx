import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, UserCheck } from 'lucide-react';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import type { TeamMember, HomepageSection } from '@/app/lib/types';

interface TeamShowcaseSectionProps {
  team: TeamMember[];
  section?: HomepageSection | null;
}

export function TeamShowcaseSection({ team, section }: TeamShowcaseSectionProps) {
  if (!team || team.length === 0) return null;

  const eyebrow = section?.eyebrow || 'Our Dental Practitioners';
  const title = section?.title || 'Who Will Look After Your Dental Health?';
  const subtitle = section?.subtitle || 'Meet the experienced dental surgeons and hygienists who will care for you. Every doctor is registered with the Uganda Medical and Dental Practitioners Council.';
  const badgeText = section?.badgeText || 'UMDPC REGISTERED PRACTITIONERS';
  const ctaLabel = section?.primaryCtaLabel || 'View Full Team';
  const ctaUrl = section?.primaryCtaUrl || '/team';

  return (
    <section aria-labelledby="team-heading" className="bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">04</span>
            <span className="text-cyan-400">/</span>
            <span>MEDICAL FACULTY</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <UserCheck className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-block border-l-2 border-cyan-600 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
                {eyebrow}
              </p>
            </div>
            <h2 id="team-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
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

        {/* Doctor Cards Grid - Clean, no decorative image frames */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((doc) => (
            <article
              key={doc.id}
              className="flex flex-col rounded-xl bg-white border border-cyan-200/90 overflow-hidden shadow-2xs hover:border-cyan-400 transition-colors"
            >
              {/* Doctor Portrait Container with required comment - clean, architectural */}
              <div className="bg-slate-50 border-b border-cyan-100">
                {/* TODO: Add dentist portrait image URL */}
                <PlaceholderImage
                  label={doc.name}
                  comment="TODO: Add dentist portrait image URL"
                  aspect="aspect-[4/3]"
                  imageUrl={doc.portraitUrl || undefined}
                />
              </div>

              {/* Bio details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-900 mb-2">
                    <Award className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
                    <span className="font-mono">{doc.registrationInfo || 'Licensed by UMDPC Uganda'}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-sans">
                    {doc.name}
                  </h3>

                  <p className="text-xs font-semibold text-cyan-800 mt-0.5">
                    {doc.role}
                  </p>

                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {doc.qualifications}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {doc.shortBio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/team/${doc.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-900 hover:text-cyan-700 py-1"
                  >
                    <span>Full biography</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/book"
                    className="text-xs font-medium text-slate-500 hover:text-slate-900 py-1"
                  >
                    Request consult
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
