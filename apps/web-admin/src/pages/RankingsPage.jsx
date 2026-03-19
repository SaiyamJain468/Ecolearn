import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Trophy, School } from 'lucide-react';

const RankRow = ({ rank, name, subtext, value, highlight, trend }) => (
  <div className={`flex items-center gap-5 p-5 rounded-2xl transition-all ${highlight ? 'bg-gradient-to-r from-[#1E3A8A] to-[#4F6EF7] shadow-lg shadow-[#4F6EF7]/10' : 'bg-[#1A1F2E] border border-[#1F2937] hover:border-[#374151]'}`}>
    <div className="w-10 flex justify-center shrink-0">
      {rank <= 3 ? <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${rank === 1 ? 'bg-[#FBBF24] text-black' : rank === 2 ? 'bg-[#94A3B8] text-black' : 'bg-[#F97316] text-black'}`}>{rank}</div> : <span className="text-[15px] font-bold text-[#4B5563]">#{rank}</span>}
    </div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${highlight ? 'bg-white/20 text-white' : 'bg-[#252B3B] text-[#8B92A5]'}`}>{name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
    <div className="flex-1 min-w-0"><h4 className="text-[14px] font-semibold text-white truncate">{name}</h4><p className={`text-[11px] truncate ${highlight ? 'text-white/60' : 'text-[#4B5563]'}`}>{subtext}</p></div>
    <div className="text-right shrink-0"><p className="text-[15px] font-bold text-white">{value}</p><p className={`text-[10px] font-bold uppercase ${highlight ? 'text-[#22D3EE]' : 'text-[#4B5563]'}`}>XP</p></div>
    <div className="w-6 shrink-0">{trend === 'UP' && <TrendingUp size={16} className={highlight ? 'text-[#22D3EE]' : 'text-[#10B981]'} />}{trend === 'DOWN' && <TrendingDown size={16} className="text-[#EF4444]" />}{trend === 'STABLE' && <Minus size={16} className="text-[#4B5563]" />}</div>
  </div>
);

export default function RankingsPage() {
  const [tab, setTab] = useState('SCHOOLS');
  const schools = [
    { rank: 1, name: 'Kendriya Vidyalaya', subtext: 'Sector 4 · Bhopal', value: '15,240', trend: 'STABLE' },
    { rank: 2, name: 'DPS Bhopal', subtext: 'Neelbad · Bhopal', value: '12,450', trend: 'UP', highlight: true },
    { rank: 3, name: 'Carmel Convent', subtext: 'Govindpura · Bhopal', value: '11,200', trend: 'DOWN' },
    { rank: 4, name: 'Sagar Public', subtext: 'Saket Nagar · Bhopal', value: '9,840', trend: 'STABLE' },
    { rank: 5, name: 'St. Joseph', subtext: 'Arera Colony · Bhopal', value: '8,400', trend: 'UP' },
  ];
  const students = [
    { rank: 1, name: 'Priya Mishra', subtext: 'Class IX-A · DPS', value: '2,890', trend: 'UP' },
    { rank: 2, name: 'Aryan Sharma', subtext: 'Class X-B · DPS', value: '2,450', trend: 'STABLE', highlight: true },
    { rank: 3, name: 'Zarah Khan', subtext: 'Class X-C · DPS', value: '2,100', trend: 'UP' },
    { rank: 4, name: 'Rohan Gupta', subtext: 'Class IX-B · DPS', value: '1,950', trend: 'DOWN' },
    { rank: 5, name: 'Ishita Jain', subtext: 'Class XII-D · DPS', value: '1,800', trend: 'STABLE' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Global Leaderboard</h1><p className="text-[13px] text-[#8B92A5] mt-1">See how you stack against the competition</p></div>
        <div className="card px-5 py-3 flex items-center gap-3"><div className="w-10 h-10 bg-[#10B981]/10 text-[#10B981] rounded-xl flex items-center justify-center"><School size={20} /></div><div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">Standing</p><p className="text-lg font-bold text-white">Rank <span className="text-[#4F6EF7]">#2</span></p></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-1 p-1 bg-[#111827] rounded-xl border border-[#1F2937] w-fit">
            <button onClick={() => setTab('SCHOOLS')} className={`px-5 py-2 rounded-lg text-[12px] font-semibold transition-all ${tab === 'SCHOOLS' ? 'bg-[#4F6EF7] text-white' : 'text-[#8B92A5] hover:text-white'}`}>Schools</button>
            <button onClick={() => setTab('STUDENTS')} className={`px-5 py-2 rounded-lg text-[12px] font-semibold transition-all ${tab === 'STUDENTS' ? 'bg-[#4F6EF7] text-white' : 'text-[#8B92A5] hover:text-white'}`}>Students</button>
          </div>
          <AnimatePresence mode="wait"><motion.div key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="space-y-3">{(tab === 'SCHOOLS' ? schools : students).map((item, i) => <RankRow key={i} {...item} />)}</motion.div></AnimatePresence>
        </div>
        <div className="space-y-4">
          <div className="card p-6"><h3 className="text-[15px] font-semibold text-white mb-5">Monthly Climb</h3>
            <div className="space-y-4">{[{ n: 'St. Joseph', g: '+14', hl: false }, { n: 'DPS Bhopal', g: '+4', hl: true }, { n: 'Sagar Public', g: '+9', hl: false }].map((c, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-xl ${c.hl ? 'bg-[#252B3B] border border-[#374151]' : 'hover:bg-[#252B3B]'} transition-colors`}>
                <span className={`text-[13px] font-medium ${c.hl ? 'text-[#4F6EF7]' : 'text-[#8B92A5]'}`}>{c.n}</span>
                <span className="flex items-center gap-1 px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-lg text-[11px] font-bold"><ArrowUpRight size={12} /> {c.g}</span>
              </div>
            ))}</div>
          </div>
          <div className="card p-6 text-center"><div className="w-14 h-14 bg-[#FBBF24]/10 text-[#FBBF24] rounded-full flex items-center justify-center mx-auto mb-3"><Trophy size={24} /></div><h4 className="text-[15px] font-semibold text-white mb-1">City Showdown</h4><p className="text-[12px] text-[#8B92A5]">Indore <span className="text-[#FBBF24] font-bold">vs</span> Bhopal<br /><span className="text-[#4F6EF7] font-bold mt-1 block">Ends in 2 days</span></p></div>
        </div>
      </div>
    </div>
  );
}
