import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MessageCircle, Phone, Clock } from 'lucide-react';
import type { SiteSettings, HomepageSection } from '@/app/lib/types';

interface BookingCtaSectionProps {
  settings?: SiteSettings | null;
  section?: HomepageSection | null;
}

export function BookingCtaSection({ settings, section }: BookingCtaSectionProps) {
  const phone = settings?.phonePrimary || '+256 700 123 456';
  const whatsapp = settings?.whatsappNumber || '+256700123456';

  const eyebrow = section?.eyebrow || 'Book Your Consultation';
  const title = section?.title || 'Ready to Visit Our Dental Clinic in Kololo?';
  const subtitle = section?.subtitle || 'Whether you need urgent relief for persistent tooth pain, a routine family dental cleaning, or advice on orthodontic straightening, our clinical team is ready Monday through Saturday.';
  const description = section?.description || 'Plot 14 Acacia Avenue, Kololo · Secure on-site patient parking available.';
  const badgeText = section?.badgeText || 'DIRECT INTAKE';
  const primaryCtaLabel = section?.primaryCtaLabel || 'Request Appointment Online';
  const primaryCtaUrl = section?.primaryCtaUrl || '/book';

  return (
    <section aria-labelledby="booking-cta-heading" className="bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">06</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL APPOINTMENT BOOKING</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#083344] via-[#0E4B56] to-[#0A3D4D] text-white p-8 sm:p-12 lg:p-14 border border-cyan-800 shadow-md">
          {section?.imageUrl && (
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <Image
                src={section.imageUrl}
                alt="Clinic background atmosphere"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-block border-l-2 border-cyan-400 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
                {eyebrow}
              </p>
            </div>

            <h2 id="booking-cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-sans text-white">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-cyan-100/90 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Direct Action Options */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href={primaryCtaUrl}
                className="inline-flex items-center justify-center gap-2.5 bg-white text-[#083344] hover:bg-cyan-50 font-bold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-white"
              >
                <Calendar className="w-4 h-4 text-cyan-800" aria-hidden="true" />
                <span>{primaryCtaLabel}</span>
              </Link>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm transition-colors min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 border border-cyan-300/40 hover:bg-white/10 text-cyan-100 font-semibold text-sm px-5 py-3.5 rounded-lg transition-colors min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-cyan-300"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call {phone}</span>
              </a>
            </div>

            <p className="text-xs text-cyan-200/70 pt-2 font-mono">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
