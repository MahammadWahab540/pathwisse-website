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
  ArrowUpRight,
  Cpu,
  Building,
  Wrench,
  Zap,
  Radio,
  FlaskConical,
  Activity,
  Plane,
  Leaf,
  Factory,
  Flame,
  Bot,
  Atom,
  SlidersHorizontal
} from 'lucide-react';
import { ALL_206_ROLE_CARDS, type ExtendedRoleCardData } from '@/lib/role-card-data';
import { PathwisseRoleCard } from '@/components/careers/PathwisseRoleCard';
import { CAREER_VOICE_URL, APP_AUTH_URL } from '@/lib/site-config';
import { HairlineFigure } from '@/components/ui/hairline-figure';

// 13 Engineering & Tech Worlds
export const CAREER_WORLDS = [
  { id: 'all', name: 'All 13 Career Worlds', count: 206, icon: Layers },
  { id: 'cse', name: 'Computer Science', count: 26, icon: Cpu },
  { id: 'civil', name: 'Civil Engineering', count: 15, icon: Building },
  { id: 'mech', name: 'Mechanical Engineering', count: 15, icon: Wrench },
  { id: 'elec', name: 'Electrical Engineering', count: 15, icon: Zap },
  { id: 'ece', name: 'Electronics & Comm', count: 15, icon: Radio },
  { id: 'chem', name: 'Chemical Engineering', count: 15, icon: FlaskConical },
  { id: 'biomed', name: 'Biomedical Engineering', count: 15, icon: Activity },
  { id: 'aero', name: 'Aerospace Engineering', count: 15, icon: Plane },
  { id: 'env', name: 'Environmental Engg', count: 15, icon: Leaf },
  { id: 'ime', name: 'Industrial & Mfg', count: 15, icon: Factory },
  { id: 'petro', name: 'Petroleum Engineering', count: 15, icon: Flame },
  { id: 'robotics', name: 'Robotics & Automation', count: 15, icon: Bot },
  { id: 'materials', name: 'Materials Science', count: 15, icon: Atom },
];

export function CareersExplorerClient() {
  const [selectedWorld, setSelectedWorld] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<'all' | 'published_paths' | 'trainee'>('all');

  const filteredRoles = useMemo(() => {
    return ALL_206_ROLE_CARDS.filter((card) => {
      // 1. World / Stream Filter
      const matchesWorld = selectedWorld === 'all' || card.streamId === selectedWorld;

      // 2. Readiness tier filter
      const matchesTier =
        tierFilter === 'all' ||
        (tierFilter === 'published_paths' && card.hasPublishedPath) ||
        (tierFilter === 'trainee' && !card.hasPublishedPath);

      // 3. Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        card.roleName.toLowerCase().includes(q) ||
        card.roleFamily.toLowerCase().includes(q) ||
        (card.streamName && card.streamName.toLowerCase().includes(q)) ||
        card.responsibilities.some((r) => r.toLowerCase().includes(q)) ||
        (card.skills && card.skills.some((s) => s.toLowerCase().includes(q)));

      return matchesWorld && matchesTier && matchesSearch;
    });
  }, [selectedWorld, searchQuery, tierFilter]);

  // Group roles by Stream when "All Worlds" is active and not searching
  const groupedByStream = useMemo(() => {
    if (selectedWorld !== 'all' || searchQuery.trim().length > 0) return null;
    const groups: Record<string, { world: typeof CAREER_WORLDS[0]; roles: ExtendedRoleCardData[] }> = {};
    for (const w of CAREER_WORLDS.slice(1)) {
      groups[w.id] = {
        world: w,
        roles: filteredRoles.filter((r) => r.streamId === w.id),
      };
    }
    return groups;
  }, [selectedWorld, searchQuery, filteredRoles]);

  return (
    <div className="bg-[#fcfdfd] text-[#142e50] min-h-screen">
      {/* ── FLAGSHIP HERO ── */}
      <section className="relative border-b border-[#e5ebf2] bg-gradient-to-b from-[#f8fafc] to-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748b] mb-4">
            <a href="/" className="hover:text-[#173c6e]">Home</a>
            <span>/</span>
            <span className="text-[#173c6e] font-bold">Role Directory</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2458ae]/10 text-[#2458ae] text-xs font-mono font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#2458ae] animate-pulse" />
                13 CAREER WORLDS · 206 ENTRY-LEVEL ROLES
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-['Outfit'] leading-[1.12]">
                There is more than one way forward.{' '}
                <span className="text-[#2458ae]">Every role has an authentic roadmap.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                Explore 206 published engineering roles across 13 engineering worlds. Every card represents a concrete capability you can understand, build, and prove through authentic GitHub capstones and skill benchmarks.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-[#cbd5e1] shadow-2xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] font-bold mb-1">
                Capability Landscape
              </span>
              <div className="w-full max-w-[220px]">
                <HairlineFigure figure="terrain" interactiveHint intensity={0.7} label="81-pillar capability terrain" />
              </div>
              <span className="text-[11px] font-mono text-[#2458ae] mt-1 font-semibold">
                81 nodes answer pointer
              </span>
            </div>
          </div>

          {/* Search Bar & Quick Diagnostic */}
          <div className="mt-10 p-3 sm:p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by role title, stream, skill (e.g. Full Stack, CAD, Robotics, Python, ETP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:bg-white focus:outline-none focus:border-[#2458ae] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as any)}
                className="px-3 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs font-mono font-medium text-[#475569] focus:outline-none focus:border-[#2458ae]"
              >
                <option value="all">All Tiers (206)</option>
                <option value="published_paths">Published Paths (118)</option>
                <option value="trainee">Early Trainee (88)</option>
              </select>

              <a
                href={CAREER_VOICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#173c6e] text-white text-xs font-mono font-semibold hover:bg-[#122f56] transition-colors shadow-2xs whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="hidden sm:inline">Career Audit</span>
                <span className="sm:hidden">Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 13 Career Worlds Horizontal Scroller */}
          <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748b] font-bold">
                13 Career Worlds — Select to Filter
              </span>
              <span className="text-xs font-mono text-[#2458ae]">
                Showing {filteredRoles.length} roles
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CAREER_WORLDS.map((world) => {
                const IconComponent = world.icon;
                const isSelected = selectedWorld === world.id;
                return (
                  <button
                    key={world.id}
                    onClick={() => setSelectedWorld(world.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-[#173c6e] border-[#173c6e] text-white shadow-xs scale-[1.02]'
                        : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#cbd5e1] hover:text-[#0f172a]'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-300' : 'text-[#94a3b8]'}`} />
                    <span>{world.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {world.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIBLE CARDS GRID ── */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {groupedByStream && (
          <div className="space-y-16">
            {Object.values(groupedByStream).map(({ world, roles }) => {
              if (roles.length === 0) return null;
              const IconComp = world.icon;
              return (
                <div key={world.id} id={`stream-${world.id}`} className="space-y-6">
                  {/* Stream Section Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#eef4ff] text-[#1e58b8]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#0f172a]">
                          {world.name}
                        </h2>
                        <span className="text-xs font-mono text-[#64748b]">
                          {roles.length} entry-level role blueprints with verified skills & projects
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedWorld(world.id)}
                      className="text-xs font-mono font-semibold text-[#2458ae] hover:underline hidden sm:inline-flex items-center gap-1"
                    >
                      <span>Focus on {world.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 3-column Grid for this stream */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                    {roles.map((role) => (
                      <PathwisseRoleCard key={role.slug} role={role} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!groupedByStream && filteredRoles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] font-bold block mb-1">
                  FILTERED ROLE BLUEPRINTS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#0f172a]">
                  Showing {filteredRoles.length} Roles
                </h2>
              </div>

              <span className="text-xs font-mono text-[#64748b] bg-white border border-[#e2e8f0] px-3 py-1.5 rounded-lg shadow-2xs">
                Each card includes authentic labs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {filteredRoles.map((role) => (
                <PathwisseRoleCard key={role.slug} role={role} />
              ))}
            </div>
          </div>
        )}

        {filteredRoles.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#e2e8f0] space-y-3">
            <Compass className="w-8 h-8 text-[#94a3b8] mx-auto" />
            <h3 className="text-base font-bold text-[#0f172a]">No roles match your search criteria</h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto">
              Try adjusting your query or resetting the 13 career worlds filter to inspect all 206 roles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedWorld('all');
                setTierFilter('all');
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
            13 WORLDS · 206 ROLES · VERIFIABLE PROOF
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
              <span>Hire Early Talent From These Roles</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
