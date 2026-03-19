import React, { useState } from 'react';
import { MOCK_TRADES } from '../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Zap, ChevronRight, ArrowRightLeft, ShieldCheck, Cpu, Plus, TrendingUp } from 'lucide-react';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25,0.46,0.45,0.94] } } };

const alliances = [
  { name: 'Green Guardians',  rank: '#04', pts: '124k', mb: '4.2k', color: '#10B981', emoji: '🌿', bio: 'Focused on reforestation and biodiversity across central India.', joined: true  },
  { name: 'Water Warriors',   rank: '#12', pts: '89k',  mb: '2.8k', color: '#06B6D4', emoji: '💧', bio: 'Protecting freshwater sources through community-driven action.', joined: false },
  { name: 'Solar Sentinels',  rank: '#02', pts: '156k', mb: '5.2k', color: '#F59E0B', emoji: '⚡', bio: 'Deploying renewable energy solutions to rural schools.',         joined: false },
];

const AllianceCard = ({ a, i }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div variants={fadeUp}
      whileHover={{ y: -6, boxShadow: `0 24px 48px rgba(0,0,0,0.35), 0 0 60px ${a.color}15` }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      className="surface p-5 flex flex-col cursor-pointer relative overflow-hidden"
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Subtle gradient bg on hover */}
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: `radial-gradient(circle at top right, ${a.color}06, transparent 60%)` }} />

      <div className="relative flex justify-between items-start mb-4">
        <motion.div animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }} transition={{ type: 'spring', stiffness: 300 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl select-none"
          style={{ background: `${a.color}12`, border: `1px solid ${a.color}25` }}>
          {a.emoji}
        </motion.div>
        <span className={`badge ${a.joined ? 'badge-success' : 'badge-accent'}`} style={{ fontSize: '9px', padding: '2px 10px' }}>
          {a.joined ? '✓ Joined' : 'Open'}
        </span>
      </div>

      <h4 className="relative text-[15px] font-bold text-white mb-0.5">{a.name}</h4>
      <p className="relative text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: a.color }}>{a.rank} Global</p>
      <p className="relative text-[11px] leading-relaxed mb-5" style={{ color: '#64748B' }}>{a.bio}</p>

      <div className="relative grid grid-cols-2 gap-2.5 mt-auto">
        {[{ k: 'Eco Yield', v: a.pts }, { k: 'Members', v: a.mb }].map((s, j) => (
          <div key={j} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[15px] font-bold text-white">{s.v}</p>
            <p className="text-[9px] font-medium uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
          </div>
        ))}
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        className={a.joined ? 'btn-ghost mt-4 w-full text-[12px]' : 'btn-primary mt-4 w-full text-[12px]'}
        style={{ padding: '10px' }}>
        {a.joined ? 'View Alliance' : 'Request to Join'}
      </motion.button>
    </motion.div>
  );
};

export default function NexusPage() {
  const [tab, setTab] = useState('alliances');
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(8, 145, 178, 0.06) 100%)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #00F2FE, transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: '#22D3EE' }}>Global Network</p>
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">Collaboration Nexus</h1>
            <p className="text-[13px]" style={{ color: '#94A3B8' }}>Form alliances, trade eco-credits, and amplify your collective impact.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[{ k: 'Alliances', v: '12.4k', c: '#00F2FE' }, { k: 'Active Now', v: '3.2k', c: '#10B981' }, { k: 'Trades Today', v: '840', c: '#F59E0B' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] font-medium uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {[['alliances', 'Alliances'], ['trades', 'Eco-Credit Exchange']].map(([val, label]) => (
          <motion.button key={val} onClick={() => setTab(val)} whileTap={{ scale: 0.96 }}
            className="px-4 py-[7px] rounded-lg text-[11px] font-semibold transition-all cursor-pointer relative"
            style={{ color: tab === val ? 'white' : '#64748B' }}>
            {tab === val && <motion.div layoutId="ntab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #0891B2, #00F2FE)' }} />}
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {tab === 'alliances' ? (
          <motion.div key="alliances" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alliances.map((a, i) => <AllianceCard key={i} a={a} i={i} />)}
          </motion.div>
        ) : (
          <motion.div key="trades" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="surface p-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-[14px] font-semibold text-white mb-0.5">Eco-Credit Exchange</h3>
                <p className="text-[11px]" style={{ color: '#475569' }}>Inter-school Resource Transfers</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                <ArrowRightLeft size={18} style={{ color: '#F59E0B' }} />
              </div>
            </div>
            <div className="space-y-2.5">
              {MOCK_TRADES.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#22D3EE' }}>
                    {i % 3 === 0 ? <Zap size={14} /> : i % 3 === 1 ? <ShieldCheck size={14} /> : <Cpu size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-white truncate">
                      <span className="truncate">{t.from}</span>
                      <ChevronRight size={11} style={{ color: '#475569', flexShrink: 0 }} />
                      <span className="truncate">{t.to}</span>
                    </div>
                    <p className="text-[10px] mt-0.5 truncate" style={{ color: '#475569' }}>{t.action}</p>
                  </div>
                  <p className="text-[9px] font-semibold uppercase shrink-0" style={{ color: '#334155' }}>{t.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
