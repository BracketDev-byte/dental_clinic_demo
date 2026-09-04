import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { getBlogPostBySlug, getSiteSettings } from '@/app/lib/db-queries';
import { ArrowLeft, BookOpen, User } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Article | Pearl Dental' };

  return {
    title: `${post.title} | Pearl Dental Kampala`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    ? post.content.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Breadcrumb & Article Header */}
        <section className="bg-[#F4FBFC] py-12 sm:py-16 border-b border-cyan-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-900 hover:text-cyan-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all advice articles</span>
            </Link>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-800">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{post.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-sans tracking-tight leading-snug">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-cyan-200/60">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-700" />
                  <span className="font-medium text-slate-700">{post.author}</span>
                </div>
                <span>•</span>
                <span>Pearl Dental Clinical Guidance</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-16 sm:py-20">
          <article className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-lg text-slate-700 font-medium leading-relaxed pb-6 border-b border-slate-100">
              {post.excerpt}
            </p>

            <div className="mt-8 space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Medical disclaimer */}
            <div className="mt-12 p-6 rounded-2xl bg-cyan-50/60 border border-cyan-100 text-xs text-slate-600 leading-relaxed space-y-1">
              <p className="font-bold text-cyan-950">Clinical Disclaimer</p>
              <p>
                This article is for informational purposes only and does not substitute for a clinical in-person examination by a licensed dental surgeon. If you are experiencing fever, facial swelling, or severe pain, visit our emergency clinic on Acacia Avenue immediately.
              </p>
            </div>
          </article>
        </section>

        <BookingCtaSection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
