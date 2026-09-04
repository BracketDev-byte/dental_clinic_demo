import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import type { ClinicalFaq, HomepageSection } from '@/app/lib/types';

interface NarrativeQuestionsSectionProps {
  faqs?: ClinicalFaq[];
  section?: HomepageSection | null;
}

export function NarrativeQuestionsSection({ faqs, section }: NarrativeQuestionsSectionProps) {
  const displayFaqs = faqs && faqs.length > 0 ? faqs : [];

  const eyebrow = section?.eyebrow || 'Clear Answers';
  const title = section?.title || 'Clear Answers Before You Step Through Our Door';
  const subtitle = section?.subtitle || 'We believe you deserve honest information about your oral health, pain management, and treatment costs before sitting in a clinic chair.';
  const badgeText = section?.badgeText || 'COMMONLY ASKED QUESTIONS';

  return (
    <section aria-labelledby="transparency-heading" className="bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">02</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL TRANSPARENCY</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        
        {/* Section Title */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block border-l-2 border-cyan-600 pl-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
              {eyebrow}
            </p>
          </div>
          <h2 id="transparency-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
            {title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Narrative Q&A Structured Matrix */}
        {displayFaqs.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {displayFaqs.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-7 rounded-xl bg-[#F8FDFE] border border-cyan-200/80 hover:border-cyan-400 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                      {item.question}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500 italic">No clinical FAQs published at this time.</p>
        )}

      </div>
    </section>
  );
}
