'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

interface Props {
  treatments: { id: number; name: string }[];
}

export function AppointmentBookingForm({ treatments }: Props) {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const initialDoctor = searchParams.get('doctor') || '';

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredContact: 'phone' as 'phone' | 'whatsapp' | 'email',
    service: initialService || (treatments.length > 0 ? treatments[0].name : 'Routine Dental Examination & Cleaning'),
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    patientType: 'new' as 'new' | 'existing',
    message: initialDoctor ? `Requesting consultation with ${initialDoctor}.` : '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking request');
      }

      setSuccess('Your appointment request has been received. Our clinic desk in Kololo will call or WhatsApp you shortly to confirm your exact chair time.');
      setForm({
        fullName: '',
        phone: '',
        email: '',
        preferredContact: 'phone',
        service: treatments.length > 0 ? treatments[0].name : 'Routine Dental Examination & Cleaning',
        preferredDate: '',
        preferredTime: 'Morning (9:00 AM - 12:00 PM)',
        patientType: 'new',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please call us directly on +256 700 123 456.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-7 sm:p-10 rounded-3xl border border-cyan-100 shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 font-sans">
          Request a Clinical Consultation
        </h2>
        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
          Please fill in your details. Our reception desk will contact you via your preferred channel within 2 hours to confirm your appointment.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <p className="leading-relaxed font-medium">{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* Patient Type */}
      <div className="p-3 bg-[#F8FDFE] rounded-xl border border-cyan-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">Have you visited Pearl Dental before?</span>
        <div className="flex items-center gap-4 text-xs font-medium">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="patientType"
              checked={form.patientType === 'new'}
              onChange={() => setForm({ ...form, patientType: 'new' })}
              className="text-cyan-800 focus:ring-cyan-600"
            />
            <span>New Patient</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="patientType"
              checked={form.patientType === 'existing'}
              onChange={() => setForm({ ...form, patientType: 'existing' })}
              className="text-cyan-800 focus:ring-cyan-600"
            />
            <span>Existing Patient</span>
          </label>
        </div>
      </div>

      {/* Name and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="e.g. Sandra Nabukenya"
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+256 700 000 000"
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>
      </div>

      {/* Email & Preferred Contact Method */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="sandra@example.com"
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Confirmation Method *
          </label>
          <select
            value={form.preferredContact}
            onChange={(e) => setForm({ ...form, preferredContact: e.target.value as 'phone' | 'whatsapp' | 'email' })}
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 bg-white"
          >
            <option value="phone">Direct Phone Call</option>
            <option value="whatsapp">WhatsApp Message</option>
            <option value="email">Email Confirmation</option>
          </select>
        </div>
      </div>

      {/* Service */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Treatment / Service of Interest *
        </label>
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 bg-white"
        >
          {treatments.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
          <option value="Emergency Toothache Relief">Emergency Toothache Relief</option>
          <option value="Not Sure / Consultation First">Not Sure / Consultation First</option>
        </select>
      </div>

      {/* Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            required
            value={form.preferredDate}
            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Time Window *
          </label>
          <select
            value={form.preferredTime}
            onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 bg-white"
          >
            <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
            <option value="Late Afternoon (3:00 PM - 6:00 PM)">Late Afternoon (3:00 PM - 6:00 PM)</option>
          </select>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Tell us about your dental concern (Optional)
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="e.g. Sharp pain when drinking cold water on the lower right side, or interested in gap closure..."
          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#083344] hover:bg-[#0E4B56] disabled:bg-slate-400 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4 text-cyan-300" />
            <span>Confirm Appointment Request</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
        <span>Your contact details are strictly confidential and used only for your dental appointment.</span>
      </div>
    </form>
  );
}
