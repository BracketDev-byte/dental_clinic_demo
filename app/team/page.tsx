import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import { getSiteSettings, getTeamMembers } from '@/app/lib/db-queries';
import { Award, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Our Dental Surgeons | Pearl Dental Kampala',
  description: 'Meet the experienced dental team at Pearl Dental in Kololo, Kampala. Dr. Sarah Namubiru, Dr. David Kigozi, and Dr. Brenda Akello.',
};

export default async function TeamPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Clinical Team
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Experienced Dental Surgeons in Kampala
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Our dental surgeons and hygienists are dedicated to clear communication, gentle treatment methods, and continuous training in modern restorative techniques.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col rounded-2xl bg-white border border-cyan-100 shadow-2xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Portrait Placeholder */}
                  {/* TODO: Add dentist portrait image URL */}
                  <PlaceholderImage
                    label={member.name}
                    comment="TODO: Add dentist portrait image URL"
                    aspect="aspect-[4/3]"
                    imageUrl={member.portraitUrl || undefined}
                  />

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-cyan-800 font-semibold mb-1">
                        <ShieldCheck className="w-4 h-4 text-cyan-700" />
                        <span>{member.registrationInfo || 'UMDPC Registered'}</span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 font-sans">
                        <Link href={`/team/${member.slug}`} className="hover:text-cyan-800 transition-colors">
                          {member.name}
                        </Link>
                      </h2>

                      <p className="text-xs font-semibold text-cyan-700 mt-0.5">
                        {member.role}
                      </p>

                      <p className="text-xs text-slate-500 mt-1 font-mono">
                        {member.qualifications}
                      </p>

                      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                        {member.shortBio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/team/${member.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-cyan-900 hover:text-cyan-700"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/book"
                        className="text-xs font-semibold bg-[#083344] hover:bg-[#0E4B56] text-white px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        Book with Doctor
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Medical Governance Reassurance */}
            <div className="mt-16 p-8 rounded-2xl bg-[#F8FDFE] border border-cyan-100 max-w-3xl mx-auto space-y-3">
              <div className="flex items-center gap-2 text-cyan-900 font-bold text-sm">
                <Award className="w-5 h-5 text-cyan-700" />
                <span>Uganda Medical & Dental Practitioners Council (UMDPC) Licensed</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All dental practitioners at Pearl Dental are licensed by the Uganda Medical and Dental Practitioners Council and participate in mandatory continuous professional education (CPD) programs every year.
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
