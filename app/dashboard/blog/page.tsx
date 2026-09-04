'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import type { BlogPost } from '@/app/lib/types';

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Dr. Sarah Namubiru',
    category: 'Dental Advice',
    published: true,
    featured: true,
  });

  const loadData = async () => {
    try {
      const res = await fetch('/api/cms/blog/list');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/blog/list')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setPosts(data.data);
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

      const res = await fetch('/api/cms/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setToast(editingId ? 'Article updated' : 'Article published');
        setIsEditing(false);
        setEditingId(null);
        resetForm();
        loadData();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(data.error || 'Failed to save article');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      author: p.author || 'Dr. Sarah Namubiru',
      category: p.category || 'Dental Advice',
      published: p.published,
      featured: p.featured,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/cms/blog?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast('Article deleted');
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
      excerpt: '',
      content: '',
      author: 'Dr. Sarah Namubiru',
      category: 'Dental Advice',
      published: true,
      featured: true,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Oral Health Advice & Articles
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish clinical advice addressing common patient questions in Uganda.
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
          <span>{isEditing ? 'Cancel' : 'Write New Article'}</span>
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
            {editingId ? 'Edit Advice Article' : 'Write Advice Article'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Article Title *
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
                placeholder="Why Do Toothaches Always Feel Worse at Night?"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
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
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Dr. Sarah Namubiru"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Emergency Dental Advice"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Excerpt *
            </label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Article Body *
            </label>
            <textarea
              required
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
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
              {editingId ? 'Save Changes' : 'Publish Article'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cyan-800 font-semibold">{p.category}</span>
                  <span className="text-[11px] text-slate-400">By {p.author}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-sans mt-1">
                  {p.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {p.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">/{p.slug}</span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1.5 text-slate-600 hover:text-cyan-800 hover:bg-slate-100 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
