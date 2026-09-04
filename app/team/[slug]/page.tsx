import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import { getTeamMemberBySlug, getSiteSettings } from '@/app/lib/db-queries';
import { ArrowLeft, Calendar, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return { title: 'Dental Surgeon | Pearl Dental' };

  return {
    title: `${member.name} | Pearl Dental Kampala`,
    description: member.shortBio,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const [member, settings] = await Promise.all([
    getTeamMemberBySlug(slug),
    getSiteSettings(),
  ]);

  if (!member) {
    notFound();
  }

  const bioParagraphs = member.fullBio
    ? member.fullBio.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header Breadcrumb */}
        <div className="bg-[#F4FBFC] py-6 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-900 hover:text-cyan-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all doctors</span>
            </Link>
          </div>
        </div>

        {/* Doctor Profile Main */}
        <section className="py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Portrait & Quick Facts */}
              <div className="md:col-span-5 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-cyan-100 shadow-sm bg-white">
                  {/* TODO: Add dentist portrait image URL */}
                  <PlaceholderImage
                    label={member.name}
                    comment="TODO: Add dentist portrait image URL"
                    aspect="aspect-[3/4]"
                    imageUrl={member.portraitUrl || undefined}
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#F8FDFE] border border-cyan-100 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-cyan-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-cyan-700" />
                    <span>Credentials & Council Licensing</span>
                  </div>
                  <p className="text-slate-600 font-mono">
                    {member.qualifications}
                  </p>
                  <p className="text-cyan-800 font-medium">
                    {member.registrationInfo || 'Licensed with UMDPC Uganda'}
                  </p>
                  <p className="text-slate-500">
                    Clinical experience: {member.yearsExperience}+ years
                  </p>
                </div>

                <Link
                  href={`/book?doctor=${encodeURIComponent(member.name)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-cyan-300" />
                  <span>Book Consultation with {member.name.split(' ')[1] || member.name}</span>
                </Link>
              </div>

              {/* Right Column: Full Biography & Philosophy */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full">
                    Dental Surgeon Profile
                  </span>
                  <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
                    {member.name}
                  </h1>
                  <p className="text-sm font-semibold text-cyan-700 mt-1">
                    {member.role}
                  </p>
                </div>

                {/* Narrative Bio */}
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                  {bioParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Consultation Philosophy */}
                <div className="p-6 rounded-2xl bg-[#F4FBFC] border border-cyan-200/70 space-y-3 mt-6">
                  <h3 className="text-sm font-bold text-cyan-950 font-sans">
                    Clinical Consultation Promise
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &ldquo;My goal is that every patient leaves my room feeling heard and completely relaxed. We walk through your X-rays together, evaluate your options honestly, and make sure you never experience unnecessary discomfort.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <BookingCtaSection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
