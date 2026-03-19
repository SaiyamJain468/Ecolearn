import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Trophy, ArrowUpRight, School } from 'lucide-react';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } };
const slideIn = { hidden: { opacity: 0, x: -22 }, show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.25,0.46,0.45,0.94] } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 },  show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

const schools = [
  { rank: 1, name: 'Kendriya Vidyalaya', sub: 'Sector 4 · Bhopal',  val: 15240, trend: 'STABLE' },
  { rank: 2, name: 'DPS Bhopal',         sub: 'Neelbad · Bhopal',   val: 12450, trend: 'UP',    hl: true },
  { rank: 3, name: 'Carmel Convent',     sub: 'Govindpura',         val: 11200, trend: 'DOWN'  },
  { rank: 4, name: 'Sagar Public',       sub: 'Saket Nagar',        val:  9840, trend: 'STABLE' },
  { rank: 5, name: "St. Joseph's",       sub: 'Arera Colony',       val:  8400, trend: 'UP'    },
];
const students = [
  { rank: 1, name: 'Priya Mishra',   sub: 'Class IX-A · DPS',  val: 2890, trend: 'UP'    },
  { rank: 2, name: 'Aryan Sharma',   sub: 'Class X-B · DPS',   val: 2450, trend: 'STABLE', hl: true },
  { rank: 3, name: 'Zarah Khan',     sub: 'Class X-C · DPS',   val: 2100, trend: 'UP'    },
  { rank: 4, name: 'Rohan Gupta',    sub: 'Class IX-B · DPS',  val: 1950, trend: 'DOWN'  },
  { rank: 5, name: 'Ishita Jain',    sub: 'Class XII-D · DPS', val: 1800, trend: 'STABLE' },
];

const maxVal = schools[0].val;
const rankColors = ['#F59E0B', '#94A3B8', '#F97316'];

export default function RankingsPage() {
  const [tab, setTab] = useState('SCHOOLS');
  const data = tab === 'SCHOOLS' ? schools : students;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(99,102,241,0.06) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: '#FCD34D' }}>Global Leaderboard</p>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span className="relative w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#10B981]" />
                  <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
                </span>
                <span className="text-[9px] font-bold uppercase text-[#10B981] tracking-wider">Live</span>
              </div>
            </div>
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">School Rankings</h1>
            <p className="text-[13px]" style={{ color: '#94A3B8' }}>DPS Bhopal is <span style={{ color: '#A5B4FC', fontWeight: 700 }}>#2</span> · 2,790 XP behind #1 · This Week: Oct 14–21</p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[{ k: 'Schools', v: '120+', c: '#F59E0B' }, { k: 'Students', v: '48k', c: '#A5B4FC' }, { k: 'Live Updates', v: '60s', c: '#10B981' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring' }}
                className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Leaderboard */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {['SCHOOLS', 'STUDENTS'].map(t => (
                <motion.button key={t} onClick={() => setTab(t)} whileTap={{ scale: 0.96 }}
                  className="px-4 py-[7px] rounded-lg text-[11px] font-semibold cursor-pointer relative"
                  style={{ color: tab === t ? 'white' : '#64748B' }}>
                  {tab === t && <motion.div layoutId="rtab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }} />}
                  <span className="relative z-10">{t === 'SCHOOLS' ? 'Schools' : 'Students — DPS'}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5">
              {data.map((r, i) => (
                <motion.div key={r.rank}
                  variants={slideIn}
                  whileHover={{ x: 5, boxShadow: `0 8px 32px rgba(0,0,0,0.25)` }}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer group transition-all ${r.hl ? 'glow-card' : 'surface'}`}
                  style={{ transition: 'all 0.25s ease' }}
                >
                  <div className="w-8 flex justify-center shrink-0">
                    {r.rank <= 3
                      ? <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] text-black" style={{ background: rankColors[r.rank - 1], boxShadow: `0 0 14px ${rankColors[r.rank - 1]}60` }}>{r.rank}</motion.div>
                      : <span className="text-[13px] font-bold" style={{ color: '#475569' }}>#{r.rank}</span>
                    }
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[11px] shrink-0"
                    style={{ background: r.hl ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)', color: r.hl ? '#A5B4FC' : '#64748B', border: `1px solid ${r.hl ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                    {r.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-semibold text-white truncate">{r.name}</h4>
                    <p className="text-[10px] truncate" style={{ color: '#475569' }}>{r.sub}</p>
                    <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', maxWidth: 200 }}>
                      <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                        animate={{ width: `${(r.val / maxVal) * 100}%` }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.08 }}
                        style={{ background: r.hl ? 'linear-gradient(90deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.22)', boxShadow: r.hl ? '0 0 8px rgba(99,102,241,0.6)' : 'none' }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[15px] font-bold text-white">{r.val.toLocaleString()}</p>
                    <p className="text-[9px] font-bold uppercase" style={{ color: '#334155' }}>XP</p>
                  </div>
                  <div className="w-4 shrink-0">
                    {r.trend === 'UP'     && <TrendingUp   size={13} style={{ color: '#10B981' }} />}
                    {r.trend === 'DOWN'   && <TrendingDown  size={13} style={{ color: '#EF4444' }} />}
                    {r.trend === 'STABLE' && <Minus         size={13} style={{ color: '#475569' }} />}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Your position */}
          <motion.div variants={fadeUp} className="surface p-5 glow-card">
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569 '}}>Your Position</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>AS</div>
              <div><p className="text-[13px] font-bold text-white">Aryan Sharma</p><p className="text-[10px]" style={{ color: '#64748B' }}>DPS Bhopal · Class X-B</p></div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[{ k: 'School Rank', v: '#2', c: '#F59E0B' }, { k: 'Student Rank', v: '#2', c: '#A5B4FC' }].map((s, i) => (
                <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                  <p className="text-[9px] font-medium uppercase" style={{ color: '#475569' }}>{s.k}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] mt-3 text-center" style={{ color: '#64748B' }}>530 XP behind <span style={{ color: '#F59E0B', fontWeight: 700 }}>#1</span> · close!</p>
          </motion.div>

          {/* Weekly climbers */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-4">Biggest Climbers</h3>
            <div className="space-y-3">
              {[{ n: "St. Joseph's", g: 14 }, { n: 'DPS Bhopal', g: 4, hl: true }, { n: 'Sagar Public', g: 9 }].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.09 }}
                  whileHover={{ x: 4 }}
                  className="flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all"
                  style={c.hl ? { background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-[12px] font-medium" style={{ color: c.hl ? '#A5B4FC' : '#94A3B8' }}>{c.n}</span>
                  <span className="badge badge-success" style={{ fontSize: '10px', padding: '3px 10px' }}>
                    <ArrowUpRight size={10} className="inline" /> +{c.g}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* City Showdown */}
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="surface p-5 text-center cursor-pointer">
            <motion.div animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', boxShadow: '0 0 30px rgba(245,158,11,0.15)' }}>
              🏆
            </motion.div>
            <h4 className="text-[14px] font-bold text-white mb-1">City Showdown</h4>
            <p className="text-[12px] mb-2" style={{ color: '#94A3B8' }}>Indore <span style={{ color: '#F59E0B', fontWeight: 700 }}>vs</span> Bhopal</p>
            <span className="badge badge-warning" style={{ fontSize: '10px' }}>Ends in 2 days</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
