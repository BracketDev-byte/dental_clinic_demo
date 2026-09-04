'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Stethoscope,
  Users,
  Sparkles,
  Star,
  BookOpen,
  Settings,
  Globe,
  Menu,
  X,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Sections & Image URLs', href: '/dashboard/sections', icon: ImageIcon },
    { name: 'Appointment Requests', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Contact Inquiries', href: '/dashboard/enquiries', icon: Mail },
    { name: 'Treatments & Pricing', href: '/dashboard/treatments', icon: Stethoscope },
    { name: 'Dental Surgeons', href: '/dashboard/team', icon: Users },
    { name: 'Smile Gallery Cases', href: '/dashboard/gallery', icon: Sparkles },
    { name: 'Patient Reviews', href: '/dashboard/reviews', icon: Star },
    { name: 'Advice & Blog Posts', href: '/dashboard/blog', icon: BookOpen },
    { name: 'Clinic Settings & Hours', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#083344] text-slate-200 border-r border-cyan-950/50 shrink-0">
        {/* Brand */}
        <div className="p-5 border-b border-cyan-900 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-700/60 flex items-center justify-center text-cyan-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-white text-sm tracking-tight leading-none font-sans">
                Pearl Dental
              </span>
              <span className="text-[10px] text-cyan-300 font-medium tracking-wide uppercase">
                CMS Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-600/90 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-cyan-900/60 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-cyan-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & view public site button */}
        <div className="p-4 border-t border-cyan-900 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg bg-cyan-950/90 text-cyan-200 hover:bg-cyan-900 hover:text-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>
          <div className="text-[10px] text-cyan-300/60 text-center">
            Kampala Clinic Management Engine
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-[80%] bg-[#083344] text-slate-200 z-10">
            <div className="p-4 border-b border-cyan-900 flex items-center justify-between">
              <span className="font-bold text-white text-sm">Pearl Dental CMS</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      active ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-300 hover:bg-cyan-900/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-cyan-900">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-cyan-950 text-cyan-200"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Public Site</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile / quick header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-slate-800 font-sans">
              Pearl Dental Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Database Connected (Neon Postgres)</span>
            </span>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-900 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
            </Link>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
