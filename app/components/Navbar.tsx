'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';
import type { SiteSettings } from '@/app/lib/types';

interface NavbarProps {
  settings?: SiteSettings | null;
}

export function Navbar({ settings }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const phone = settings?.phonePrimary || '+256 700 123 456';
  const whatsapp = settings?.whatsappNumber || '+256700123456';
  const announcement = settings?.announcement || 'Routine Dental Checkups and Consultations Open Monday through Saturday';
  const showAnnouncement = settings?.announcementEnabled ?? true;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Our Dentists', href: '/team' },
    { name: 'Smile Gallery', href: '/gallery' },
    { name: 'Advice & Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-cyan-100">
      {/* Top Utility & Announcement Bar - Responsive & unsqueezed layout */}
      {showAnnouncement && (
        <aside aria-label="Clinic Announcements and Demo Notice" className="bg-[#083344] text-white py-2 px-3.5 sm:px-6 text-xs border-b border-cyan-900/60">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
            {/* Announcement & Demo Tag */}
            <div className="flex flex-wrap items-center gap-2 text-cyan-100 leading-snug">
              <span className="inline-flex items-center gap-1 font-bold text-amber-300 uppercase text-[10px] tracking-wider bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-sm shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                Demo Site
              </span>
              <span className="font-semibold text-white tracking-wide uppercase text-[10px] bg-cyan-900/90 border border-cyan-700/50 px-2 py-0.5 rounded-sm shrink-0">
                Notice
              </span>
              <p className="text-xs text-cyan-100 font-normal break-words sm:inline">
                {announcement}
              </p>
            </div>

            {/* Direct Contact & Developer Credit */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-1.5 md:pt-0 border-t border-cyan-900/50 md:border-t-0 text-xs">
              <div className="flex items-center gap-3 text-cyan-200">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1 px-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span className="font-medium">{phone}</span>
                </a>

                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-emerald-300 transition-colors font-medium inline-flex items-center gap-1.5 py-1 px-2 rounded bg-emerald-950/60 border border-emerald-800/60 text-[11px]"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              <span className="text-[10px] text-cyan-400/80 font-mono hidden sm:inline">
                By <a href="mailto:contact@bracketdevwebsites" className="underline hover:text-white">contact@bracketdevwebsites</a> · WA: <a href="https://wa.me/256776220336" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">0776220336</a>
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Clinic Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#083344] to-[#0E7490] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <span className="block font-bold text-lg text-slate-900 tracking-tight leading-none font-sans">
                {settings?.clinicName || 'Pearl Dental & Implant Clinic'}
              </span>
              <span className="text-[11px] text-cyan-800 font-medium tracking-wide uppercase mt-0.5 block">
                Kololo, Kampala
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F4FBFC] px-3 py-1.5 rounded-full border border-cyan-100">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                    active
                      ? 'bg-white text-cyan-950 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-cyan-950 hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/dashboard"
              className="text-[11px] font-medium text-slate-500 hover:text-cyan-900 px-2.5 py-1 rounded-md border border-slate-200 hover:border-cyan-300 transition-colors"
              title="Clinic Management Dashboard"
            >
              CMS Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/book"
              className="sm:hidden bg-[#083344] text-white text-xs px-3 py-1.5 rounded-full font-medium"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-cyan-50 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cyan-100 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? 'bg-cyan-50 text-cyan-950 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-[#083344] text-white text-sm font-semibold py-2.5 rounded-lg"
            >
              Book Appointment
            </Link>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center border border-emerald-500 text-emerald-700 text-sm font-medium py-2 rounded-lg"
            >
              WhatsApp Us directly
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-xs text-slate-500 py-1"
            >
              CMS Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
