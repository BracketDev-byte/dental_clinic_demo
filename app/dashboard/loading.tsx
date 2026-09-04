import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-slate-200 rounded-lg" />
          <div className="h-4 w-96 bg-slate-100 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-28 bg-slate-200 rounded-lg" />
          <div className="h-8 w-28 bg-slate-100 rounded-lg" />
        </div>
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-4 h-4 rounded-sm bg-slate-200" />
              <div className="w-8 h-3 rounded bg-slate-100" />
            </div>
            <div className="h-7 w-12 bg-slate-200 rounded-md" />
            <div className="h-3 w-20 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Leads Dual Column Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-48 bg-slate-200 rounded-md" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-48 bg-slate-200 rounded-md" />
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-40 bg-slate-100 rounded" />
                </div>
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
