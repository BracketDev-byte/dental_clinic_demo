import React from 'react';

interface PlaceholderImageProps {
  label: string;
  comment: string;
  aspect?: string;
  className?: string;
  imageUrl?: string;
}

export function PlaceholderImage({
  label,
  comment,
  aspect = 'aspect-[4/3]',
  className = '',
  imageUrl,
}: PlaceholderImageProps) {
  if (imageUrl && imageUrl.trim().length > 0) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-cyan-50/50 ${aspect} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={label}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-cyan-200/60 bg-gradient-to-b from-cyan-50/70 via-white to-cyan-100/40 p-6 text-center ${aspect} ${className}`}
    >
      {/* Visual wireframe placeholder */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800">
        <svg
          className="h-6 w-6 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-cyan-900/80">
        {label}
      </p>
      <span className="mt-1 text-[11px] text-slate-500 font-mono">
        {comment}
      </span>
    </div>
  );
}
