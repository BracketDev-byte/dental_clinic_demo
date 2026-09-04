'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
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
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccess('Thank you. Your message has been sent. A member of our clinical team in Kololo will get back to you shortly.');
      setForm({
        fullName: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please call or WhatsApp us directly.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-7 sm:p-8 rounded-2xl border border-cyan-100 shadow-2xs">
      <h3 className="text-xl font-bold text-slate-900 font-sans">
        Send an Inquiry
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed">
        Have a question regarding treatment pricing in UGX or insurance coverage? Write to our clinical desk below.
      </p>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Your Full Name *
        </label>
        <input
          type="text"
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="e.g. Grace Mukasa"
          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number (Calls or WhatsApp) *
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

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="grace@example.com"
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Subject *
        </label>
        <select
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 bg-white"
        >
          <option value="General Inquiry">General Question</option>
          <option value="Treatment Cost Question">Treatment Cost Question</option>
          <option value="Dental Pain / Emergency">Dental Pain / Emergency</option>
          <option value="Insurance Question">Insurance Coverage Question</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Your Message *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Describe what you would like to know or what dental concern you are experiencing..."
          className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#083344] hover:bg-[#0E4B56] disabled:bg-slate-400 text-white text-xs font-semibold py-3 px-5 rounded-lg transition-colors shadow-xs"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Send Message to Clinical Team</span>
          </>
        )}
      </button>
    </form>
  );
}
