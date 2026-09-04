'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, RefreshCw, Check } from 'lucide-react';

interface Enquiry {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function EnquiriesManagerPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/enquiries')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setEnquiries(data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchEnquiries();
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        setToast(`Enquiry marked as "${status}"`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Contact Messages & Inquiries
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Questions submitted from the public contact page.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-2xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-700" />
          <span>Refresh</span>
        </button>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {['all', 'new', 'read', 'replied', 'archived'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === tab
                ? 'bg-[#083344] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab} {tab === 'all' ? `(${enquiries.length})` : ''}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">
          Loading inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No inquiries found matching this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {enq.fullName}
                  </h3>
                  <span className="text-xs font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    {enq.subject}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(enq.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <a href={`tel:${enq.phone}`} className="hover:underline font-medium">
                      {enq.phone}
                    </a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <a href={`mailto:${enq.email}`} className="hover:underline font-medium">
                      {enq.email}
                    </a>
                  </span>
                </div>

                <p className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-100 whitespace-pre-wrap">
                  {enq.message}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <span className="text-[11px] text-slate-500 font-medium">Status:</span>
                <select
                  value={enq.status}
                  onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-white border-slate-300"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>

                <a
                  href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 font-semibold hover:underline mt-1"
                >
                  Reply via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
