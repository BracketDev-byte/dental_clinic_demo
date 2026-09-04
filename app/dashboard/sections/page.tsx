'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  Loader2,
  ImageIcon,
  Layers,
  ExternalLink,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type { HomepageSection } from '@/app/lib/types';

interface SectionFormState {
  sectionKey: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  secondaryImageUrl: string;
  backgroundImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  badgeText: string;
  visible: boolean;
  sortOrder: number;
}

const SECTION_LABELS: Record<string, { name: string; description: string; hasImage?: boolean }> = {
  hero: {
    name: 'Hero Section',
    description: 'The primary headline, narrative, and main clinic surgery/facility image at the top of the homepage.',
    hasImage: true,
  },
  narrative_questions: {
    name: 'Clinical Transparency & Q&A',
    description: 'Core questions patients ask before booking (pricing honesty, gentle care, Kololo location).',
  },
  featured_treatments: {
    name: 'Featured Treatments',
    description: 'Highlighted clinical services displayed on the homepage.',
  },
  team_showcase: {
    name: 'Dental Surgeons & Faculty',
    description: 'Section showcasing qualified dental specialists on the homepage.',
  },
  smile_gallery_preview: {
    name: 'Smile Transformations Preview',
    description: 'Before and after comparison showcase section.',
  },
  patient_reviews: {
    name: 'Patient Reviews & Testimonials',
    description: 'Google verified patient testimonials and experiences.',
  },
  booking_cta: {
    name: 'Booking & Direct Intake Banner',
    description: 'Bottom call-to-action banner with appointment button and WhatsApp link.',
    hasImage: true,
  },
  blog_preview: {
    name: 'Dental Advice & Blog Preview',
    description: 'Latest clinical advice and patient education articles on the homepage.',
  },
};

export default function SectionsManagerPage() {
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sections' | 'media-directory'>('sections');

  // Media directory collection
  const [mediaList, setMediaList] = useState<{
    dentists: Array<{ id: number; name: string; role: string; portraitUrl: string | null }>;
    cases: Array<{ id: number; title: string; beforeImageUrl: string | null; afterImageUrl: string | null }>;
    posts: Array<{ id: number; title: string; coverImageUrl: string | null }>;
  }>({ dentists: [], cases: [], posts: [] });

  const [formData, setFormData] = useState<SectionFormState>({
    sectionKey: 'hero',
    eyebrow: '',
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    secondaryImageUrl: '',
    backgroundImageUrl: '',
    primaryCtaLabel: '',
    primaryCtaUrl: '',
    secondaryCtaLabel: '',
    secondaryCtaUrl: '',
    badgeText: '',
    visible: true,
    sortOrder: 0,
  });

  const populateForm = useCallback((section: HomepageSection) => {
    setFormData({
      sectionKey: section.sectionKey,
      eyebrow: section.eyebrow || '',
      title: section.title || '',
      subtitle: section.subtitle || '',
      description: section.description || '',
      imageUrl: section.imageUrl || '',
      secondaryImageUrl: section.secondaryImageUrl || '',
      backgroundImageUrl: section.backgroundImageUrl || '',
      primaryCtaLabel: section.primaryCtaLabel || '',
      primaryCtaUrl: section.primaryCtaUrl || '',
      secondaryCtaLabel: section.secondaryCtaLabel || '',
      secondaryCtaUrl: section.secondaryCtaUrl || '',
      badgeText: section.badgeText || '',
      visible: section.visible ?? true,
      sortOrder: section.sortOrder ?? 0,
    });
  }, []);

  // Load sections
  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/homepage-sections');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setSections(data.data);
        const current = data.data.find((s: HomepageSection) => s.sectionKey === selectedKey);
        if (current) {
          populateForm(current);
        } else if (data.data.length > 0) {
          setSelectedKey(data.data[0].sectionKey);
          populateForm(data.data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load sections:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedKey, populateForm]);

  // Load media items from other tables for the directory view
  const fetchMedia = useCallback(async () => {
    try {
      const [teamRes, galleryRes, blogRes] = await Promise.all([
        fetch('/api/cms/team/list'),
        fetch('/api/cms/gallery/list'),
        fetch('/api/cms/blog/list'),
      ]);
      const [teamData, galleryData, blogData] = await Promise.all([
        teamRes.json(),
        galleryRes.json(),
        blogRes.json(),
      ]);

      setMediaList({
        dentists: teamData.success ? teamData.data : [],
        cases: galleryData.success ? galleryData.data : [],
        posts: blogData.success ? blogData.data : [],
      });
    } catch (err) {
      console.error('Failed to load media items:', err);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function init() {
      await Promise.all([fetchSections(), fetchMedia()]);
    }
    if (!ignore) {
      init();
    }
    return () => {
      ignore = true;
    };
  }, [fetchSections, fetchMedia]);

  const handleSelectSection = (key: string) => {
    setSelectedKey(key);
    const target = sections.find((s) => s.sectionKey === key);
    if (target) {
      populateForm(target);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cms/homepage-sections', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setToast('Section and image URLs saved successfully!');
        fetchSections();
        setTimeout(() => setToast(null), 3500);
      } else {
        alert(data.error || 'Failed to save section');
      }
    } catch (err) {
      console.error('Error saving section:', err);
      alert('Error updating section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
          <p className="text-sm text-slate-500 font-medium">Loading section settings...</p>
        </div>
      </div>
    );
  }

  const activeMeta = SECTION_LABELS[selectedKey] || {
    name: selectedKey,
    description: 'Custom homepage section',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-cyan-100 text-cyan-800 rounded-lg">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              Sections & Image URLs
            </h1>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Manage section copy, visibility, and input image URLs for Hero, Banners, and facility photos.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'sections'
                ? 'bg-white text-cyan-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Homepage Sections
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('media-directory')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'media-directory'
                ? 'bg-white text-cyan-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>All Website Image URLs</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2.5 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}

      {activeTab === 'sections' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Section List / Sidebar Selector */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Section to Edit
            </div>
            {sections.map((sec) => {
              const meta = SECTION_LABELS[sec.sectionKey] || { name: sec.sectionKey };
              const isSelected = sec.sectionKey === selectedKey;
              return (
                <button
                  key={sec.sectionKey}
                  type="button"
                  onClick={() => handleSelectSection(sec.sectionKey)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-50 border border-cyan-200 text-cyan-950 font-semibold shadow-2xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        sec.visible ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    />
                    <div className="truncate">
                      <p className="text-xs font-bold truncate font-sans">{meta.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{sec.title}</p>
                    </div>
                  </div>
                  {meta.hasImage && (
                    <span className="text-[10px] font-mono font-medium text-cyan-700 bg-cyan-100/70 px-1.5 py-0.5 rounded shrink-0">
                      Image
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section Edit Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Active Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    {activeMeta.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeMeta.description}
                  </p>
                </div>

                {/* Visibility toggle button */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                    />
                    <span>{formData.visible ? 'Visible on Homepage' : 'Hidden from Homepage'}</span>
                  </label>
                </div>
              </div>

              {/* IMAGE URL FIELD & PREVIEW (Hero & Banners) */}
              {(selectedKey === 'hero' || selectedKey === 'booking_cta' || activeMeta.hasImage) && (
                <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl space-y-4">
                  <div className="flex items-start gap-2">
                    <ImageIcon className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-bold text-cyan-950 uppercase tracking-wide">
                        {selectedKey === 'hero' ? 'Clinic Hero Facility Image URL' : 'Banner Background Image URL'}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Input the public hosted URL for this image. When empty, a clean clinical placeholder is displayed with a code comment.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Image URL (https://...)
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://example.com/images/clinic-facility.jpg"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-500 mt-1 font-mono">
                      Code comment in template:{' '}
                      <code className="text-cyan-800 bg-cyan-100/50 px-1 py-0.5 rounded">
                        {selectedKey === 'hero'
                          ? '{/* TODO: Replace with clinic hero image URL */}'
                          : '{/* TODO: Add booking banner background image URL */}'}
                      </code>
                    </p>
                  </div>

                  {/* Live Image Preview */}
                  {formData.imageUrl ? (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-slate-700">Live Preview:</p>
                      <div className="relative w-full aspect-[16/9] max-w-md rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <Image
                          src={formData.imageUrl}
                          alt="Section preview"
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-cyan-300 bg-white/70 text-center">
                      <p className="text-xs text-slate-500 font-medium">
                        No image URL provided yet. The page currently displays a clean placeholder container.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Eyebrow & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Eyebrow / Small Header Label
                  </label>
                  <input
                    type="text"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge Text / Location Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Main Heading / Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Main Title / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                />
              </div>

              {/* Subtitle / Narrative */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subtitle / Supporting Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                />
              </div>

              {/* Emergency Note / Description */}
              {selectedKey === 'hero' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Emergency Note / Direct Phone Note
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                </div>
              )}

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={formData.primaryCtaLabel}
                    onChange={(e) => setFormData({ ...formData, primaryCtaLabel: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    value={formData.primaryCtaUrl}
                    onChange={(e) => setFormData({ ...formData, primaryCtaUrl: e.target.value })}
                    placeholder="/book"
                    className="w-full mt-1 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryCtaLabel}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaLabel: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    value={formData.secondaryCtaUrl}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaUrl: e.target.value })}
                    placeholder="https://wa.me/..."
                    className="w-full mt-1 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#083344] hover:bg-[#0E4B56] text-white px-6 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs disabled:opacity-50 min-h-[44px]"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Section & Images</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* MEDIA DIRECTORY TAB: Single view for all website image URLs */
        <div className="space-y-6">
          <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs text-cyan-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-cyan-950">
                All Website Media & Image URLs Directory
              </p>
              <p className="mt-0.5 text-cyan-800 leading-relaxed">
                Per project guidelines, AI stock images are not auto-generated. This directory allows you to review and manage every image URL across the website (Hero, Dentist Portraits, Smile Transformations, and Blog Covers).
              </p>
            </div>
          </div>

          {/* Hero & Section Images */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">
              1. Homepage Section Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Hero Facility Image</span>
                  <span className="text-[10px] font-mono text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                    hero
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {sections.find((s) => s.sectionKey === 'hero')?.imageUrl || 'No image URL set (showing placeholder)'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('sections');
                    handleSelectSection('hero');
                  }}
                  className="text-xs text-cyan-700 font-bold hover:underline"
                >
                  Edit Hero Image →
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Booking Banner Image</span>
                  <span className="text-[10px] font-mono text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                    booking_cta
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {sections.find((s) => s.sectionKey === 'booking_cta')?.imageUrl || 'No image URL set (showing gradient)'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('sections');
                    handleSelectSection('booking_cta');
                  }}
                  className="text-xs text-cyan-700 font-bold hover:underline"
                >
                  Edit Banner Image →
                </button>
              </div>
            </div>
          </div>

          {/* Dental Surgeons Portraits */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">
                2. Dental Surgeon Portraits ({mediaList.dentists.length})
              </h3>
              <Link
                href="/dashboard/team"
                className="text-xs text-cyan-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Manage in Team CMS <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaList.dentists.map((d) => (
                <div key={d.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-800 font-bold text-xs shrink-0 overflow-hidden relative">
                    {d.portraitUrl ? (
                      <Image src={d.portraitUrl} alt={d.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span>{d.name.split(' ').map((n) => n[0]).join('')}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{d.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{d.role}</p>
                    <p className="text-[10px] font-mono text-cyan-700 truncate mt-0.5">
                      {d.portraitUrl || 'Placeholder active'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smile Cases Before & After */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">
                3. Smile Gallery Before & After Images ({mediaList.cases.length})
              </h3>
              <Link
                href="/dashboard/gallery"
                className="text-xs text-cyan-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Manage in Gallery CMS <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaList.cases.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{c.title}</p>
                  <div className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <div className="truncate">
                      <span className="font-bold text-slate-500">Before:</span>{' '}
                      {c.beforeImageUrl || '{/* TODO: Add before-treatment image URL */}'}
                    </div>
                    <div className="truncate">
                      <span className="font-bold text-slate-500">After:</span>{' '}
                      {c.afterImageUrl || '{/* TODO: Add after-treatment image URL */}'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Post Covers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-sans">
                4. Dental Advice Blog Cover Images ({mediaList.posts.length})
              </h3>
              <Link
                href="/dashboard/blog"
                className="text-xs text-cyan-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Manage in Blog CMS <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaList.posts.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900 truncate">{p.title}</p>
                  <p className="text-[11px] font-mono text-cyan-800 truncate">
                    {p.coverImageUrl || 'No cover image (using article icon)'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
