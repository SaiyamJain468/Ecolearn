import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3, LayoutDashboard, Target, Trophy, User, BookOpen,
  Bell, Settings, Sparkles, Globe, Zap, Network, Search,
  ChevronDown, Layers, PanelLeft, Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GaiaCommand from './GaiaCommand';

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
      active
        ? 'bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/10 text-white border border-[#6366F1]/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
        : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.05]'
    }`}>
      <Icon size={16} strokeWidth={active ? 2.2 : 1.7} className={active ? 'text-[#A5B4FC]' : ''} />
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
    </div>
  </Link>
);

export default function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  const p = location.pathname;

  return (
    <div className="flex min-h-screen font-['Inter'] overflow-x-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Ambient orbs */}
      <div className="ambient-orb w-[500px] h-[500px] top-[-100px] left-[-200px] opacity-[0.04]" style={{ background: '#6366F1' }} />
      <div className="ambient-orb w-[400px] h-[400px] bottom-0 right-[-100px] opacity-[0.03]" style={{ background: '#06B6D4' }} />

      {/* ===== SIDEBAR ===== */}
      <aside className="relative z-10 w-[260px] h-screen sticky top-0 flex flex-col border-r overflow-y-auto no-scrollbar shrink-0" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        {/* Sidebar inner glow top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

        {/* User Profile */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3 cursor-pointer group p-2 rounded-xl hover:bg-white/[0.04] transition-all">
            <div className="relative">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] text-white shrink-0" style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 16px rgba(249,115,22,0.35)' }}>
                {(user?.first_name?.[0] || 'A')}{(user?.last_name?.[0] || 'S')}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0D1120]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{user?.first_name || 'Aryan'} Sharma</p>
              <p className="text-[10px] text-[#475569] font-medium">Eco Warrior · Lvl 14</p>
            </div>
            <ChevronDown size={13} className="text-[#475569] group-hover:text-[#94A3B8] transition-colors" />
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[#475569] hover:text-[#94A3B8] hover:border-white/[0.12] transition-all cursor-pointer" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Search size={14} />
            <span className="text-[12px] flex-1">Search</span>
            <kbd className="text-[9px] px-1.5 py-[2px] rounded-md font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}>⌘K</kbd>
          </div>
        </div>

        {/* Nav */}
        <div className="px-3 flex-1 space-y-5">
          <div>
            <p className="px-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#334155' }}>Main</p>
            <nav className="space-y-0.5">
              <NavItem to="/" icon={LayoutDashboard} label="Dashboard" active={p === '/'} />
              <NavItem to="/missions" icon={Target} label="Missions" active={p === '/missions'} />
              <NavItem to="/learn" icon={BookOpen} label="Learning" active={p === '/learn'} />
              <NavItem to="/analytics" icon={BarChart3} label="Metrics" active={p === '/analytics'} />
              <NavItem to="/nexus" icon={Network} label="Teams" active={p === '/nexus'} />
            </nav>
          </div>
          <div>
            <p className="px-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#334155' }}>Compete</p>
            <nav className="space-y-0.5">
              <NavItem to="/rankings" icon={Trophy} label="Leaderboard" active={p === '/rankings'} />
              <NavItem to="/badges" icon={Sparkles} label="Badges" active={p === '/badges'} />
              <NavItem to="/career" icon={Zap} label="Career" active={p === '/career'} />
            </nav>
          </div>
          <div>
            <p className="px-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: '#334155' }}>More</p>
            <nav className="space-y-0.5">
              <NavItem to="/map" icon={Globe} label="Impact Map" active={p === '/map'} />
              <NavItem to="/profile" icon={User} label="Profile" active={p === '/profile'} />
            </nav>
          </div>
        </div>

        {/* Promo Card */}
        <div className="p-4 mt-3">
          <div className="relative overflow-hidden rounded-2xl p-5" style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 0 30px rgba(99,102,241,0.1)'
          }}>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20" style={{ background: '#6366F1', filter: 'blur(30px)' }} />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-15" style={{ background: '#06B6D4', filter: 'blur(25px)' }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Flame size={14} className="text-[#FBBF24]" />
                <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wider">7-Day Streak!</span>
              </div>
              <p className="text-[13px] font-semibold text-white mb-0.5">Unlock more features</p>
              <p className="text-[11px] mb-4" style={{ color: '#94A3B8' }}>Get started with 14 days free.</p>
              <button className="btn-primary text-[11px] w-full py-2.5" style={{ fontSize: '12px' }}>
                Switch to Pro Plan
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="relative flex-1 min-w-0 overflow-x-hidden z-10">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-7 sticky top-0 z-40 backdrop-blur-xl" style={{ background: 'rgba(8,11,20,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-semibold text-white capitalize tracking-tight">
              {p === '/' ? 'Dashboard' : p.replace('/', '').replace(/-/g, ' ')}
            </h2>
            {p === '/' && (
              <span className="badge badge-accent text-[9px]" style={{ padding: '2px 8px' }}>LIVE</span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Zap size={13} />
              124,500 XP
            </div>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}>
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-[1.5px]" style={{ background: '#EF4444', borderColor: '#080B14' }} />
            </button>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}>
              <Settings size={16} />
            </button>
          </div>
        </header>

        {/* Page */}
        <div className="p-6 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <Outlet key={p} />
          </AnimatePresence>
        </div>
      </main>

      <GaiaCommand />
    </div>
  );
}
