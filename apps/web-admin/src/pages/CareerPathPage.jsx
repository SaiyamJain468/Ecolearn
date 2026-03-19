import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Lock, CheckCircle2 } from 'lucide-react';

const skills = [
  { name: 'Environmental Science', level: 8, max: 10, xp: '8,200', color: '#10B981', unlocked: true },
  { name: 'Renewable Energy', level: 5, max: 10, xp: '4,800', color: '#FBBF24', unlocked: true },
  { name: 'Water Conservation', level: 7, max: 10, xp: '6,900', color: '#22D3EE', unlocked: true },
  { name: 'Waste Management', level: 3, max: 10, xp: '2,100', color: '#F97316', unlocked: true },
  { name: 'Carbon Trading', level: 0, max: 10, xp: '0', color: '#4F6EF7', unlocked: false },
  { name: 'Eco-Policy Design', level: 0, max: 10, xp: '0', color: '#A855F7', unlocked: false },
];

export default function CareerPathPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Career Path</h1><p className="text-[13px] text-[#8B92A5] mt-1 flex items-center gap-2"><Zap size={14} /> Skill progression & opportunities</p></div>
        <div className="card px-5 py-3 flex items-center gap-3"><div className="w-10 h-10 bg-[#4F6EF7]/10 text-[#4F6EF7] rounded-xl flex items-center justify-center"><Target size={20} /></div><div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">Next Milestone</p><p className="text-lg font-bold text-white">Level <span className="text-[#4F6EF7]">15</span></p></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={`card p-6 flex flex-col ${!s.unlocked && 'opacity-40'}`}>
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}><Zap size={20} style={{ color: s.color }} /></div>
              {s.unlocked ? <CheckCircle2 size={18} className="text-[#10B981]" /> : <Lock size={16} className="text-[#4B5563]" />}
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-1">{s.name}</h3>
            <p className="text-[11px] text-[#4B5563] font-semibold uppercase mb-5">{s.xp} XP earned</p>
            <div className="mt-auto">
              <div className="flex justify-between text-[10px] font-semibold text-[#4B5563] uppercase mb-2"><span>Lvl {s.level}</span><span>{s.max}</span></div>
              <div className="h-1.5 bg-[#252B3B] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(s.level / s.max) * 100}%` }} transition={{ delay: i * 0.1, duration: 1 }} className="h-full rounded-full" style={{ backgroundColor: s.color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
