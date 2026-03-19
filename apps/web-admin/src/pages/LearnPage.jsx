import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, Star, Lock, X } from 'lucide-react';

const lessons = [
  { id: 1, title: 'Introduction to Composting', category: 'Waste', duration: '15 min', stars: 4, color: '#FBBF24', unlocked: true, completed: true },
  { id: 2, title: 'Rainwater Harvesting', category: 'Water', duration: '20 min', stars: 5, color: '#22D3EE', unlocked: true, completed: true },
  { id: 3, title: 'Indoor Air Quality', category: 'Energy', duration: '12 min', stars: 3, color: '#F97316', unlocked: true, completed: false },
  { id: 4, title: 'Seed Bombing Techniques', category: 'Plant', duration: '18 min', stars: 4, color: '#10B981', unlocked: true, completed: false },
  { id: 5, title: 'Solar Panel Basics', category: 'Energy', duration: '25 min', stars: 5, color: '#4F6EF7', unlocked: false, completed: false },
  { id: 6, title: 'Carbon Credit Trading', category: 'Advanced', duration: '30 min', stars: 5, color: '#A855F7', unlocked: false, completed: false },
];

export default function LearnPage() {
  const [sel, setSel] = useState(null);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Learning Hub</h1><p className="text-[13px] text-[#8B92A5] mt-1 flex items-center gap-2"><BookOpen size={14} /> Interactive eco-education modules</p></div>
        <div className="card px-5 py-3 flex items-center gap-3"><div className="w-10 h-10 bg-[#FBBF24]/10 text-[#FBBF24] rounded-xl flex items-center justify-center"><Star size={20} /></div><div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">Completed</p><p className="text-lg font-bold text-white">2 <span className="text-[13px] text-[#4B5563]">/ 6</span></p></div></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => l.unlocked && setSel(l)}
            className={`card p-6 flex flex-col h-full group ${l.unlocked ? 'cursor-pointer hover:border-[#374151]' : 'opacity-40'}`}>
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${l.color}15` }}>
                {l.unlocked ? <PlayCircle size={20} style={{ color: l.color }} /> : <Lock size={18} className="text-[#4B5563]" />}
              </div>
              <span className="px-3 py-1 bg-[#252B3B] border border-[#1F2937] rounded-lg text-[10px] font-bold text-[#4B5563] uppercase">{l.category}</span>
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-auto group-hover:text-[#4F6EF7] transition-colors">{l.title}</h3>
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#1F2937] text-[#4B5563]">
              <span className="flex items-center gap-1.5 text-[11px] font-medium"><Clock size={12} /> {l.duration}</span>
              <div className="flex">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={10} className={j < l.stars ? 'text-[#FBBF24] fill-[#FBBF24]' : 'text-[#252B3B]'} />)}</div>
              {l.completed && <span className="ml-auto text-[10px] font-bold text-[#10B981] uppercase">Done</span>}
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>{sel && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setSel(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
            className="bg-[#1A1F2E] rounded-2xl border border-[#1F2937] p-10 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-6"><div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${sel.color}15` }}><PlayCircle size={28} style={{ color: sel.color }} /></div><button onClick={() => setSel(null)} className="w-9 h-9 rounded-xl bg-[#252B3B] flex items-center justify-center text-[#4B5563] hover:text-[#EF4444]"><X size={18} /></button></div>
            <h2 className="text-2xl font-bold text-white mb-2">{sel.title}</h2>
            <p className="text-[13px] text-[#8B92A5] mb-8">{sel.category} · {sel.duration}</p>
            <button className="btn-accent w-full py-3">{sel.completed ? 'Review Lesson' : 'Start Lesson'}</button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}
