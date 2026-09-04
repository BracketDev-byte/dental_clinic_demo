'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import type { SmileCase } from '@/app/lib/types';

export default function GalleryManagerPage() {
  const [cases, setCases] = useState<SmileCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    treatment: 'Cosmetic Gap Closure',
    description: '',
    caseDetails: '',
    beforeImageUrl: '',
    afterImageUrl: '',
    patientLabel: 'Kampala Patient',
    featured: true,
    published: true,
  });

  const loadData = async () => {
    try {
      const res = await fetch('/api/cms/gallery/list');
      if (res.ok) {
        const data = await res.json();
        setCases(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/gallery/list')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setCases(data.data);
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

      const res = await fetch('/api/cms/gallery', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setToast(editingId ? 'Case updated' : 'Case created');
        setIsEditing(false);
        setEditingId(null);
        resetForm();
        loadData();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(data.error || 'Failed to save case');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c: SmileCase) => {
    setEditingId(c.id);
    setForm({
      title: c.title,
      slug: c.slug,
      treatment: c.treatment,
      description: c.description,
      caseDetails: c.caseDetails || '',
      beforeImageUrl: c.beforeImageUrl || '',
      afterImageUrl: c.afterImageUrl || '',
      patientLabel: c.patientLabel || 'Kampala Patient',
      featured: c.featured,
      published: c.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this case?')) return;
    try {
      const res = await fetch(`/api/cms/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast('Case removed');
        loadData();
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      treatment: 'Cosmetic Gap Closure',
      description: '',
      caseDetails: '',
      beforeImageUrl: '',
      afterImageUrl: '',
      patientLabel: 'Kampala Patient',
      featured: true,
      published: true,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Smile Gallery & Transformations
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage before and after transformation cases and treatment tags.
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
          <span>{isEditing ? 'Cancel' : 'Add Smile Case'}</span>
        </button>
      </div>

      {toast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-sans">
            {editingId ? 'Edit Transformation Case' : 'Add Transformation Case'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Case Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setForm({ ...form, title, slug: editingId ? form.slug : slug });
                }}
                placeholder="Front Teeth Diastema Gap Closure"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
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
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Treatment Name / Service *
              </label>
              <input
                type="text"
                required
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                placeholder="e.g. Composite Bonding or Fluorosis Whitening"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Label (No sensitive data)
              </label>
              <input
                type="text"
                value={form.patientLabel}
                onChange={(e) => setForm({ ...form, patientLabel: e.target.value })}
                placeholder="Patient aged 28, Kampala"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Before Image URL
              </label>
              <input
                type="text"
                value={form.beforeImageUrl}
                onChange={(e) => setForm({ ...form, beforeImageUrl: e.target.value })}
                placeholder="https://... (Leave blank to use wireframe placeholder)"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                After Image URL
              </label>
              <input
                type="text"
                value={form.afterImageUrl}
                onChange={(e) => setForm({ ...form, afterImageUrl: e.target.value })}
                placeholder="https://... (Leave blank to use wireframe placeholder)"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Case Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the presenting complaint and how the treatment resolved it..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
            />
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
              {editingId ? 'Save Changes' : 'Create Case'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading cases...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cyan-800 font-semibold bg-cyan-50 px-2 py-0.5 rounded">
                    {c.treatment}
                  </span>
                  <span className="text-slate-400 text-[11px]">{c.patientLabel}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-sans mt-2">
                  {c.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {c.beforeImageUrl && c.afterImageUrl ? 'Photos Attached' : 'Placeholder Mode'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="p-1.5 text-slate-600 hover:text-cyan-800 hover:bg-slate-100 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md"
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
