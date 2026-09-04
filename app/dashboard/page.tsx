import React from 'react';
import Link from 'next/link';
import { neon } from '@neondatabase/serverless';
import { cleanDbUrl } from '@/app/src';
import {
  Calendar,
  Mail,
  Stethoscope,
  Star,
  Sparkles,
  BookOpen,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const revalidate = 0;

interface DashboardData {
  treatmentCount: number;
  reviewCount: number;
  smileCaseCount: number;
  blogCount: number;
  newApptCount: number;
  newEnquiryCount: number;
  recentAppointments: Array<{
    id: number;
    fullName?: string;
    full_name?: string;
    service: string;
    phone: string;
    preferredTime?: string;
    preferred_time?: string;
    status: string;
  }>;
  recentEnquiries: Array<{
    id: number;
    fullName?: string;
    full_name?: string;
    subject: string;
    message: string;
    status: string;
  }>;
}

async function getDashboardData(): Promise<DashboardData> {
  const defaultData: DashboardData = {
    treatmentCount: 0,
    reviewCount: 0,
    smileCaseCount: 0,
    blogCount: 0,
    newApptCount: 0,
    newEnquiryCount: 0,
    recentAppointments: [],
    recentEnquiries: [],
  };

  try {
    const cleanedUrl = cleanDbUrl(process.env.DATABASE_URL);
    if (!cleanedUrl) return defaultData;

    const sql = neon(cleanedUrl);
    const res = await sql`
      SELECT json_build_object(
        'treatmentCount', (SELECT count(*) FROM treatments),
        'reviewCount', (SELECT count(*) FROM reviews),
        'smileCaseCount', (SELECT count(*) FROM smile_cases),
        'blogCount', (SELECT count(*) FROM blog_posts),
        'newApptCount', (SELECT count(*) FROM appointment_requests WHERE status = 'new'),
        'newEnquiryCount', (SELECT count(*) FROM contact_enquiries WHERE status = 'new'),
        'recentAppointments', COALESCE((SELECT json_agg(a) FROM (SELECT * FROM appointment_requests ORDER BY created_at DESC LIMIT 5) a), '[]'::json),
        'recentEnquiries', COALESCE((SELECT json_agg(e) FROM (SELECT * FROM contact_enquiries ORDER BY created_at DESC LIMIT 5) e), '[]'::json)
      ) AS data;
    `;

    if (res && res[0] && res[0].data) {
      return {
        treatmentCount: Number(res[0].data.treatmentCount) || 0,
        reviewCount: Number(res[0].data.reviewCount) || 0,
        smileCaseCount: Number(res[0].data.smileCaseCount) || 0,
        blogCount: Number(res[0].data.blogCount) || 0,
        newApptCount: Number(res[0].data.newApptCount) || 0,
        newEnquiryCount: Number(res[0].data.newEnquiryCount) || 0,
        recentAppointments: res[0].data.recentAppointments || [],
        recentEnquiries: res[0].data.recentEnquiries || [],
      };
    }
    return defaultData;
  } catch (err) {
    console.error('Dashboard data fetch error:', err);
    return defaultData;
  }
}

export default async function DashboardOverviewPage() {
  const data = await getDashboardData();
  const {
    treatmentCount,
    reviewCount,
    smileCaseCount,
    blogCount,
    newApptCount,
    newEnquiryCount,
    recentAppointments,
    recentEnquiries,
  } = data;

  const stats = [
    {
      title: 'New Appointment Requests',
      value: newApptCount,
      icon: Calendar,
      href: '/dashboard/appointments',
      highlight: true,
    },
    {
      title: 'New Inquiries',
      value: newEnquiryCount,
      icon: Mail,
      href: '/dashboard/enquiries',
      highlight: true,
    },
    {
      title: 'Active Treatments',
      value: treatmentCount,
      icon: Stethoscope,
      href: '/dashboard/treatments',
    },
    {
      title: 'Smile Gallery Cases',
      value: smileCaseCount,
      icon: Sparkles,
      href: '/dashboard/gallery',
    },
    {
      title: 'Patient Reviews',
      value: reviewCount,
      icon: Star,
      href: '/dashboard/reviews',
    },
    {
      title: 'Advice Articles',
      value: blogCount,
      icon: BookOpen,
      href: '/dashboard/blog',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Clinic Content & Leads Overview
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time control panel for Pearl Dental Clinic on Acacia Avenue, Kololo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/treatments"
            className="inline-flex items-center gap-1.5 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Treatment</span>
          </Link>

          <Link
            href="/dashboard/gallery"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
            <span>Add Smile Case</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              href={s.href}
              className={`p-4 rounded-2xl border transition-all ${
                s.highlight && s.value > 0
                  ? 'bg-cyan-50/80 border-cyan-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-cyan-200'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <Icon className={`w-4 h-4 ${s.highlight && s.value > 0 ? 'text-cyan-800' : 'text-slate-600'}`} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">View</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-sans">
                {s.value}
              </p>
              <p className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-1">
                {s.title}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Leads Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Recent Appointment Requests
              </h3>
              <p className="text-[11px] text-slate-500">
                Incoming patients requesting clinical chair time
              </p>
            </div>
            <Link
              href="/dashboard/appointments"
              className="text-xs font-semibold text-cyan-800 hover:text-cyan-600 inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No appointment requests recorded yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {recentAppointments.map((appt) => (
                <div key={appt.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{appt.fullName || appt.full_name}</p>
                    <p className="text-slate-600">{appt.service}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {appt.phone} • {appt.preferredTime || appt.preferred_time || 'Morning'}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      appt.status === 'new'
                        ? 'bg-amber-100 text-amber-800'
                        : appt.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Recent Contact Messages
              </h3>
              <p className="text-[11px] text-slate-500">
                General inquiries submitted via public contact form
              </p>
            </div>
            <Link
              href="/dashboard/enquiries"
              className="text-xs font-semibold text-cyan-800 hover:text-cyan-600 inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No inquiries recorded yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{enq.fullName || enq.full_name}</p>
                    <p className="text-slate-600 font-medium">{enq.subject}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {enq.message}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      enq.status === 'new'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick Access to CMS Edit Sections */}
      <div className="bg-[#F8FDFE] rounded-2xl border border-cyan-100 p-6 space-y-4">
        <h3 className="text-sm font-bold text-cyan-950 font-sans">
          Quick Management Links
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link
            href="/dashboard/treatments"
            className="p-3 bg-white rounded-xl border border-cyan-100 hover:border-cyan-300 font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>Edit Dental Treatments</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
          </Link>
          <Link
            href="/dashboard/gallery"
            className="p-3 bg-white rounded-xl border border-cyan-100 hover:border-cyan-300 font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>Update Smile Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
          </Link>
          <Link
            href="/dashboard/reviews"
            className="p-3 bg-white rounded-xl border border-cyan-100 hover:border-cyan-300 font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>Manage Patient Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
          </Link>
          <Link
            href="/dashboard/settings"
            className="p-3 bg-white rounded-xl border border-cyan-100 hover:border-cyan-300 font-semibold text-slate-800 flex items-center justify-between"
          >
            <span>Clinic Hours & Phone</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-700" />
          </Link>
        </div>
      </div>
    </div>
  );
}
