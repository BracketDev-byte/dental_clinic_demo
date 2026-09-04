'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Clock } from 'lucide-react';
import type { Treatment } from '@/app/lib/types';

export default function TreatmentsManagerPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    fullContent: '',
    priceText: '',
    durationText: '',
    featured: true,
    published: true,
  });

  const loadData = async () => {
    try {
      const tRes = await fetch('/api/cms/treatments/list');
      if (tRes.ok) {
        const data = await tRes.json();
        setTreatments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/treatments/list')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setTreatments(data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PATCH' : 'POST';
      const body = editingId ? { id: editingId, ...form } : form;

      const res = await fetch('/api/cms/treatments', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setToast(editingId ? 'Treatment updated successfully' : 'Treatment created successfully');
        setIsEditing(false);
        setEditingId(null);
        resetForm();
        loadData();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(data.error || 'Failed to save treatment');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (t: Treatment) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      slug: t.slug,
      shortDescription: t.shortDescription,
      fullContent: t.fullContent,
      priceText: t.priceText || '',
      durationText: t.durationText || '',
      featured: t.featured,
      published: t.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this treatment from the database?')) return;

    try {
      const res = await fetch(`/api/cms/treatments?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setToast('Treatment deleted');
        loadData();
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      shortDescription: '',
      fullContent: '',
      priceText: '',
      durationText: '',
      featured: true,
      published: true,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Dental Treatments & Pricing Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, update fees in Uganda Shillings, and manage featured services.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingId(null);
            setIsEditing(!isEditing);
          }}
          className="inline-flex items-center gap-1.5 bg-[#083344] hover:bg-[#0E4B56] text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg transition-colors self-start"
        >
          {isEditing ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isEditing ? 'Cancel' : 'Add New Treatment'}</span>
        </button>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Edit / Create Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            {editingId ? 'Edit Treatment Record' : 'Create New Treatment'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Treatment Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setForm({ ...form, name, slug: editingId ? form.slug : slug });
                }}
                placeholder="e.g. Ultrasonic Dental Cleaning"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-cyan-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="ultrasonic-dental-cleaning"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-mono text-slate-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price Display (in UGX) *
              </label>
              <input
                type="text"
                value={form.priceText}
                onChange={(e) => setForm({ ...form, priceText: e.target.value })}
                placeholder="From UGX 150,000"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Typical Chair Duration *
              </label>
              <input
                type="text"
                value={form.durationText}
                onChange={(e) => setForm({ ...form, durationText: e.target.value })}
                placeholder="45 - 60 mins"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Description (Appears on cards) *
            </label>
            <textarea
              required
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              placeholder="Short patient explanation of what this procedure achieves..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Clinical Content (Appears on treatment detail page) *
            </label>
            <textarea
              required
              rows={5}
              value={form.fullContent}
              onChange={(e) => setForm({ ...form, fullContent: e.target.value })}
              placeholder="Detailed description answering what happens, how pain is managed, and what aftercare is recommended..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded text-cyan-800"
              />
              <span>Feature on Homepage</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded text-cyan-800"
              />
              <span>Published (Visible to Patients)</span>
            </label>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#083344] hover:bg-[#0E4B56] text-white"
            >
              {editingId ? 'Save Changes' : 'Create Treatment'}
            </button>
          </div>
        </form>
      )}

      {/* Treatments List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading treatments...</div>
      ) : treatments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No treatments recorded. Click &ldquo;Add New Treatment&rdquo; to add your first clinical procedure.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-cyan-800 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t.durationText || 'Standard'}
                  </span>
                  <span className="font-bold text-slate-900 bg-cyan-50 px-2 py-0.5 rounded text-[11px]">
                    {t.priceText || 'Consult First'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-sans">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  /{t.slug}
                </p>

                <p className="mt-2.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {t.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {t.featured && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold uppercase">
                      Featured
                    </span>
                  )}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      t.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {t.published ? 'Live' : 'Draft'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-1.5 text-slate-600 hover:text-cyan-800 hover:bg-slate-100 rounded-md"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
