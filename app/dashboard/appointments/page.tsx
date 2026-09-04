'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Phone, Mail, Clock, Check, RefreshCw } from 'lucide-react';

interface Appointment {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  preferredContact: string;
  service: string;
  preferredDate: string | null;
  preferredTime: string | null;
  patientType: string;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function AppointmentsManagerPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setAppointments(data.data);
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
    fetchAppointments();
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item))
        );
        setToast(`Status updated to "${status}"`);
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = appointments.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Appointment Requests
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming patient requests and update consultation statuses.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-2xs self-start"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-700" />
          <span>Refresh List</span>
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
        {['all', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === tab
                ? 'bg-[#083344] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab} {tab === 'all' ? `(${appointments.length})` : ''}
          </button>
        ))}
      </div>

      {/* List / Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">
          Loading appointment requests...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No appointments found matching this filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((appt) => (
            <div
              key={appt.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Patient info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {appt.fullName}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold bg-cyan-50 text-cyan-900 px-2 py-0.5 rounded">
                    {appt.patientType === 'new' ? 'New Patient' : 'Returning Patient'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Received: {new Date(appt.createdAt).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="text-xs font-semibold text-cyan-950 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Service: {appt.service}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <a href={`tel:${appt.phone}`} className="hover:underline font-medium">
                      {appt.phone}
                    </a>
                  </span>

                  {appt.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{appt.email}</span>
                    </span>
                  )}

                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Prefers: {appt.preferredContact} ({appt.preferredTime || 'Morning'})</span>
                  </span>
                </div>

                {appt.message && (
                  <p className="mt-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-100">
                    &ldquo;{appt.message}&rdquo;
                  </p>
                )}
              </div>

              {/* Status updater */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium">Update Status:</span>
                <select
                  value={appt.status}
                  onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-hidden ${
                    appt.status === 'new'
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : appt.status === 'confirmed'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : appt.status === 'completed'
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  <option value="new">New (Needs Call)</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed Chair Time</option>
                  <option value="completed">Visit Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <a
                  href={`https://wa.me/${appt.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  WhatsApp Patient
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
