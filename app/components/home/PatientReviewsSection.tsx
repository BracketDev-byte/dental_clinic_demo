'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Review, HomepageSection } from '@/app/lib/types';

interface PatientReviewsSectionProps {
  reviews: Review[];
  section?: HomepageSection | null;
}

export function PatientReviewsSection({ reviews, section }: PatientReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  const eyebrow = section?.eyebrow || 'Patient Feedback';
  const title = section?.title || 'What Patients in Kampala Say About Their Care';
  const subtitle = section?.subtitle || 'Read candid experiences from patients who visited our Kololo clinic for dental pain relief, hygiene cleanings, restorations, and cosmetic smile care.';
  const badgeText = section?.badgeText || 'GOOGLE VERIFIED EXPERIENCES';

  useEffect(() => {
    if (displayReviews.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displayReviews.length, isPaused]);

  if (displayReviews.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
  };

  const activeReview = displayReviews[currentIndex];

  return (
    <section aria-labelledby="reviews-heading" className="bg-[#F8FDFE] border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">05</span>
            <span className="text-cyan-400">/</span>
            <span>VERIFIED PATIENT REVIEWS</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Summary & Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block border-l-2 border-cyan-600 pl-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-800">
                {eyebrow}
              </p>
            </div>

            <h2 id="reviews-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              {title}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {subtitle}
            </p>

            {/* Aggregated Rating Block */}
            <div className="p-4 rounded-xl bg-white border border-cyan-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Patient Satisfaction Score</span>
                <span className="text-xs font-bold text-cyan-900 font-mono">4.9 / 5.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
                <span className="text-xs text-slate-500 ml-2">Based on 140+ Google Reviews</span>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous patient review"
                className="p-2.5 rounded-lg border border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 transition-colors shadow-2xs cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next patient review"
                className="p-2.5 rounded-lg border border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50 hover:text-cyan-900 transition-colors shadow-2xs cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <span className="text-xs font-mono text-slate-500 ml-2" aria-live="polite">
                {currentIndex + 1} of {displayReviews.length}
              </span>
            </div>
          </div>

          {/* Right Active Review Carousel Card */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl bg-white border border-cyan-200/90 p-8 sm:p-10 shadow-2xs transition-all">
              <Quote className="w-10 h-10 text-cyan-200 mb-4" aria-hidden="true" />

              {/* Rating Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label={`Rating: ${activeReview.rating || 5} out of 5 stars`}>
                {Array.from({ length: activeReview.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl text-slate-800 leading-relaxed font-normal italic min-h-[100px]">
                &ldquo;{activeReview.reviewText}&rdquo;
              </blockquote>

              {/* Patient Meta */}
              <div className="mt-8 pt-5 border-t border-cyan-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {activeReview.patientName}
                  </h3>
                  {activeReview.treatment && (
                    <p className="text-xs font-semibold text-cyan-800">
                      Procedure: {activeReview.treatment}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-[#F4FBFC] px-3 py-1.5 rounded-lg border border-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  <span>{activeReview.source || 'Verified Patient Review'}</span>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="mt-6 flex items-center gap-1.5" role="tablist" aria-label="Review pagination">
                {displayReviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to review ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer p-0 min-h-[16px] min-w-[16px] flex items-center justify-center`}
                  >
                    <span className={`block rounded-full transition-all ${
                      idx === currentIndex ? 'w-6 h-2 bg-cyan-700' : 'w-2 h-2 bg-cyan-200 hover:bg-cyan-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
