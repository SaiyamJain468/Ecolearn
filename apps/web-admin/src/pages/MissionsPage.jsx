import React from 'react';
import { MOCK_MISSIONS } from '../lib/mockData';
import { motion } from 'framer-motion';
import { Target, Clock, Zap, ChevronRight } from 'lucide-react';

const MissionCard = ({ mission, i }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
    className="card p-6 flex flex-col h-full group cursor-pointer hover:border-[#374151]">
    <div className="flex justify-between items-start mb-5">
      <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
        mission.difficulty >= 3 ? 'bg-[#EF4444]/10 text-[#EF4444]' :
        mission.difficulty >= 2 ? 'bg-[#FBBF24]/10 text-[#FBBF24]' : 'bg-[#10B981]/10 text-[#10B981]'}`}>
        {mission.difficulty >= 3 ? 'HARD' : mission.difficulty >= 2 ? 'MEDIUM' : 'EASY'}
      </div>
      <div className="px-3 py-1 bg-[#4F6EF7]/10 text-[#4F6EF7] rounded-lg text-[10px] font-bold">+{mission.xp} XP</div>
    </div>
    <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-[#4F6EF7] transition-colors">{mission.title}</h3>
    <p className="text-[12px] text-[#8B92A5] mb-auto leading-relaxed">{mission.description}</p>
    <div className="flex items-center justify-between pt-5 mt-5 border-t border-[#1F2937]">
      <div className="flex items-center gap-4 text-[#4B5563]">
        <span className="flex items-center gap-1.5 text-[11px] font-medium"><Clock size={13} /> {mission.time || '2 Days'}</span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium"><Zap size={13} /> {mission.category}</span>
      </div>
      <ChevronRight size={16} className="text-[#4B5563] group-hover:text-[#4F6EF7] transition-all" />
    </div>
  </motion.div>
);

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Mission Control</h1><p className="text-[13px] text-[#8B92A5] mt-1">Active field operations</p></div>
        <div className="flex gap-2">
          {['All', 'Plant', 'Water', 'Waste', 'Energy'].map(c => (
            <button key={c} className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${c === 'All' ? 'bg-[#4F6EF7] text-white' : 'bg-[#1A1F2E] text-[#8B92A5] border border-[#1F2937] hover:border-[#374151] hover:text-white'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_MISSIONS.map((m, i) => <MissionCard key={m.id} mission={m} i={i} />)}
      </div>
    </div>
  );
}
