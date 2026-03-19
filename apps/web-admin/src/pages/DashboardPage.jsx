import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Zap, Target, Trophy, Award, Flame, TrendingUp,
  ArrowUpRight, ChevronRight, Leaf, Droplets, BatteryCharging,
  CheckCircle2, Clock
} from 'lucide-react';
import { MOCK_USER, MOCK_MISSIONS, MOCK_LOGS } from '../lib/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/* ---- ANIMATED COUNTER ---- */
function Counter({ from = 0, to, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const val = useMotionValue(from);
  const smooth = useSpring(val, { stiffness: 55, damping: 16, mass: 0.9 });
  const [display, setDisplay] = useState(from);
  useEffect(() => { if (inView) val.set(to); }, [inView, to]);
  useEffect(() => smooth.on('change', v => setDisplay(Math.floor(v))), [smooth]);
  return <span ref={ref} className="stat-number">{prefix}{display.toLocaleString()}{suffix}</span>;
}

/* ---- TYPEWRITER ---- */
function Typewriter({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 55);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <span>{displayed}{!done && <span className="typing-cursor" />}</span>;
}

/* ---- CHART TOOLTIP ---- */
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl p-3 shadow-2xl border border-white/10 text-[11px]">
      <p className="text-[#475569] font-semibold mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[#94A3B8]">{p.name}</span>
          <span className="text-white font-bold ml-auto">{p.value} XP</span>
        </div>
      ))}
    </div>
  );
};

const chartData = [
  { d: 'Mon', xp: 340 }, { d: 'Tue', xp: 520 }, { d: 'Wed', xp: 290 },
  { d: 'Thu', xp: 680 }, { d: 'Fri', xp: 450 }, { d: 'Sat', xp: 740 }, { d: 'Sun', xp: 620 },
];

const STREAK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const STREAK_DONE = [true, true, true, true, true, true, false];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function DashboardPage() {
  const u = MOCK_USER;
  const xpProgress = 0.72; // 72% to next level
  const missions = MOCK_MISSIONS.slice(0, 3);
  const [tab, setTab] = useState('week');

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {/* ===== HERO GREETING ===== */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.05) 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 0 60px rgba(99,102,241,0.08)'
        }}>
        {/* Animated blobs */}
        <motion.div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-16 right-40 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 2 }} />

        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-1"
              style={{ color: '#A5B4FC' }}
            >
              Good morning ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="text-[28px] font-bold tracking-tight text-white mb-1"
            >
              <Typewriter text={`${u.first_name} ${u.last_name}`} delay={350} />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="text-[13px] mb-5" style={{ color: '#94A3B8' }}
            >
              🌱 7 trees planted by your school this week — keep pushing!
            </motion.p>

            {/* XP Progress */}
            <div className="max-w-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="badge badge-accent" style={{ fontSize: '10px', padding: '2px 10px' }}>Lvl {u.level} · Eco Warrior</span>
                </div>
                <span className="text-[11px] font-semibold" style={{ color: '#6366F1' }}>260 XP to Climate Champion</span>
              </div>
              <div className="xp-bar-track">
                <motion.div className="xp-bar-fill" initial={{ width: 0 }} animate={{ width: `${xpProgress * 100}%` }} transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] font-mono" style={{ color: '#475569' }}><Counter to={u.xp || 12400} suffix=" XP" /></span>
                <span className="text-[10px]" style={{ color: '#475569' }}>Next: 13,660 XP</span>
              </div>
            </div>
          </div>

          {/* 7-Day Streak */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl shrink-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 200 }}>
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[#F97316]" />
              <span className="text-[12px] font-bold text-white">6-Day Streak</span>
            </div>
            <div className="flex gap-2">
              {STREAK_DAYS.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ${
                    i === 6
                      ? 'opacity-25 border border-white/10 text-white/40'
                      : STREAK_DONE[i]
                        ? 'text-white shadow-md'
                        : 'text-white/30'
                  }`} style={{
                    background: STREAK_DONE[i] && i !== 6
                      ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                      : 'rgba(255,255,255,0.04)',
                    boxShadow: STREAK_DONE[i] && i !== 6 ? '0 0 12px rgba(99,102,241,0.5)' : 'none'
                  }}>
                    {STREAK_DONE[i] && i !== 6 ? <CheckCircle2 size={12} /> : d}
                  </div>
                  <span className="text-[8px] font-medium" style={{ color: '#475569' }}>{d}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-[10px]" style={{ color: '#64748B' }}>50 XP bonus unlocks tomorrow!</p>
          </div>
        </div>
      </motion.div>

      {/* ===== QUICK STATS ===== */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Eco Points', value: 12400, icon: Zap, color: '#6366F1', glow: 'rgba(99,102,241,0.25)', suffix: '' },
          { label: 'Missions Done', value: 24, icon: Target, color: '#10B981', glow: 'rgba(16,185,129,0.25)', suffix: '' },
          { label: 'Badges Earned', value: u.badges.length, icon: Award, color: '#F59E0B', glow: 'rgba(245,158,11,0.25)', suffix: '' },
          { label: 'School Rank', value: 2, icon: Trophy, color: '#06B6D4', glow: 'rgba(6,182,212,0.25)', prefix: '#', suffix: '' },
        ].map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="surface p-5 flex flex-col gap-3 cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: `${s.color}15`, boxShadow: `0 0 20px ${s.glow}` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <ArrowUpRight size={13} style={{ color: '#334155' }} className="group-hover:text-[#6366F1] transition-colors" />
            </div>
            <div>
              <p className="text-[26px] font-bold text-white leading-none tracking-tight">
                <Counter to={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
              </p>
              <p className="text-[11px] font-medium mt-1" style={{ color: '#64748B' }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== MISSIONS + ACTIVITY FEED ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Active Missions */}
        <motion.div variants={fadeUp} className="lg:col-span-3 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-semibold text-white">Active Missions</h3>
            <a href="/missions" className="text-[11px] font-medium flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: '#A5B4FC' }}>View all <ArrowUpRight size={12} /></a>
          </div>
          {missions.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ x: 4 }}
              className="surface p-4 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{
                background: i === 0 ? 'rgba(16,185,129,0.12)' : i === 1 ? 'rgba(6,182,212,0.12)' : 'rgba(245,158,11,0.12)'
              }}>
                {i === 0 ? <Leaf size={17} style={{ color: '#10B981' }} /> : i === 1 ? <Droplets size={17} style={{ color: '#06B6D4' }} /> : <BatteryCharging size={17} style={{ color: '#F59E0B' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate group-hover:text-[#A5B4FC] transition-colors">{m.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-medium" style={{ color: '#475569' }}><Clock size={10} className="inline mr-1" />~30 min</span>
                  <span className="text-[9px]" style={{ color: '#334155' }}>·</span>
                  <span className={`text-[9px] font-bold uppercase ${m.difficulty >= 3 ? 'text-[#EF4444]' : m.difficulty >= 2 ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                    {m.difficulty >= 3 ? 'Hard' : m.difficulty >= 2 ? 'Medium' : 'Easy'}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-[12px] font-bold" style={{ color: '#6366F1' }}>+{m.xp} XP</span>
                <ChevronRight size={13} style={{ color: '#334155' }} className="ml-auto mt-1 group-hover:text-[#6366F1] group-hover:translate-x-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly XP Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 surface p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-[14px] font-semibold text-white">Weekly XP</h3>
              <p className="text-[11px] mt-0.5" style={{ color: '#475569' }}>Your performance</p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: '#10B981' }}><TrendingUp size={13} /> +18%</span>
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="xpLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis hide />
                <Tooltip content={<ChartTip />} />
                <Line
                  type="monotone" dataKey="xp" name="XP"
                  stroke="url(#xpLine)" strokeWidth={2.5} dot={false}
                  activeDot={{ r: 5, fill: '#6366F1', stroke: '#080B14', strokeWidth: 2.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      <motion.div variants={fadeUp} className="surface p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[14px] font-semibold text-white">Recent Activity</h3>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold" style={{ color: '#10B981' }}>
            <span className="relative w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#10B981]" />
              <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
            </span>
            LIVE
          </span>
        </div>
        <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {MOCK_LOGS.slice(0, 6).map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-center gap-4 py-3 group cursor-pointer hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-bold"
                style={{
                  background: log.status === 'success' ? 'rgba(16,185,129,0.12)' : log.status === 'warning' ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)',
                  color: log.status === 'success' ? '#10B981' : log.status === 'warning' ? '#F59E0B' : '#A5B4FC'
                }}>
                {log.status === 'success' ? <CheckCircle2 size={14} /> : log.status === 'warning' ? <Flame size={14} /> : <Zap size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-white truncate group-hover:text-[#A5B4FC] transition-colors">{log.message}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#475569' }}>{log.time}</p>
              </div>
              {log.xp && (
                <span className="text-[11px] font-bold shrink-0" style={{ color: '#6366F1' }}>+{log.xp} XP</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ===== DAILY CHALLENGE SPOTLIGHT ===== */}
      <motion.div variants={fadeUp}
        whileHover={{ scale: 1.005 }}
        className="relative overflow-hidden rounded-2xl p-6 cursor-pointer group"
        style={{
          background: 'linear-gradient(135deg, #0D1120 0%, rgba(99,102,241,0.08) 100%)',
          border: '1px solid rgba(99,102,241,0.2)'
        }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(6,182,212,0.03))' }} />
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }} />
        <div className="relative flex items-center gap-5">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.3)' }}>
            🌍
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="badge badge-accent" style={{ fontSize: '9px', padding: '2px 8px' }}>Daily Challenge</span>
              <span className="badge badge-success" style={{ fontSize: '9px', padding: '2px 8px' }}>+500 XP</span>
            </div>
            <h4 className="text-[15px] font-bold text-white">City Biodiversity Survey</h4>
            <p className="text-[11px] mt-0.5" style={{ color: '#94A3B8' }}>Document 5 native plant species in your local area using photos</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary shrink-0"
            style={{ padding: '10px 22px', fontSize: '13px' }}
          >
            Start Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
