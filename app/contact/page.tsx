import React from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ContactForm } from '@/app/components/ContactForm';
import { getSiteSettings } from '@/app/lib/db-queries';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from 'lucide-react';

export const metadata = {
  title: 'Contact Pearl Dental Clinic | Kololo, Kampala',
  description: 'Reach Pearl Dental Clinic in Kololo, Kampala. Find directions, phone numbers, WhatsApp, opening hours, and send direct clinical inquiries.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const phonePrimary = settings?.phonePrimary || '+256 700 123 456';
  const phoneSecondary = settings?.phoneSecondary || '+256 772 987 654';
  const whatsapp = settings?.whatsappNumber || '+256700123456';
  const email = settings?.emailPrimary || 'care@pearldental.ug';
  const address = settings?.address || 'Plot 14 Acacia Avenue, Kololo, Kampala, Uganda';
  const openingHours = settings?.openingHours || 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM';
  const googleMapsUrl = settings?.googleMapsUrl || 'https://maps.google.com/?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda';
  const googleMapsEmbedUrl = settings?.googleMapsEmbedUrl || 'https://maps.google.com/maps?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Clinic Location & Inquiries
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Get in Touch with Our Kampala Clinic
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We are conveniently situated along Acacia Avenue in Kololo with dedicated patient parking. Call us, WhatsApp, or send a message below.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Direct Info & Location */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 font-sans">
                    Clinic Details & Location
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FDFE] border border-cyan-100">
                      <MapPin className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-900">
                          Physical Address
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {address}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Near Acacia Mall junction, Kololo. Secure perimeter parking on site.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FDFE] border border-cyan-100">
                      <Clock className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-900">
                          Working Hours
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {openingHours}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Sundays reserved for severe acute dental emergencies upon prior telephone notice.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FDFE] border border-cyan-100">
                      <Phone className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-900">
                          Direct Telephone Lines
                        </p>
                        <div className="mt-1 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm font-medium text-slate-800">
                          <a href={`tel:${phonePrimary.replace(/\s+/g, '')}`} className="hover:text-cyan-800">
                            {phonePrimary} (Main)
                          </a>
                          <span className="hidden sm:inline text-slate-300">|</span>
                          <a href={`tel:${phoneSecondary.replace(/\s+/g, '')}`} className="hover:text-cyan-800">
                            {phoneSecondary}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FDFE] border border-cyan-100">
                      <Mail className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-900">
                          Email Communications
                        </p>
                        <a href={`mailto:${email}`} className="mt-1 block text-sm font-medium text-slate-800 hover:text-cyan-800">
                          {email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Button */}
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-3 px-5 rounded-xl transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat Directly with Clinic Reception on WhatsApp</span>
                  </a>
                </div>

                {/* Google Maps Container */}
                <div className="rounded-2xl overflow-hidden border border-cyan-200/80 shadow-xs bg-white">
                  <div className="bg-cyan-50/80 px-4 py-3 border-b border-cyan-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-950">
                      <MapPin className="w-4 h-4 text-cyan-700 shrink-0" />
                      <span>Google Maps · Acacia Avenue, Kololo</span>
                    </div>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 hover:text-white bg-white hover:bg-cyan-800 px-3 py-1.5 rounded-lg border border-cyan-200 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open Directions</span>
                    </a>
                  </div>

                  <div className="relative w-full h-80 bg-slate-100">
                    <iframe
                      title="Pearl Dental Clinic Google Map Location"
                      src={googleMapsEmbedUrl}
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full block"
                    />
                  </div>

                  <div className="p-4 bg-[#F8FDFE] border-t border-cyan-100/70 text-xs text-slate-600 leading-relaxed space-y-1">
                    <p className="font-semibold text-cyan-950 flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Driving & Parking Instructions:</span>
                    </p>
                    <p>
                      Located along Acacia Avenue in Kololo, near Acacia Mall junction. Dedicated visitor parking with 24/7 security is available on premises for all scheduled patients.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-6">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
