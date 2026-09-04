import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import type { SiteSettings } from '@/app/lib/types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const clinicName = settings?.clinicName || 'Pearl Dental & Implant Clinic';
  const phonePrimary = settings?.phonePrimary || '+256 700 123 456';
  const phoneSecondary = settings?.phoneSecondary || '+256 772 987 654';
  const whatsapp = settings?.whatsappNumber || '+256700123456';
  const email = settings?.emailPrimary || 'care@pearldental.ug';
  const address = settings?.address || 'Plot 14 Acacia Avenue, Kololo, Kampala, Uganda';
  const googleMapsUrl = settings?.googleMapsUrl || 'https://maps.google.com/?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda';
  const openingHours = settings?.openingHours || 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM';
  const emergencyNote = settings?.emergencyNote || 'Sudden toothache or dental injury? WhatsApp or call our Kampala emergency line directly.';

  return (
    <footer className="bg-[#083344] text-slate-300 pt-16 pb-12 border-t border-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Philosophy */}
          <div>
            <span className="text-xl font-bold text-white tracking-tight font-sans">
              {clinicName}
            </span>
            <p className="mt-3 text-sm text-cyan-100/80 leading-relaxed">
              We provide calm, thorough dental care for individuals and families in Kampala. Every treatment is clearly explained in plain language, with transparent fees and comfort throughout.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-cyan-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered under Uganda Medical & Dental Practitioners Council (UMDPC)</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Practice
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-white transition-colors">
                  All Dental Treatments
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Meet Our Dental Surgeons
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Smile Transformation Cases
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Oral Health Advice Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Find Our Kololo Clinic
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white text-cyan-300 font-medium transition-colors">
                  Request an Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Hours & Emergency */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Clinic Working Hours
            </h4>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white">Consulting Hours</p>
                  <p className="text-xs text-cyan-200">{openingHours}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-800 text-xs text-cyan-100">
                <p className="font-semibold text-white">Sunday & Urgent Pain</p>
                <p className="mt-1 text-[11px] text-cyan-200">{emergencyNote}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Visit or Call Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-cyan-100 text-xs leading-relaxed block">{address}</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-300 hover:text-white underline mt-1 inline-flex items-center gap-1"
                  >
                    <span>View on Google Maps →</span>
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${phonePrimary.replace(/\s+/g, '')}`} className="text-xs hover:text-white">
                  {phonePrimary}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${phoneSecondary.replace(/\s+/g, '')}`} className="text-xs hover:text-white">
                  {phoneSecondary}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${email}`} className="text-xs hover:text-white">
                  {email}
                </a>
              </li>

              <li className="pt-2">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Direct WhatsApp Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Demo Watermark */}
        <div className="mt-12 pt-6 border-t border-cyan-900/80 flex flex-col md:flex-row items-center justify-between text-xs text-cyan-300/80 gap-3 text-center md:text-left">
          <div>
            <p>© {new Date().getFullYear()} {clinicName}. Fictional demonstration clinic.</p>
            <p className="text-[11px] text-amber-300/90 font-mono mt-1">
              PORTFOLIO DEMO PROJECT · Built by{' '}
              <a
                href="mailto:contact@bracketdevwebsites"
                className="underline hover:text-white font-bold text-amber-200"
              >
                contact@bracketdevwebsites
              </a>
              {' '}· WA:{' '}
              <a
                href="https://wa.me/256776220336"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white font-bold text-amber-200"
              >
                0776220336
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-cyan-200">Private Dental Practice Showcase</span>
            <span className="text-cyan-700">|</span>
            <Link href="/dashboard" className="hover:text-white text-cyan-200 underline font-medium">
              Clinic CMS Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
