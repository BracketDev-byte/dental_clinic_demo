import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import { getTreatmentBySlug, getSiteSettings } from '@/app/lib/db-queries';
import { Clock, Tag, ArrowLeft, Calendar, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);
  if (!treatment) return { title: 'Treatment | Pearl Dental' };

  return {
    title: `${treatment.name} in Kampala | Pearl Dental Clinic`,
    description: treatment.shortDescription,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const [treatment, settings] = await Promise.all([
    getTreatmentBySlug(slug),
    getSiteSettings(),
  ]);

  if (!treatment) {
    notFound();
  }

  // Parse procedure steps or narrative paragraphs
  const paragraphs = treatment.fullContent
    ? treatment.fullContent.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header Breadcrumb & Title */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-12 sm:py-16 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-900 hover:text-cyan-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all treatments</span>
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {treatment.durationText && (
                  <span className="flex items-center gap-1 text-xs font-medium text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration: {treatment.durationText}</span>
                  </span>
                )}

                {treatment.priceText && (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-900 bg-white border border-cyan-200 px-3 py-1 rounded-full">
                    <Tag className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Cost: {treatment.priceText}</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
                {treatment.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {treatment.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Treatment Content Details */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Main Content Column */}
              <div className="lg:col-span-8 space-y-8">
                {/* Clinical Image Container */}
                <div className="rounded-2xl overflow-hidden border border-cyan-100 shadow-sm bg-white">
                  {/* TODO: Replace with clinic hero image URL */}
                  <PlaceholderImage
                    label={`${treatment.name} Procedure at Pearl Dental`}
                    comment="TODO: Replace with clinic hero image URL"
                    aspect="aspect-[16/9]"
                    imageUrl={treatment.imageUrl || undefined}
                  />
                </div>

                {/* Narrative Explanation */}
                <div className="space-y-4 text-base text-slate-700 leading-relaxed">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                    What You Should Know About This Treatment
                  </h2>
                  {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Patient Comfort Guarantee */}
                <div className="p-6 rounded-2xl bg-[#F8FDFE] border border-cyan-100 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-900 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-cyan-700" />
                    <span>How We Protect Your Comfort During This Visit</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Prior to treatment, we apply a flavored topical gel to numb the gum surface before administering local anesthesia. You will feel pressure, but no sharp discomfort. You can pause the procedure at any second simply by raising your left hand.
                  </p>
                </div>
              </div>

              {/* Sidebar Booking Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl bg-[#F4FBFC] border border-cyan-200/80 sticky top-28 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 font-sans">
                    Book This Treatment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reserve a consultation with our dental surgeons in Kololo, Kampala. We will examine your teeth and confirm the exact fee in Uganda Shillings before doing any work.
                  </p>

                  <div className="pt-2 border-t border-cyan-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Estimated Fee:</span>
                      <span className="font-bold text-slate-900">{treatment.priceText || 'Consultation First'}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Typical Time:</span>
                      <span className="font-bold text-slate-900">{treatment.durationText || '45 mins'}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Location:</span>
                      <span className="font-bold text-slate-900">Kololo, Kampala</span>
                    </div>
                  </div>

                  <Link
                    href={`/book?service=${encodeURIComponent(treatment.name)}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-cyan-300" />
                    <span>Request Appointment</span>
                  </Link>

                  <a
                    href={`https://wa.me/${(settings?.whatsappNumber || '+256700123456').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <span>Ask Questions on WhatsApp</span>
                  </a>
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
