'use client';

import React, { useEffect, useState } from 'react';
import { Save, Check, Loader2 } from 'lucide-react';

export default function SettingsManagerPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    clinicName: 'Pearl Dental & Implant Clinic',
    tagline: 'Gentle, Honest Dental Care in Kampala',
    phonePrimary: '+256 700 123 456',
    phoneSecondary: '+256 772 987 654',
    whatsappNumber: '+256700123456',
    emailPrimary: 'care@pearldental.ug',
    address: 'Plot 14 Acacia Avenue, Kololo, Kampala, Uganda',
    googleMapsUrl: 'https://maps.google.com/?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Plot+14+Acacia+Avenue,+Kololo,+Kampala,+Uganda&t=&z=15&ie=UTF8&iwloc=&output=embed',
    openingHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 3:00 PM',
    emergencyNote: 'Sudden toothache or dental injury? WhatsApp or call our Kampala emergency line directly.',
    announcement: 'Routine Dental Checkups and Consultations Open Monday through Saturday',
    announcementEnabled: true,
  });

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/settings')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success && data.data) {
          setForm({
            clinicName: data.data.clinicName || '',
            tagline: data.data.tagline || '',
            phonePrimary: data.data.phonePrimary || '',
            phoneSecondary: data.data.phoneSecondary || '',
            whatsappNumber: data.data.whatsappNumber || '',
            emailPrimary: data.data.emailPrimary || '',
            address: data.data.address || '',
            googleMapsUrl: data.data.googleMapsUrl || '',
            googleMapsEmbedUrl: data.data.googleMapsEmbedUrl || '',
            openingHours: data.data.openingHours || '',
            emergencyNote: data.data.emergencyNote || '',
            announcement: data.data.announcement || '',
            announcementEnabled: data.data.announcementEnabled ?? true,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cms/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setToast('Clinic settings updated successfully! Changes reflect on the live website immediately.');
        setTimeout(() => setToast(null), 4000);
      } else {
        alert(data.error || 'Failed to update settings');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 text-xs">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
          Clinic Details & Global Website Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Modify contact information, Kololo address, opening hours, and announcement banner.
        </p>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        {/* Brand */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans border-b border-slate-100 pb-2 mb-4">
            Practice Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Name *
              </label>
              <input
                type="text"
                required
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Website Tagline / Headline *
              </label>
              <input
                type="text"
                required
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans border-b border-slate-100 pb-2 mb-4">
            Telephone & Messaging
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="text"
                required
                value={form.phonePrimary}
                onChange={(e) => setForm({ ...form, phonePrimary: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Phone
              </label>
              <input
                type="text"
                value={form.phoneSecondary}
                onChange={(e) => setForm({ ...form, phoneSecondary: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Direct Number *
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Clinic Email *
            </label>
            <input
              type="email"
              required
              value={form.emailPrimary}
              onChange={(e) => setForm({ ...form, emailPrimary: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>
        </div>

        {/* Location & Hours */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans border-b border-slate-100 pb-2 mb-4">
            Location & Working Hours
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Physical Address *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Maps URL (Direct Link)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={form.googleMapsUrl}
                  onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Maps Embed URL (Interactive Map Iframe)
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/maps?q=...&output=embed"
                  value={form.googleMapsEmbedUrl}
                  onChange={(e) => setForm({ ...form, googleMapsEmbedUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Opening Hours Text *
              </label>
              <input
                type="text"
                required
                value={form.openingHours}
                onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sunday / Emergency Note
              </label>
              <input
                type="text"
                value={form.emergencyNote}
                onChange={(e) => setForm({ ...form, emergencyNote: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Announcement bar */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans border-b border-slate-100 pb-2 mb-4">
            Top Announcement Bar
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.announcementEnabled}
                onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
                className="rounded text-cyan-800"
              />
              <span>Enable Announcement Bar across Top of Website</span>
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={form.announcement}
                onChange={(e) => setForm({ ...form, announcement: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#083344] hover:bg-[#0E4B56] disabled:bg-slate-400 text-white text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-xs"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Clinic Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
