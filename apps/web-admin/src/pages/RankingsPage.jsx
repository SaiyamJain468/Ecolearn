import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Trophy, School } from 'lucide-react';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const slideIn = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.25,0.46,0.45,0.94] } } };

const schools = [
  { rank: 1, name: 'Kendriya Vidyalaya', sub: 'Sector 4 · Bhopal', val: 15240, trend: 'STABLE' },
  { rank: 2, name: 'DPS Bhopal',         sub: 'Neelbad · Bhopal',  val: 12450, trend: 'UP',    hl: true },
  { rank: 3, name: 'Carmel Convent',     sub: 'Govindpura',        val: 11200, trend: 'DOWN'  },
  { rank: 4, name: 'Sagar Public',       sub: 'Saket Nagar',       val:  9840, trend: 'STABLE' },
  { rank: 5, name: "St. Joseph's",       sub: 'Arera Colony',      val:  8400, trend: 'UP'    },
];
const students = [
  { rank: 1, name: 'Priya Mishra',  sub: 'Class IX-A · DPS', val: 2890, trend: 'UP'    },
  { rank: 2, name: 'Aryan Sharma',  sub: 'Class X-B · DPS',  val: 2450, trend: 'STABLE', hl: true },
  { rank: 3, name: 'Zarah Khan',    sub: 'Class X-C · DPS',  val: 2100, trend: 'UP'    },
  { rank: 4, name: 'Rohan Gupta',   sub: 'Class IX-B · DPS', val: 1950, trend: 'DOWN'  },
  { rank: 5, name: 'Ishita Jain',   sub: 'Class XII-D · DPS',val: 1800, trend: 'STABLE' },
];
const maxVal = schools[0].val;

const RankRow = ({ item, i }) => (
  <motion.div
    variants={slideIn}
    whileHover={{ x: 4 }}
    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer group transition-all ${
      item.hl ? 'glow-card' : 'surface hover:border-white/10'
    }`}
  >
    <div className="w-8 flex justify-center shrink-0">
      {item.rank <= 3
        ? <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${item.rank === 1 ? 'bg-[#F59E0B] text-black' : item.rank === 2 ? 'bg-[#94A3B8] text-black' : 'bg-[#F97316] text-black'}`}>{item.rank}</div>
        : <span className="text-[13px] font-bold" style={{ color: '#475569' }}>#{item.rank}</span>
      }
    </div>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[11px] shrink-0"
      style={{ background: item.hl ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)', color: item.hl ? '#A5B4FC' : '#64748B', border: `1px solid ${item.hl ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
      {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[13px] font-semibold text-white truncate">{item.name}</h4>
      <p className="text-[10px] truncate" style={{ color: '#475569' }}>{item.sub}</p>
      {/* Progress bar relative to #1 */}
      <div className="mt-1.5 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', maxWidth: 160 }}>
        <motion.div className="h-full rounded-full" initial={{ width: 0 }}
          animate={{ width: `${(item.val / maxVal) * 100}%` }}
          transition={{ duration: 1, delay: 0.2 + i * 0.07 }}
          style={{ background: item.hl ? 'linear-gradient(90deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.25)' }} />
      </div>
    </div>
    <div className="text-right shrink-0">
      <p className="text-[14px] font-bold text-white">{item.val.toLocaleString()}</p>
      <p className="text-[9px] font-bold uppercase" style={{ color: '#475569' }}>XP</p>
    </div>
    <div className="w-4 shrink-0">
      {item.trend === 'UP'     && <TrendingUp   size={14} style={{ color: '#10B981' }} />}
      {item.trend === 'DOWN'   && <TrendingDown  size={14} style={{ color: '#EF4444' }} />}
      {item.trend === 'STABLE' && <Minus         size={14} style={{ color: '#475569' }} />}
    </div>
  </motion.div>
);

export default function RankingsPage() {
  const [tab, setTab] = useState('SCHOOLS');
  const data = tab === 'SCHOOLS' ? schools : students;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Header */}
      <motion.div variants={slideIn} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-bold text-white tracking-tight">Global Leaderboard</h1>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-[#10B981]" />
                <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
              </span>
              <span className="text-[9px] font-bold uppercase text-[#10B981] tracking-wider">Live</span>
            </div>
          </div>
          <p className="text-[12px]" style={{ color: '#64748B' }}>DPS Bhopal is <span style={{ color: '#A5B4FC', fontWeight: 600 }}>#2</span> · 2,790 XP behind #1</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} className="surface px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)' }}><School size={18} style={{ color: '#10B981' }} /></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Standing</p>
            <p className="text-[18px] font-bold text-white leading-tight">Rank <span style={{ color: '#6366F1' }}>#2</span></p></div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Rankings list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {['SCHOOLS', 'STUDENTS'].map(t => (
              <motion.button key={t} onClick={() => setTab(t)} whileTap={{ scale: 0.96 }}
                className="px-4 py-[7px] rounded-lg text-[11px] font-semibold transition-all cursor-pointer relative"
                style={{ color: tab === t ? 'white' : '#64748B' }}>
                {tab === t && <motion.div layoutId="rtab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }} />}
                <span className="relative z-10">{t === 'SCHOOLS' ? 'Schools' : 'Students'}</span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              variants={stagger} className="space-y-2.5">
              {data.map((r, i) => <RankRow key={r.rank} item={r} i={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Sidebar */}
        <div className="space-y-4">
          <motion.div variants={slideIn} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-4">Monthly Climb</h3>
            <div className="space-y-3">
              {[{ n: "St. Joseph's", g: 14 }, { n: 'DPS Bhopal', g: 4, hl: true }, { n: 'Sagar Public', g: 9 }].map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                  className={`flex justify-between items-center p-3 rounded-xl transition-all ${c.hl ? '' : 'hover:bg-white/[0.03]'}`}
                  style={c.hl ? { background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' } : {}}>
                  <span className="text-[12px] font-medium" style={{ color: c.hl ? '#A5B4FC' : '#94A3B8' }}>{c.n}</span>
                  <span className="flex items-center gap-1 badge badge-success" style={{ fontSize: '10px', padding: '3px 10px' }}>
                    <ArrowUpRight size={11} />+{c.g}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={slideIn} whileHover={{ scale: 1.02 }} className="surface p-5 text-center cursor-pointer">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(245,158,11,0.12)' }}>
              <Trophy size={22} style={{ color: '#F59E0B' }} />
            </motion.div>
            <h4 className="text-[13px] font-semibold text-white mb-1">City Showdown</h4>
            <p className="text-[11px]" style={{ color: '#64748B' }}>Indore <span style={{ color: '#F59E0B', fontWeight: 700 }}>vs</span> Bhopal</p>
            <p className="text-[11px] font-bold mt-1" style={{ color: '#6366F1' }}>Ends in 2 days</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
