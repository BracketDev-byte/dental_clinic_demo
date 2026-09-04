import React from 'react';

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 animate-pulse">
      {/* Top Announcement Skeleton */}
      <div className="bg-[#E0FFFF]/80 border-b border-cyan-100 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-4 bg-cyan-200/80 rounded w-64 max-w-[60%]" />
          <div className="h-4 bg-cyan-200/80 rounded w-48 hidden md:block" />
        </div>
      </div>

      {/* Header / Navbar Skeleton */}
      <div className="bg-white/95 border-b border-cyan-100/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100" />
            <div className="space-y-1.5">
              <div className="h-5 bg-slate-200 rounded w-32" />
              <div className="h-3 bg-slate-100 rounded w-20" />
            </div>
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="h-4 bg-slate-100 rounded w-16" />
            <div className="h-4 bg-slate-100 rounded w-20" />
            <div className="h-4 bg-slate-100 rounded w-24" />
            <div className="h-4 bg-slate-100 rounded w-20" />
            <div className="h-4 bg-slate-100 rounded w-28" />
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="h-10 bg-slate-100 rounded-lg w-32 hidden md:block" />
            <div className="h-10 bg-[#083344]/20 rounded-lg w-36" />
          </div>
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <main className="flex-1">
        {/* HERO SECTION SKELETON */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F4FBFC] via-white to-white border-b border-cyan-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-14 sm:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headings & Text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="h-7 bg-cyan-100 rounded-full w-52" />

                <div className="space-y-3">
                  <div className="h-12 sm:h-14 bg-slate-200 rounded-lg w-11/12" />
                  <div className="h-12 sm:h-14 bg-slate-200 rounded-lg w-4/5" />
                </div>

                <div className="space-y-2 pt-1 max-w-2xl">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 rounded w-4/6" />
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3.5 max-w-md">
                  <div className="h-12 bg-[#083344]/20 rounded-lg w-full sm:w-44" />
                  <div className="h-12 bg-cyan-100 rounded-lg w-full sm:w-40" />
                </div>

                {/* Phone Note */}
                <div className="pt-2">
                  <div className="h-4 bg-slate-100 rounded w-72" />
                </div>
              </div>

              {/* Right Column: Hero Visual Container Skeleton */}
              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-cyan-200/80 bg-slate-100 aspect-[4/3] w-full" />
                <div className="mt-3 h-8 bg-cyan-50 border border-cyan-100 rounded-lg w-full" />
              </div>
            </div>

            {/* Stats Strip Skeleton */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-cyan-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-8 sm:h-10 bg-cyan-100 rounded w-20" />
                    <div className="h-4 bg-slate-100 rounded w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NARRATIVE / CLINICAL TRANSPARENCY SKELETON */}
        <section className="py-14 sm:py-20 bg-white border-b border-cyan-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 space-y-3">
              <div className="h-4 bg-cyan-100 rounded w-36" />
              <div className="h-9 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-5/6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-cyan-100 bg-[#F4FBFC]/60 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100" />
                  <div className="h-5 bg-slate-200 rounded w-4/5" />
                  <div className="space-y-2">
                    <div className="h-3.5 bg-slate-100 rounded w-full" />
                    <div className="h-3.5 bg-slate-100 rounded w-11/12" />
                    <div className="h-3.5 bg-slate-100 rounded w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED TREATMENTS SKELETON */}
        <section className="py-14 sm:py-20 bg-[#F9FEFE] border-b border-cyan-100/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-3">
                <div className="h-4 bg-cyan-100 rounded w-32" />
                <div className="h-9 bg-slate-200 rounded w-72" />
              </div>
              <div className="h-5 bg-slate-200 rounded w-32 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-cyan-100/90 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100" />
                    <div className="h-5 bg-cyan-50 rounded-full w-24" />
                  </div>
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3.5 bg-slate-100 rounded w-full" />
                    <div className="h-3.5 bg-slate-100 rounded w-5/6" />
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="h-4 bg-slate-200 rounded w-24" />
                    <div className="h-4 bg-cyan-100 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING CTA BANNER SKELETON */}
        <section className="py-14 sm:py-18 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#083344]/80 p-8 sm:p-12 space-y-6">
              <div className="h-4 bg-cyan-200/40 rounded w-36" />
              <div className="h-10 bg-white/20 rounded w-2/3" />
              <div className="h-5 bg-white/10 rounded w-1/2" />
              <div className="flex gap-4 pt-2">
                <div className="h-12 bg-white/40 rounded-lg w-44" />
                <div className="h-12 bg-cyan-400/20 rounded-lg w-40" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SKELETON */}
      <footer className="bg-[#083344] text-slate-400 py-12 border-t border-cyan-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 bg-white/20 rounded w-32" />
                <div className="h-3.5 bg-white/10 rounded w-full" />
                <div className="h-3.5 bg-white/10 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
