import React, { Suspense } from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { AppointmentBookingForm } from '@/app/components/AppointmentBookingForm';
import { getSiteSettings, getTreatments } from '@/app/lib/db-queries';
import { ShieldCheck, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Book an Appointment | Pearl Dental Clinic Kampala',
  description: 'Schedule a dental consultation or emergency pain visit at Pearl Dental in Kololo, Kampala. Transparent UGX pricing and gentle care.',
};

export default async function BookPage() {
  const [settings, treatments] = await Promise.all([
    getSiteSettings(),
    getTreatments(),
  ]);

  const phone = settings?.phonePrimary || '+256 700 123 456';
  const whatsapp = settings?.whatsappNumber || '+256700123456';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1 bg-gradient-to-b from-[#F4FBFC] via-white to-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Appointment Request
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              Schedule Your Dental Visit in Kololo
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Fill out the short form below. We will contact you via phone or WhatsApp to lock in your chair time and answer any questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Booking Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading form...</div>}>
                <AppointmentBookingForm
                  treatments={treatments.map((t) => ({ id: t.id, name: t.name }))}
                />
              </Suspense>
            </div>

            {/* Right Column: Reassurances & Direct Contact */}
            <div className="lg:col-span-5 space-y-6">
              {/* Emergency Banner */}
              <div className="p-6 rounded-3xl bg-[#083344] text-white space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Immediate Tooth Pain?</span>
                </div>
                <h3 className="text-lg font-bold font-sans">
                  Severe Toothache or Injury?
                </h3>
                <p className="text-xs text-cyan-100/90 leading-relaxed">
                  For severe pain, facial swelling, or knocked-out teeth, do not wait for an online form response. Call or WhatsApp our emergency desk in Kampala immediately.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-cyan-50 text-[#083344] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: {phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Clinic Guarantees */}
              <div className="p-6 rounded-3xl bg-[#F8FDFE] border border-cyan-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-sans">
                  What Happens at Your Appointment:
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-700 mt-0.5 shrink-0" />
                    <span>
                      <strong>Gentle Examination:</strong> We check your teeth, gums, and bite with comfortable diagnostic lights and low-radiation digital imaging if needed.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-700 mt-0.5 shrink-0" />
                    <span>
                      <strong>Clear Explanations:</strong> We show you photos of your teeth on a chairside screen and explain what we find in plain terms.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-700 mt-0.5 shrink-0" />
                    <span>
                      <strong>No Surprise Invoices:</strong> You get a written quote in Uganda Shillings with all treatment choices before anything is carried out.
                    </span>
                  </div>
                </div>
              </div>

              {/* Location Note */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-700 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">Pearl Dental & Implant Clinic</p>
                  <p className="mt-0.5 text-slate-500">
                    Plot 14 Acacia Avenue, Kololo, Kampala. Dedicated patient parking is available inside the gate.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
