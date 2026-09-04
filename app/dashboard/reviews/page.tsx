'use client';

import React, { useEffect, useState } from 'react';
import { Star, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import type { Review } from '@/app/lib/types';

export default function ReviewsManagerPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    patientName: '',
    reviewText: '',
    rating: 5,
    treatment: 'Dental Hygiene & Cleaning',
    source: 'Google Reviews',
    featured: true,
    published: true,
  });

  const loadData = async () => {
    try {
      const res = await fetch('/api/cms/reviews/list');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/reviews/list')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setReviews(data.data);
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

      const res = await fetch('/api/cms/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setToast(editingId ? 'Review updated' : 'Review created');
        setIsEditing(false);
        setEditingId(null);
        resetForm();
        loadData();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(data.error || 'Failed to save review');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (r: Review) => {
    setEditingId(r.id);
    setForm({
      patientName: r.patientName,
      reviewText: r.reviewText,
      rating: r.rating,
      treatment: r.treatment || '',
      source: r.source || 'Google Reviews',
      featured: r.featured,
      published: r.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/cms/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast('Review deleted');
        loadData();
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm({
      patientName: '',
      reviewText: '',
      rating: 5,
      treatment: 'Dental Hygiene & Cleaning',
      source: 'Google Reviews',
      featured: true,
      published: true,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Patient Reviews & Testimonials
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage feedback displayed across the homepage and treatment pages.
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
          <span>{isEditing ? 'Cancel' : 'Add New Review'}</span>
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
            {editingId ? 'Edit Review' : 'Add Patient Review'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Display Name *
              </label>
              <input
                type="text"
                required
                value={form.patientName}
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                placeholder="e.g. Juliet M., Kololo"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rating (1 to 5 Stars) *
              </label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Treatment Received
              </label>
              <input
                type="text"
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                placeholder="Root Canal & Ceramic Crown"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Source
              </label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="Google Reviews"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Review Quote *
            </label>
            <textarea
              required
              rows={3}
              value={form.reviewText}
              onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              placeholder="What the patient experienced regarding pain management, gentleness, or outcomes..."
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
              {editingId ? 'Save Changes' : 'Create Review'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{r.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{r.patientName}</h4>
                  <p className="text-[10px] text-cyan-800">{r.treatment}</p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(r)}
                    className="p-1.5 text-slate-600 hover:text-cyan-800 hover:bg-slate-100 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
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
