'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Compass,
  Layers,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { PATHWISSE_ROLE_CARDS, type RoleCardData } from '@/lib/role-card-data';
import { PathwisseRoleCard } from '@/components/careers/PathwisseRoleCard';
import { CAREER_VOICE_URL, APP_AUTH_URL } from '@/lib/site-config';

const CATEGORIES = [
  { id: 'all', label: 'All Roles' },
  { id: 'technology', label: 'Technology' },
  { id: 'data', label: 'Data & AI' },
  { id: 'product', label: 'Product' },
  { id: 'design', label: 'Design' },
  { id: 'business', label: 'Business' },
  { id: 'engineering', label: 'Core Engineering' },
];

export function CareersExplorerClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRoles = useMemo(() => {
    return PATHWISSE_ROLE_CARDS.filter((card) => {
      const matchesCategory =
        selectedCategory === 'all' || card.familyCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        card.roleName.toLowerCase().includes(q) ||
        card.roleFamily.toLowerCase().includes(q) ||
        card.responsibilities.some((r) => r.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#fcfdfd] text-[#142e50] min-h-screen">
      {/* ── FLAGSHIP HERO ── */}
      <section className="relative border-b border-[#e5ebf2] bg-gradient-to-b from-[#f8fafc] to-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb & Kicker */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748b] mb-4">
            <a href="/" className="hover:text-[#173c6e]">Home</a>
            <span>/</span>
            <span className="text-[#173c6e] font-bold">Careers Universe</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2458ae]/10 text-[#2458ae] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2458ae] animate-pulse" />
              PATHWISSE ROLE EXPLORER
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-['Outfit'] leading-[1.12]">
              There is more than one way forward.{' '}
              <span className="text-[#2458ae]">Find a direction worth building.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Explore careers through the actual work they involve, the skills they require, and the demonstrable project proof that gets you noticed. Not merely job titles—verifiable capabilities.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-10 p-3 sm:p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search a role, skill or interest (e.g. SQL, Product, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:outline-none focus:border-[#2458ae] transition-colors"
              />
            </div>

            {/* Quick Diagnostic Link */}
            <a
              href={CAREER_VOICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173c6e] text-white text-xs font-mono font-semibold hover:bg-[#122f56] transition-colors shadow-2xs whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Not sure? Take Career Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#173c6e] border-[#173c6e] text-white shadow-xs scale-105'
                    : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] hover:text-[#0f172a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIBLE CARDS GRID ── */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] font-bold block mb-1">
              COLLECTIBLE CAPABILITY CARDS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#0f172a]">
              Available Role Blueprints ({filteredRoles.length})
            </h2>
          </div>

          <span className="text-xs font-mono text-[#64748b] bg-white border border-[#e2e8f0] px-3 py-1.5 rounded-lg shadow-2xs">
            Every card includes interactive labs
          </span>
        </div>

        {filteredRoles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredRoles.map((role) => (
              <PathwisseRoleCard key={role.slug} role={role} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
            <Compass className="w-8 h-8 text-[#94a3b8] mx-auto" />
            <h3 className="text-base font-bold text-[#0f172a]">No roles match your search</h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto">
              Try adjusting your query or category filter. You can also explore the 206 early-career catalogue on our hire directory.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#2458ae] font-semibold underline mt-2"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* ── PATHWISSE PHILOSOPHY BANNER ── */}
      <section className="border-t border-[#e2e8f0] bg-[#f8fafc] py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono font-bold text-[#2458ae] uppercase tracking-wider">
            THE PATHWISSE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-[#0f172a]">
            “This is not merely a job title. It is a capability you can understand, build and prove.”
          </h2>
          <p className="text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Every role card connects you to real skill progression, hands-on GitHub project blueprints, and verifiable readiness signals that eliminate guesswork for learners and hiring teams alike.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <a
              href={APP_AUTH_URL}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173c6e] text-white text-xs font-mono font-bold hover:bg-[#122f56] transition-colors shadow-xs"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/hire"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#e2e8f0] text-[#142e50] text-xs font-mono font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>Browse 206 Entry-Level Roles</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
