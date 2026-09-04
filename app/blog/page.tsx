import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { BookingCtaSection } from '@/app/components/home/BookingCtaSection';
import { getSiteSettings, getBlogPosts } from '@/app/lib/db-queries';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Oral Health Articles & Advice | Pearl Dental Kampala',
  description: 'Practical dental advice from dental surgeons in Kampala. Guidance on toothache management, fluorosis treatments, and children oral health.',
};

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([
    getSiteSettings(),
    getBlogPosts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar settings={settings} />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#F4FBFC] via-white to-white py-14 sm:py-20 border-b border-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1 rounded-full">
              Patient Dental Library
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
              Honest Dental Advice for Everyday Life
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Clear, practical explanations written by our clinical team to answer the questions our Kampala patients ask most frequently.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between p-7 rounded-2xl bg-[#F8FDFE] border border-cyan-100 shadow-2xs hover:border-cyan-200 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-cyan-800 font-semibold uppercase tracking-wider mb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{post.category}</span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 font-sans leading-snug">
                      <Link href={`/blog/${post.slug}`} className="hover:text-cyan-800 transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-cyan-100/70 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">By {post.author}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-cyan-900 hover:text-cyan-700"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BookingCtaSection settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
