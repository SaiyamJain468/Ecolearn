import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Leaf, Droplets, Wind, Sun } from 'lucide-react';

export default function ImpactMapPage() {
  const regions = [
    { name: 'Bhopal Central', trees: 420, water: '12k L', co2: '450 Kg', color: '#10B981', status: 'Active' },
    { name: 'Indore North', trees: 310, water: '8.4k L', co2: '320 Kg', color: '#4F6EF7', status: 'Active' },
    { name: 'Sagar District', trees: 180, water: '5.1k L', co2: '180 Kg', color: '#22D3EE', status: 'Growing' },
    { name: 'Jabalpur East', trees: 95, water: '2.8k L', co2: '95 Kg', color: '#FBBF24', status: 'New' },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Impact Map</h1><p className="text-[13px] text-[#8B92A5] mt-1 flex items-center gap-2"><Globe size={14} /> Visual overview of environmental zones</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6"><h3 className="text-[15px] font-semibold text-white mb-1">Central India Coverage</h3><p className="text-[12px] text-[#4B5563]">Madhya Pradesh · 4 Active Regions</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                className="card p-6 group cursor-pointer hover:border-[#374151]">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${r.color}15` }}><MapPin size={20} style={{ color: r.color }} /></div>
                  <div><h4 className="text-[14px] font-semibold text-white group-hover:text-[#4F6EF7] transition-colors">{r.name}</h4><span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded mt-1 inline-block" style={{ backgroundColor: `${r.color}15`, color: r.color }}>{r.status}</span></div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#1F2937]">
                  <div><Leaf size={12} className="text-[#10B981] mb-1" /><p className="text-[13px] font-bold text-white">{r.trees}</p><p className="text-[9px] text-[#4B5563] font-bold uppercase">Trees</p></div>
                  <div><Droplets size={12} className="text-[#22D3EE] mb-1" /><p className="text-[13px] font-bold text-white">{r.water}</p><p className="text-[9px] text-[#4B5563] font-bold uppercase">Water</p></div>
                  <div><Wind size={12} className="text-[#FBBF24] mb-1" /><p className="text-[13px] font-bold text-white">{r.co2}</p><p className="text-[9px] text-[#4B5563] font-bold uppercase">CO2</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-[15px] font-semibold text-white mb-5">Impact Summary</h3>
          <div className="space-y-4">
            {[{ icon: Leaf, label: 'Total Trees', value: '1,005', color: '#10B981' }, { icon: Droplets, label: 'Water Saved', value: '28.3k L', color: '#22D3EE' }, { icon: Wind, label: 'CO2 Offset', value: '1,045 Kg', color: '#FBBF24' }, { icon: Sun, label: 'Energy Saved', value: '2.4 MWh', color: '#F97316' }].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#111827] border border-[#1F2937]">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}><s.icon size={18} style={{ color: s.color }} /></div>
                <div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">{s.label}</p><p className="text-lg font-bold text-white">{s.value}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
