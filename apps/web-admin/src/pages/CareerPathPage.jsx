import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Lock, CheckCircle2 } from 'lucide-react';

const skills = [
  { name: 'Environmental Science', level: 8, max: 10, xp: '8,200', color: '#10B981', unlocked: true },
  { name: 'Renewable Energy',      level: 5, max: 10, xp: '4,800', color: '#F59E0B', unlocked: true },
  { name: 'Water Conservation',    level: 7, max: 10, xp: '6,900', color: '#06B6D4', unlocked: true },
  { name: 'Waste Management',      level: 3, max: 10, xp: '2,100', color: '#F97316', unlocked: true },
  { name: 'Carbon Trading',        level: 0, max: 10, xp: '0',     color: '#6366F1', unlocked: false },
  { name: 'Eco-Policy Design',     level: 0, max: 10, xp: '0',     color: '#A855F7', unlocked: false },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function CareerPathPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Career Path</h1>
          <p className="text-[12px] mt-0.5" style={{ color: '#64748B' }}>Skill progression &amp; unlockable opportunities</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} className="surface px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}><Target size={18} style={{ color: '#A5B4FC' }} /></div>
          <div><p className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Next Milestone</p><p className="text-[18px] font-bold text-white leading-tight">Level <span style={{ color: '#6366F1' }}>15</span></p></div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <motion.div key={i} variants={fadeUp}
            whileHover={s.unlocked ? { y: -4, boxShadow: `0 16px 40px rgba(0,0,0,0.3)` } : {}}
            className="surface p-5 flex flex-col"
            style={{ opacity: s.unlocked ? 1 : 0.4, transition: 'all 0.3s ease' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <Zap size={18} style={{ color: s.color }} />
              </div>
              {s.unlocked ? <CheckCircle2 size={16} style={{ color: '#10B981' }} /> : <Lock size={14} style={{ color: '#334155' }} />}
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-0.5">{s.name}</h3>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-5" style={{ color: '#475569' }}>{s.xp} XP earned</p>
            <div className="mt-auto">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: '#334155' }}>
                <span>Lvl {s.level}</span><span>/{s.max}</span>
              </div>
              <div className="h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.level / s.max) * 100}%` }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ background: s.color, boxShadow: `0 0 10px ${s.color}80` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
