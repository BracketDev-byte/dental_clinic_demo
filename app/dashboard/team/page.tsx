'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, ShieldCheck } from 'lucide-react';
import type { TeamMember } from '@/app/lib/types';

export default function TeamManagerPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    role: '',
    qualifications: '',
    shortBio: '',
    fullBio: '',
    yearsExperience: 5,
    registrationInfo: 'UMDPC Registered Specialist',
    featured: true,
    published: true,
  });

  const loadData = async () => {
    try {
      const res = await fetch('/api/cms/team/list');
      if (res.ok) {
        const data = await res.json();
        setTeam(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    fetch('/api/cms/team/list')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setTeam(data.data);
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

      const res = await fetch('/api/cms/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setToast(editingId ? 'Doctor updated successfully' : 'Doctor created successfully');
        setIsEditing(false);
        setEditingId(null);
        resetForm();
        loadData();
        setTimeout(() => setToast(null), 3000);
      } else {
        alert(data.error || 'Failed to save team member');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setForm({
      name: m.name,
      slug: m.slug,
      role: m.role,
      qualifications: m.qualifications,
      shortBio: m.shortBio,
      fullBio: m.fullBio,
      yearsExperience: m.yearsExperience,
      registrationInfo: m.registrationInfo || '',
      featured: m.featured,
      published: m.published,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this doctor from the clinic directory?')) return;

    try {
      const res = await fetch(`/api/cms/team?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setToast('Doctor removed');
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
      role: '',
      qualifications: '',
      shortBio: '',
      fullBio: '',
      yearsExperience: 5,
      registrationInfo: 'UMDPC Registered Specialist',
      featured: true,
      published: true,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">
            Dental Surgeons & Specialists
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage profiles, UMDPC registration, and clinical biographies.
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
          <span>{isEditing ? 'Cancel' : 'Add Team Member'}</span>
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
            {editingId ? 'Edit Doctor Profile' : 'Add Dental Surgeon'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
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
                placeholder="Dr. Sarah Namubiru"
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
                placeholder="dr-sarah-namubiru"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-mono text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Title / Role *
              </label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Lead Dental Surgeon & Orthodontist"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Qualifications *
              </label>
              <input
                type="text"
                required
                value={form.qualifications}
                onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                placeholder="BDS (Makerere), MSc Orthodontics"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                UMDPC Licensing Info
              </label>
              <input
                type="text"
                value={form.registrationInfo}
                onChange={(e) => setForm({ ...form, registrationInfo: e.target.value })}
                placeholder="UMDPC Reg. #4120"
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                value={form.yearsExperience}
                onChange={(e) => setForm({ ...form, yearsExperience: Number(e.target.value) })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Bio (Appears on cards) *
            </label>
            <textarea
              required
              rows={2}
              value={form.shortBio}
              onChange={(e) => setForm({ ...form, shortBio: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Biography (Appears on profile page) *
            </label>
            <textarea
              required
              rows={4}
              value={form.fullBio}
              onChange={(e) => setForm({ ...form, fullBio: e.target.value })}
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
              {editingId ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="p-12 text-center text-slate-500 text-xs">Loading doctors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-800 font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{m.registrationInfo || 'UMDPC Registered'}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-sans">
                  {m.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-700">
                  {m.role}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {m.qualifications}
                </p>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {m.shortBio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {m.yearsExperience}+ years exp.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="p-1.5 text-slate-600 hover:text-cyan-800 hover:bg-slate-100 rounded-md"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
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
