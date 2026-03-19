import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, Star, Lock, X, ChevronRight, CheckCircle2 } from 'lucide-react';

const lessons = [
  { id: 1, title: 'Introduction to Composting', cat: 'Waste',  dur: '15 min', stars: 4, color: '#F59E0B', xp: 60,  unlocked: true,  done: true  },
  { id: 2, title: 'Rainwater Harvesting',        cat: 'Water',  dur: '20 min', stars: 5, color: '#06B6D4', xp: 90,  unlocked: true,  done: true  },
  { id: 3, title: 'Indoor Air Quality',           cat: 'Energy', dur: '12 min', stars: 3, color: '#F97316', xp: 45,  unlocked: true,  done: false },
  { id: 4, title: 'Seed Bombing Techniques',      cat: 'Plant',  dur: '18 min', stars: 4, color: '#10B981', xp: 75,  unlocked: true,  done: false },
  { id: 5, title: 'Solar Panel Basics',           cat: 'Energy', dur: '25 min', stars: 5, color: '#00F2FE', xp: 120, unlocked: false, done: false },
  { id: 6, title: 'Carbon Credit Trading',        cat: 'Adv',    dur: '30 min', stars: 5, color: '#A855F7', xp: 150, unlocked: false, done: false },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const CATS = ['All', 'Plant', 'Water', 'Waste', 'Energy'];

export default function LearnPage() {
  const [sel, setSel] = useState(null);
  const [catFilter, setCatFilter] = useState('All');
  const done = lessons.filter(l => l.done).length;
  const totalXp = lessons.filter(l => l.done).reduce((a, l) => a + l.xp, 0);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Learning Hub</h1>
          <p className="text-[12px] mt-0.5" style={{ color: '#64748B' }}>{done} of {lessons.length} lessons completed · {totalXp} XP earned from lessons</p>
        </div>
        {/* Tab filter */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {CATS.map(c => (
            <motion.button key={c} onClick={() => setCatFilter(c)} whileTap={{ scale: 0.96 }}
              className="px-3 py-[6px] rounded-lg text-[11px] font-semibold transition-all cursor-pointer relative"
              style={{ color: catFilter === c ? 'white' : '#64748B' }}>
              {catFilter === c && <motion.div layoutId="ltab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #0891B2, #00F2FE)' }} />}
              <span className="relative z-10">{c}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((l, i) => (
          <motion.div key={l.id} variants={fadeUp}
            whileHover={l.unlocked ? { y: -4 } : {}}
            onClick={() => l.unlocked && setSel(l)}
            className="surface p-5 flex flex-col h-full"
            style={{ opacity: l.unlocked ? 1 : 0.4, cursor: l.unlocked ? 'pointer' : 'default', transition: 'all 0.25s ease' }}
          >
            <div className="flex justify-between items-start mb-4">
              <motion.div whileHover={l.unlocked ? { scale: 1.1 } : {}} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${l.color}12` }}>
                {l.unlocked ? <PlayCircle size={18} style={{ color: l.color }} /> : <Lock size={16} style={{ color: '#334155' }} />}
              </motion.div>
              {l.done && <CheckCircle2 size={16} style={{ color: '#10B981' }} />}
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-auto group-hover:text-[#22D3EE] transition-colors">{l.title}</h3>
            <div className="flex items-center gap-3 mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: '#475569' }}><Clock size={10} />{l.dur}</span>
              <span className="badge badge-accent" style={{ fontSize: '8px', padding: '1px 7px' }}>+{l.xp} XP</span>
              <div className="flex ml-auto">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={9} style={{ color: j < l.stars ? '#F59E0B' : 'rgba(255,255,255,0.1)', fill: j < l.stars ? '#F59E0B' : 'transparent' }} />)}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSel(null)}>
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="glass-strong rounded-2xl max-w-md w-full p-7"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${sel.color}15`, border: `1px solid ${sel.color}30` }}>
                  <PlayCircle size={24} style={{ color: sel.color }} />
                </div>
                <button onClick={() => setSel(null)} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all" style={{ color: '#64748B' }}><X size={16} /></button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-accent" style={{ fontSize: '9px' }}>{sel.cat}</span>
                <span className="badge badge-success" style={{ fontSize: '9px' }}>+{sel.xp} XP</span>
              </div>
              <h2 className="text-[20px] font-bold text-white mb-1.5">{sel.title}</h2>
              <p className="text-[12px] flex items-center gap-1.5 mb-6" style={{ color: '#64748B' }}><Clock size={12} /> {sel.dur} · {sel.stars}/5 stars</p>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-primary w-full" style={{ padding: '13px', fontSize: '13px' }}>
                {sel.done ? 'Review Lesson' : 'Start Lesson'} <ChevronRight size={15} className="inline ml-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
