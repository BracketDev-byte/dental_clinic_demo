'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, FolderKanban, CheckCircle2 } from 'lucide-react';
import { PlaceholderImage } from '@/app/components/PlaceholderImage';
import type { SmileCase, HomepageSection } from '@/app/lib/types';

interface SmileGalleryPreviewSectionProps {
  cases: SmileCase[];
  section?: HomepageSection | null;
}

export function SmileGalleryPreviewSection({ cases, section }: SmileGalleryPreviewSectionProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<number>(cases[0]?.id || 1);

  if (!cases || cases.length === 0) return null;

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const eyebrow = section?.eyebrow || 'Documented Results';
  const title = section?.title || 'Smile Transformations in Kampala';
  const subtitle = section?.subtitle || 'Examine genuine clinical cases completed at our clinic. Review before-and-after photographic records documenting fluorosis correction, gaps, and aesthetic restorations.';
  const badgeText = section?.badgeText || 'BEFORE & AFTER CASE STUDIES';
  const ctaLabel = section?.primaryCtaLabel || 'View All Cases';
  const ctaUrl = section?.primaryCtaUrl || '/gallery';

  return (
    <section aria-labelledby="gallery-heading" className="bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">04</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL DOCUMENTATION</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <FolderKanban className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-block border-l-2 border-cyan-600 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
                {eyebrow}
              </p>
            </div>
            <h2 id="gallery-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              {title}
            </h2>
            <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <Link
            href={ctaUrl}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-950 hover:text-cyan-700 transition-colors whitespace-nowrap pb-1 border-b border-cyan-300 self-start md:self-end min-h-[44px]"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Creative Clinical Case Composition: Interactive Case Selector + Detailed Focus */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Case Navigation Tabs on Left */}
          <div className="lg:col-span-4 space-y-3" role="tablist" aria-label="Smile cases selection">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              Select Patient Case
            </p>
            {cases.map((c) => {
              const isSelected = c.id === activeCase.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`case-panel-${c.id}`}
                  id={`case-tab-${c.id}`}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4FBFC] border-cyan-500 shadow-xs'
                      : 'bg-white border-cyan-200/70 hover:border-cyan-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-900 bg-white border border-cyan-200 px-2 py-0.5 rounded">
                      {c.treatment}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] font-mono font-bold text-cyan-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 font-sans">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {c.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Case Before & After Visual Display on Right */}
          <div
            id={`case-panel-${activeCase.id}`}
            role="tabpanel"
            aria-labelledby={`case-tab-${activeCase.id}`}
            className="lg:col-span-8 rounded-2xl bg-[#F8FDFE] border border-cyan-200/90 p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-cyan-200/80">
              <div>
                <span className="text-xs font-bold uppercase text-cyan-800 font-mono tracking-wider">
                  Case Study #{activeCase.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-sans mt-0.5">
                  {activeCase.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-cyan-200">
                  {activeCase.treatment}
                </span>
                {activeCase.patientLabel && (
                  <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-1 rounded-md border border-cyan-100">
                    {activeCase.patientLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Side by side Before & After Images - Clean, no decorative frames */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Before Container */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between font-mono bg-white px-3 py-1.5 rounded-lg border border-cyan-100">
                  <span>Before Procedure</span>
                  <span className="text-[10px] text-slate-400">Baseline</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-cyan-200/80 bg-white">
                  {/* TODO: Add before-treatment image URL */}
                  <PlaceholderImage
                    label="Before Treatment"
                    comment="TODO: Add before-treatment image URL"
                    aspect="aspect-[4/3]"
                    imageUrl={activeCase.beforeImageUrl || undefined}
                  />
                </div>
              </div>

              {/* After Container */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-900 flex items-center justify-between font-mono bg-[#E0FFFF]/40 px-3 py-1.5 rounded-lg border border-cyan-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
                    <span>Completed Result</span>
                  </span>
                  <span className="text-[10px] text-cyan-700 font-bold">Outcome</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-cyan-200/80 bg-white">
                  {/* TODO: Add after-treatment image URL */}
                  <PlaceholderImage
                    label="After Treatment"
                    comment="TODO: Add after-treatment image URL"
                    aspect="aspect-[4/3]"
                    imageUrl={activeCase.afterImageUrl || undefined}
                  />
                </div>
              </div>

            </div>

            {/* Clinical narrative description */}
            <div className="mt-6 pt-5 border-t border-cyan-200/80">
              <h4 className="text-xs font-bold uppercase text-slate-700 font-mono tracking-wider mb-1.5">
                Clinical Diagnosis & Treatment Note
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeCase.description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
