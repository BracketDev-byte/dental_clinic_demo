import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MessageCircle, ShieldCheck } from 'lucide-react';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import type { SiteSettings, ClinicStat, HomepageSection } from '@/app/lib/types';

interface HeroSectionProps {
  settings?: SiteSettings | null;
  stats?: ClinicStat[];
  section?: HomepageSection | null;
}

export function HeroSection({ settings, stats, section }: HeroSectionProps) {
  const phone = settings?.phonePrimary || '+256 700 123 456';
  const whatsapp = settings?.whatsappNumber || '+256700123456';
  
  const eyebrow = section?.eyebrow || 'Private Dental Clinic · Acacia Avenue';
  const title = section?.title || settings?.tagline || 'Gentle, Honest Dental Care in Kampala';
  const narrative = section?.subtitle || 'Are you dealing with persistent tooth pain, bleeding gums, or a smile you feel hesitant to show? At Pearl Dental, we listen to your concerns first. We explain every option clearly, provide transparent fees in Uganda Shillings before starting, and make sure your treatment is completely comfortable.';
  const emergencyNote = section?.description || `Direct telephone: ${phone} · Walk-ins accepted for acute dental emergencies.`;
  const primaryCtaLabel = section?.primaryCtaLabel || 'Book an Appointment';
  const primaryCtaUrl = section?.primaryCtaUrl || '/book';
  const secondaryCtaLabel = section?.secondaryCtaLabel || `WhatsApp: ${phone}`;
  const secondaryCtaUrl = section?.secondaryCtaUrl || `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`;
  const badgeText = section?.badgeText || 'Plot 14 Acacia Avenue, Kololo';

  return (
    <section aria-labelledby="hero-title" className="relative bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">01</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL OVERVIEW</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>KOLOLO, KAMPALA</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block border-l-2 border-cyan-600 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
                {eyebrow}
              </p>
            </div>

            <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.16] font-sans">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {narrative}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={primaryCtaUrl}
                className="inline-flex items-center justify-center gap-2.5 bg-[#083344] hover:bg-[#0E4B56] text-white text-sm font-semibold px-6 py-3.5 rounded-lg shadow-2xs transition-colors min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <Calendar className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                <span>{primaryCtaLabel}</span>
              </Link>

              <a
                href={secondaryCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3.5 rounded-lg shadow-2xs transition-colors min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                <span>{secondaryCtaLabel}</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 pt-1">
              {emergencyNote}
            </p>
          </div>

          {/* Right Hero Visual Column - Clean, without decorative frames */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-cyan-200/80 bg-slate-50">
              {/* TODO: Replace with clinic hero image URL */}
              {section?.imageUrl ? (
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image
                    src={section.imageUrl}
                    alt="Pearl Dental Treatment Room and Facility"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  label="Pearl Dental Treatment Room"
                  comment="TODO: Replace with clinic hero image URL"
                  aspect="aspect-[4/3]"
                />
              )}
            </div>
            <div className="mt-3 py-2 px-3 bg-[#F4FBFC] border border-cyan-100 rounded-lg flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium text-slate-800">{badgeText}</span>
              <span className="text-cyan-800 font-semibold">Open Mon – Sat</span>
            </div>
          </div>

        </div>
      </div>

      {/* Constructed Bottom Stats Strip with geometric borders */}
      {stats && stats.length > 0 && (
        <div className="border-t border-cyan-200/90 bg-[#F8FDFE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-cyan-200/80">
              {stats.map((st) => (
                <div key={st.id} className="py-5 px-6">
                  <p className="text-2xl lg:text-3xl font-bold text-[#083344] font-sans tracking-tight leading-none">
                    {st.value}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-600 font-medium tracking-wide">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
