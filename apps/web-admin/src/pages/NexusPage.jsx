import React from 'react';
import { MOCK_TRADES } from '../lib/mockData';
import { motion } from 'framer-motion';
import { Users, Globe, Zap, Cpu, Network, ChevronRight, ArrowRightLeft, ShieldCheck } from 'lucide-react';

export default function NexusPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Collaboration Hub</h1><p className="text-[13px] text-[#8B92A5] mt-1">Connect with global eco-alliances</p></div>
        <div className="flex items-center gap-4">
          <div className="card px-5 py-3 flex items-center gap-3"><div className="w-10 h-10 bg-[#22D3EE]/10 text-[#22D3EE] rounded-xl flex items-center justify-center"><Globe size={20} /></div><div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">Network</p><p className="text-xl font-bold text-white">12.4k</p></div></div>
          <button className="btn-accent flex items-center gap-2"><Users size={16} /> Form Alliance</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ nm: 'Green Guardians', rk: '#04', pts: '124k', mb: '4.2k', st: 'ACTIVE' }, { nm: 'Water Warriors', rk: '#12', pts: '89k', mb: '2.8k', st: 'ACTIVE' }, { nm: 'Solar Sentinels', rk: '#02', pts: '156k', mb: '5.2k', st: 'ACTIVE' }].map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card p-6 hover:border-[#374151]">
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#252B3B] text-[#4F6EF7] flex items-center justify-center font-bold text-lg">{a.nm[0]}</div>
              <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase bg-[#10B981]/10 text-[#10B981]">{a.st}</span>
            </div>
            <h4 className="text-[15px] font-semibold text-white mb-1">{a.nm}</h4>
            <p className="text-[11px] text-[#4B5563] font-semibold uppercase mb-5">Alliance Rank {a.rk}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F2937]"><p className="text-[10px] text-[#4B5563] font-medium mb-1">Eco Yield</p><p className="text-[15px] font-bold text-[#4F6EF7]">{a.pts}</p></div>
              <div className="p-3 bg-[#111827] rounded-xl border border-[#1F2937]"><p className="text-[10px] text-[#4B5563] font-medium mb-1">Members</p><p className="text-[15px] font-bold text-white">{a.mb}</p></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6"><div><h3 className="text-[15px] font-semibold text-white mb-1">Eco-Credit Exchange</h3><p className="text-[12px] text-[#4B5563]">Inter-school Resource Transfers</p></div><div className="w-10 h-10 bg-[#FBBF24]/10 text-[#FBBF24] rounded-xl flex items-center justify-center"><ArrowRightLeft size={20} /></div></div>
        <div className="space-y-3">
          {MOCK_TRADES.map((item, i) => (
            <div key={i} className="flex items-center gap-5 p-5 bg-[#111827] border border-[#1F2937] rounded-xl hover:border-[#374151] transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#252B3B] flex items-center justify-center text-[#4B5563] group-hover:text-[#4F6EF7]">{i % 3 === 0 ? <Zap size={18} /> : i % 3 === 1 ? <ShieldCheck size={18} /> : <Cpu size={18} />}</div>
              <div className="flex-1"><div className="flex items-center gap-2 text-[13px] font-semibold text-white"><span>{item.from}</span><ChevronRight size={12} className="text-[#4B5563]" /><span>{item.to}</span></div><p className="text-[10px] text-[#4B5563] font-semibold uppercase mt-0.5">{item.action}</p></div>
              <p className="text-[10px] font-semibold text-[#4B5563] uppercase">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
