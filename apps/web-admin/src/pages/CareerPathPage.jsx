import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Lock, CheckCircle2, Star, TrendingUp } from 'lucide-react';

const skills = [
  { name: 'Environmental Science', level: 8, max: 10, xp: '8,200', color: '#10B981', desc: 'Ecology, climate, biodiversity' },
  { name: 'Renewable Energy',      level: 5, max: 10, xp: '4,800', color: '#F59E0B', desc: 'Solar, wind, hydro fundamentals' },
  { name: 'Water Conservation',    level: 7, max: 10, xp: '6,900', color: '#06B6D4', desc: 'Hydrology & resource management' },
  { name: 'Waste Management',      level: 3, max: 10, xp: '2,100', color: '#F97316', desc: 'Segregation, recycling loops' },
  { name: 'Carbon Trading',        level: 0, max: 10, xp: '0',     color: '#6366F1', desc: 'Eco credit exchange & policy' },
  { name: 'Eco-Policy Design',     level: 0, max: 10, xp: '0',     color: '#A855F7', desc: 'Governance, SDGs, reporting' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const totalLevel = skills.reduce((a, s) => a + s.level, 0);
const maxTotalLevel = skills.reduce((a, s) => a + s.max, 0);

export default function CareerPathPage() {
  const [sel, setSel] = useState(null);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(217,70,239,0.05) 100%)', border: '1px solid rgba(99,102,241,0.22)' }}>
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #A855F7, transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: '#A5B4FC' }}>Skill Tree</p>
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">Career Path</h1>
            <p className="text-[13px]" style={{ color: '#94A3B8' }}>Level up your eco-skills to unlock advanced career opportunities.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[{ k: 'Total Level', v: totalLevel, c: '#6366F1' }, { k: 'Max Possible', v: maxTotalLevel, c: '#94A3B8' }, { k: 'Completion', v: `${Math.round((totalLevel / maxTotalLevel) * 100)}%`, c: '#10B981' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring' }}
                className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <motion.div key={i} variants={fadeUp}
            whileHover={s.unlocked !== false ? { y: -5, boxShadow: `0 20px 48px rgba(0,0,0,0.3), 0 0 50px ${s.color}14` } : {}}
            onClick={() => s.level > 0 && setSel(sel === i ? null : i)}
            className="surface p-5 flex flex-col cursor-pointer group"
            style={{ opacity: s.level === 0 ? 0.4 : 1, transition: 'all 0.3s ease', borderColor: sel === i ? `${s.color}50` : undefined }}
          >
            <div className="flex justify-between items-start mb-4">
              <motion.div whileHover={{ rotate: 10, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, boxShadow: s.level > 0 ? `0 0 20px ${s.color}20` : 'none' }}>
                <Zap size={18} style={{ color: s.color }} />
              </motion.div>
              {s.level > 0 ? <CheckCircle2 size={16} style={{ color: '#10B981' }} /> : <Lock size={14} style={{ color: '#334155' }} />}
            </div>

            <h3 className="text-[14px] font-bold text-white mb-0.5 group-hover:text-[#A5B4FC] transition-colors">{s.name}</h3>
            <p className="text-[10px] mb-4 leading-relaxed" style={{ color: '#64748B' }}>{s.desc}</p>

            <div className="mt-auto">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: '#334155' }}>
                <span>{s.xp} XP</span>
                <span>Lvl {s.level} / {s.max}</span>
              </div>
              <div className="h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                  animate={{ width: `${(s.level / s.max) * 100}%` }}
                  transition={{ duration: 1.3, delay: 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ background: s.color, boxShadow: `0 0 12px ${s.color}80` }} />
              </div>
              <div className="flex mt-2">
                {Array.from({ length: s.max }, (_, j) => (
                  <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + j * 0.04 }}
                    className="flex-1 h-1 mx-px rounded-full" style={{ background: j < s.level ? s.color : 'rgba(255,255,255,0.06)' }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
