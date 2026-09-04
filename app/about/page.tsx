import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import { getSiteSettings, getTeamMembers } from '@/app/lib/db-queries';
import { ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Our Clinic | Pearl Dental Kampala',
  description: 'Learn about Pearl Dental Clinic in Kololo, Kampala. Our philosophy of gentle, honest dental care, medical standards, and patient comfort.',
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  const standards = [
    {
      title: 'Hospital-Grade Autoclave Sterilization',
      desc: 'Every dental instrument undergoes multi-stage ultrasonic cleaning and sealed pressure steam sterilization. Pouches are opened in your presence for every visit.',
    },
    {
      title: 'Digital Diagnostics with Reduced Radiation',
      desc: 'Our digital intraoral radiography produces instant high-resolution imaging with up to 80% less radiation exposure than conventional dental film.',
    },
    {
      title: 'Tooth Preservation First',
      desc: 'We never rush to extract a tooth that can be safely saved. Through root canal therapy and protective ceramic crowns, preserving your natural bite is always our priority.',
    },
    {
      title: 'Transparent Written Treatment Plans',
      desc: 'Before any procedure begins, we explain all clinical findings and hand you a written estimate in Uganda Shillings. You make all decisions at your own pace.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              About Pearl Dental
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Gentle, Compassionate Dental Care Built for Kampala Families
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We established Pearl Dental on Acacia Avenue in Kololo with a single conviction: visiting the dentist should be calm, completely transparent, and free of anxiety.
            </p>
          </div>
        </section>

        {/* Clinic Story & Philosophy */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full">
                  <HeartHandshake className="w-4 h-4 text-cyan-700" />
                  <span>Our Practice Philosophy</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                  Why We Take More Time with Every Patient
                </h2>

                <p className="text-slate-600 leading-relaxed text-base">
                  Too many people in Uganda only visit a dental clinic when they are already in agony, often because of frightening childhood memories or past experiences where doctors rushed without explaining what was happening.
                </p>

                <p className="text-slate-600 leading-relaxed text-base">
                  At Pearl Dental, our appointments are intentionally scheduled with ample time. We sit with you, discuss your dental history, examine your teeth with gentle mirrors, and show you exactly what is happening before recommending any procedure.
                </p>

                <div className="pt-2 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-700">
                      <strong>Pain-free approach:</strong> Modern local anesthesia and topical numbing gels ensure you remain comfortable throughout every procedure.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-700">
                      <strong>No pressure, no surprises:</strong> We provide detailed options in Uganda Shillings so you choose what aligns with your family priorities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden border-4 border-white shadow-md bg-white">
                  {/* TODO: Replace with clinic hero image URL */}
                  <PlaceholderImage
                    label="Pearl Dental Consultation Suite"
                    comment="TODO: Replace with clinic hero image URL"
                    aspect="aspect-[4/3]"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Clinical Safety & Medical Standards */}
        <section className="py-16 sm:py-20 bg-[#F8FDFE] border-y border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-full">
                Safety & Technology
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                Medical Rigor and Sterilization Standards
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Patient safety is non-negotiable. Here is how our Kololo facility protects you and your loved ones on every single visit.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {standards.map((std, i) => (
                <div key={i} className="p-7 rounded-2xl bg-white border border-cyan-100 shadow-2xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-800">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                      {std.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Preview */}
        {team && team.length > 0 && (
          <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full">
                Our Clinicians
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
                Guided by Experienced Dental Surgeons
              </h2>
              <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Our doctors bring combined decades of surgical, orthodontic, and pediatric experience from Makerere University and international postgraduate institutions.
              </p>

              <div className="pt-8">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  <span>Meet All Dental Surgeons</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        <BookingCtaSection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
