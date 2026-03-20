import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3, LayoutDashboard, Target, Trophy, User, BookOpen,
  Bell, Settings, Sparkles, Globe, Zap, Network, Search,
  ChevronDown, Flame, ClipboardCheck, Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

/* ── Cursor Spotlight ────────────────────────────────────── */
function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} className="cursor-spotlight" style={{ willChange: 'transform' }} />;
}

/* ── Floating Particle ───────────────────────────────────── */
function Particles() {
  const particles = [
    { x: '15%', size: 3, color: '#00F2FE', dur: '7s', delay: '0s'   },
    { x: '30%', size: 2, color: '#0891B2', dur: '9s', delay: '2s'   },
    { x: '60%', size: 4, color: '#22D3EE', dur: '6s', delay: '4s'   },
    { x: '75%', size: 2, color: '#00F2FE', dur: '8s', delay: '1s'   },
    { x: '85%', size: 3, color: '#0891B2', dur: '7s', delay: '3s'   },
    { x: '45%', size: 2, color: '#10B981', dur: '10s', delay: '5s'  },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div key={i} className="particle absolute bottom-0"
          style={{ left: p.x, width: p.size, height: p.size, background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--dur': p.dur, '--delay': p.delay }} />
      ))}
    </div>
  );
}

/* ── Nav Item ────────────────────────────────────────────── */
const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-150 cursor-pointer select-none relative ${
        active ? 'text-white' : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="navActive"
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(120deg, rgba(0, 242, 254, 0.2), rgba(8, 145, 178, 0.1))',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      )}
      <Icon size={16} strokeWidth={active ? 2.2 : 1.7}
        className={`relative z-10 transition-colors ${active ? 'text-[#22D3EE]' : ''}`} />
      <span className="relative z-10">{label}</span>
      {active && (
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }}
          className="ml-auto w-1.5 h-1.5 rounded-full relative z-10"
          style={{ background: '#00F2FE', boxShadow: '0 0 8px rgba(0, 242, 254, 0.9)' }}
        />
      )}
    </motion.div>
  </Link>
);

/* ── Section Label ───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="px-3.5 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 mt-1" style={{ color: '#2D3748' }}>{children}</p>
);

export default function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  const p = location.pathname;

  const pageTitle = p === '/' ? 'Dashboard' : p.replace('/', '').replace(/-/g, ' ');

  return (
    <div className="flex h-screen overflow-hidden font-['Inter']" style={{ background: 'var(--bg-base)' }}>
      <CursorSpotlight />
      <Particles />

      {/* Static ambient orbs */}
      <div className="ambient-orb w-[600px] h-[600px] -top-32 -left-48 opacity-[0.035]" style={{ background: '#00F2FE' }} />
      <div className="ambient-orb w-[400px] h-[400px] -bottom-24 -right-24 opacity-[0.025]" style={{ background: '#06B6D4' }} />

      {/* ═══ SIDEBAR ═══════════════════════════════════════ */}
      <aside className="relative z-10 w-[260px] h-full flex flex-col border-r overflow-y-auto no-scrollbar shrink-0"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>

        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.5), transparent)' }} />

        {/* Logo / Brand */}
        <div className="px-5 pt-5 pb-2 flex items-center gap-3">
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-[14px]"
            style={{ background: 'linear-gradient(135deg, #00F2FE, #0891B2)', boxShadow: '0 0 20px rgba(0, 242, 254, 0.5)' }}>
            G
          </motion.div>
          <span className="text-[15px] font-bold text-white tracking-tight">GAIA <span style={{ color: '#22D3EE' }}>Protocol</span></span>
        </div>

        {/* User Profile */}
        <div className="px-4 pt-3 pb-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer group transition-all"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] text-white"
                style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 16px rgba(249,115,22,0.4)' }}>
                {(user?.first_name?.[0] || 'A')}{(user?.last_name?.[0] || 'S')}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0D1120]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate">{user?.first_name || 'Admin'} {user?.last_name || '(Demo User)'}</p>
              <p className="text-[10px] font-medium" style={{ color: '#475569' }}>{user?.role === 'admin' ? 'System Administrator' : 'Eco Warrior · Lvl 14'}</p>
            </div>
            <ChevronDown size={12} className="text-[#334155] group-hover:text-[#64748B] transition-colors" />
          </motion.div>
        </div>

        {/* Search */}
        <div className="px-4 mb-2">
          <motion.div whileHover={{ borderColor: 'rgba(0, 242, 254, 0.3)' }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer group transition-all"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#475569' }}>
            <Search size={13} />
            <span className="text-[12px] flex-1">Search</span>
            <kbd className="text-[9px] px-1.5 py-[2px] rounded-md font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#334155' }}>⌘K</kbd>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="px-3 flex-1">
          <SectionLabel>Main</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem to="/"           icon={LayoutDashboard} label="Dashboard"  active={p === '/'} />
            <NavItem to="/missions"   icon={Target}          label="Missions"   active={p === '/missions'} />
            <NavItem to="/learn"      icon={BookOpen}        label="Learning Hub" active={p === '/learn'} />
            <NavItem to="/analytics"  icon={BarChart3}       label="Analytics"  active={p === '/analytics'} />
            <NavItem to="/nexus"      icon={Network}         label="Collaboration" active={p === '/nexus'} />
          </nav>
          
          <SectionLabel>Management</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem to="/submissions" icon={ClipboardCheck} label="Approval Queue" active={p === '/submissions'} />
            <NavItem to="/students"    icon={Users}          label="Member List"    active={p === '/students'} />
          </nav>

          <SectionLabel>Compete</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem to="/rankings"   icon={Trophy}    label="Leaderboard"  active={p === '/rankings'} />
            <NavItem to="/badges"     icon={Sparkles}  label="Reward Vault" active={p === '/badges'} />
            <NavItem to="/career"     icon={Zap}       label="Career Path"  active={p === '/career'} />
          </nav>
          <SectionLabel>System</SectionLabel>
          <nav className="space-y-0.5">
            <NavItem to="/map"        icon={Globe} label="Impact Map"  active={p === '/map'} />
            <NavItem to="/profile"    icon={User}  label="Account Center" active={p === '/profile'} />
          </nav>
        </div>

        {/* Promo Card */}
        <div className="p-4 mt-3">
          <div className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(8, 145, 178, 0.08))',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              boxShadow: '0 0 40px rgba(0, 242, 254, 0.1)'
            }}>
            {/* Animated blobs */}
            <motion.div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 pointer-events-none"
              style={{ background: '#00F2FE', filter: 'blur(30px)' }}
              animate={{ scale: [1, 1.2, 1], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} />
            <motion.div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15 pointer-events-none"
              style={{ background: '#06B6D4', filter: 'blur(25px)' }}
              animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1.5">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                  <Flame size={14} className="text-[#FBBF24]" />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#FBBF24' }}>7-Day Streak!</span>
              </div>
              <p className="text-[13px] font-semibold text-white mb-0.5">Unlock more features</p>
              <p className="text-[11px] mb-4" style={{ color: '#94A3B8' }}>Get 14 days free — no card needed.</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary text-[11px] w-full" style={{ padding: '10px', fontSize: '12px' }}>
                Switch to Pro Plan
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ══════════════════════════════════════════ */}
      <main className="relative flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden z-10">
        {/* Sticky Header */}
        <header className="h-14 flex items-center justify-between px-7 sticky top-0 z-40 backdrop-blur-xl"
          style={{ background: 'rgba(8,11,20,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <motion.h2 key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
              className="text-[15px] font-semibold text-white capitalize tracking-tight">
              {pageTitle}
            </motion.h2>
            {p === '/' && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="badge badge-accent" style={{ fontSize: '9px', padding: '2px 8px' }}>LIVE</motion.span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ scale: 1.03 }}
              onClick={() => toast.success('XP sync complete. Rank verified.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold cursor-pointer"
              style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#22D3EE', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
              <Zap size={13} />
              {(user?.xp || 124500).toLocaleString()} XP
            </motion.div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => toast('No new transmissions', { icon: '📡' })}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}>
              <Bell size={16} />
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-[1.5px]"
                style={{ background: '#EF4444', borderColor: '#080B14' }} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
              onClick={() => toast.loading('Opening system terminal...', { duration: 1000 })}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}>
              <Settings size={16} />
            </motion.button>
          </div>
        </header>

        {/* Page Content with transition */}
        <div className="p-6 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
