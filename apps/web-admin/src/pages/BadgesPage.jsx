import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';

const badges = [
  { id: 'green-thumb',  name: 'Green Thumb',    desc: 'Plant 10 trees in a single mission', icon: '🌱', color: '#10B981' },
  { id: 'water-saver',  name: 'Water Saver',    desc: 'Save 500L of water across missions',  icon: '💧', color: '#06B6D4' },
  { id: 'waste-warrior',name: 'Waste Warrior',  desc: 'Divert 50Kg of waste from landfill',  icon: '♻️', color: '#F59E0B' },
  { id: 'solar-pioneer',name: 'Solar Pioneer',  desc: 'Complete 5 energy audit missions',    icon: '⚡', color: '#F97316' },
  { id: 'eco-leader',   name: 'Eco Leader',     desc: 'Reach Level 10 in any skill',         icon: '👑', color: '#00F2FE' },
  { id: 'data-analyst', name: 'Data Analyst',   desc: 'Log 100 environmental data points',   icon: '📊', color: '#A855F7' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } } };

export default function BadgesPage() {
  const unlocked = MOCK_USER.badges;
  const pct = Math.round((unlocked.length / badges.length) * 100);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Achievements</h1>
          <p className="text-[12px] mt-0.5" style={{ color: '#64748B' }}>{unlocked.length} of {badges.length} badges earned · next: Waste Warrior at 500 XP</p>
        </div>
        {/* Progress arc card */}
        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="surface px-5 py-4 flex items-center gap-4">
          <div className="relative w-12 h-12">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <motion.circle cx="18" cy="18" r="14" fill="none" stroke="#00F2FE" strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 14}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - pct / 100) }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 242, 254, 0.7))' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{pct}%</span>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Completion</p>
            <p className="text-[18px] font-bold text-white">{unlocked.length} <span className="text-[12px] font-normal" style={{ color: '#475569' }}>/ {badges.length}</span></p>
          </div>
        </motion.div>
      </motion.div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b, i) => {
          const isUnlocked = unlocked.includes(b.id);
          return (
            <motion.div
              key={b.id}
              variants={fadeUp}
              whileHover={isUnlocked ? { y: -5, boxShadow: `0 16px 40px rgba(0,0,0,0.35), 0 0 40px ${b.color}20` } : {}}
              className="surface p-5 cursor-pointer group"
              style={{
                opacity: isUnlocked ? 1 : 0.4,
                transition: 'all 0.3s ease'
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <motion.div
                  whileHover={isUnlocked ? { rotate: [0, -10, 10, 0], scale: 1.15 } : {}}
                  transition={{ duration: 0.4 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl select-none"
                  style={{ background: `${b.color}12`, border: isUnlocked ? `1px solid ${b.color}25` : '1px solid rgba(255,255,255,0.05)' }}
                >
                  {b.icon}
                </motion.div>
                {isUnlocked
                  ? <CheckCircle2 size={17} style={{ color: b.color }} />
                  : <Lock size={15} style={{ color: '#334155' }} />
                }
              </div>
              <h3 className="text-[14px] font-semibold text-white mb-1">{b.name}</h3>
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: '#64748B' }}>{b.desc}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <span className={`badge text-[8px] ${isUnlocked ? 'badge-success' : ''}`}
                  style={!isUnlocked ? { background: 'rgba(255,255,255,0.04)', color: '#475569', border: '1px solid rgba(255,255,255,0.08)', padding: '2px 10px', borderRadius: 9999 } : { padding: '2px 10px' }}>
                  {isUnlocked ? '✓ UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
