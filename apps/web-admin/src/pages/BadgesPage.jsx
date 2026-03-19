import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, CheckCircle2 } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';

const badges = [
  { id: 'green-thumb', name: 'Green Thumb', desc: 'Plant 10 trees in a single mission', icon: '🌱', color: '#10B981' },
  { id: 'water-saver', name: 'Water Saver', desc: 'Save 500L of water across missions', icon: '💧', color: '#22D3EE' },
  { id: 'waste-warrior', name: 'Waste Warrior', desc: 'Divert 50Kg of waste from landfill', icon: '♻️', color: '#FBBF24' },
  { id: 'solar-pioneer', name: 'Solar Pioneer', desc: 'Complete 5 energy audit missions', icon: '⚡', color: '#F97316' },
  { id: 'eco-leader', name: 'Eco Leader', desc: 'Reach Level 10 in any skill', icon: '👑', color: '#4F6EF7' },
  { id: 'data-analyst', name: 'Data Analyst', desc: 'Log 100 environmental data points', icon: '📊', color: '#A855F7' },
];

export default function BadgesPage() {
  const unlocked = MOCK_USER.badges;
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Achievements</h1><p className="text-[13px] text-[#8B92A5] mt-1 flex items-center gap-2"><Award size={14} /> {unlocked.length} of {badges.length} Badges Unlocked</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b, i) => {
          const u = unlocked.includes(b.id);
          return (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className={`card p-6 group cursor-pointer ${!u && 'opacity-40'}`}>
              <div className="flex justify-between items-start mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${b.color}15` }}>{b.icon}</div>
                {u ? <CheckCircle2 size={20} className="text-[#10B981]" /> : <Lock size={18} className="text-[#4B5563]" />}
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1">{b.name}</h3>
              <p className="text-[12px] text-[#8B92A5]">{b.desc}</p>
              <div className="mt-5 pt-4 border-t border-[#1F2937]">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${u ? 'text-[#10B981]' : 'text-[#4B5563]'}`}>{u ? 'UNLOCKED' : 'LOCKED'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
