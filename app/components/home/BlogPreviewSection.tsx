import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Newspaper } from 'lucide-react';
import type { BlogPost, HomepageSection } from '@/app/lib/types';

interface BlogPreviewSectionProps {
  posts: BlogPost[];
  section?: HomepageSection | null;
}

export function BlogPreviewSection({ posts, section }: BlogPreviewSectionProps) {
  if (!posts || posts.length === 0) return null;

  const eyebrow = section?.eyebrow || 'Dental Education';
  const title = section?.title || 'Oral Health Advice from Our Doctors';
  const subtitle = section?.subtitle || 'Practical clinical guides addressing everyday dental concerns in Uganda: from night toothache management to fluorosis and children\'s oral hygiene.';
  const badgeText = section?.badgeText || 'PATIENT ORAL HEALTH GUIDES';
  const ctaLabel = section?.primaryCtaLabel || 'View All Articles';
  const ctaUrl = section?.primaryCtaUrl || '/blog';

  return (
    <section aria-labelledby="blog-heading" className="bg-white border-b border-cyan-200">
      {/* Constructed Section Header Bar */}
      <div className="border-b border-cyan-100 bg-[#F4FBFC]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs font-medium text-cyan-900 tracking-wider font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-800">07</span>
            <span className="text-cyan-400">/</span>
            <span>CLINICAL INSIGHTS</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Newspaper className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
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
            <h2 id="blog-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
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

        {/* Blog Post Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="flex flex-col justify-between p-6 rounded-xl bg-[#F8FDFE] border border-cyan-200/80 hover:border-cyan-400 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-cyan-900 font-semibold uppercase tracking-wider mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-700" aria-hidden="true" />
                  <span className="font-mono">{post.category}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-cyan-800 transition-colors focus:outline-hidden">
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-cyan-900 hover:text-cyan-700 inline-flex items-center gap-1 py-1"
                >
                  <span>Read guide</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
