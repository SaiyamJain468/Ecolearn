import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, Zap, Globe, ChevronRight } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';

export default function ProfilePage() {
  const u = MOCK_USER;
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Profile</h1><p className="text-[13px] text-[#8B92A5] mt-1">Manage your GAIA account</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4F6EF7] to-[#22D3EE] text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-[#4F6EF7]/20 mb-5">{u.first_name[0]}{u.last_name[0]}</div>
          <h2 className="text-xl font-bold text-white mb-0.5">{u.first_name} {u.last_name}</h2>
          <p className="text-[11px] text-[#4B5563] mb-5">{u.email}</p>
          <div className="grid grid-cols-3 w-full gap-3 py-5 border-t border-b border-[#1F2937]">
            <div><p className="text-xl font-bold text-[#4F6EF7]">{u.level}</p><p className="text-[9px] font-bold text-[#4B5563] uppercase">Level</p></div>
            <div><p className="text-xl font-bold text-[#FBBF24]">#{u.rank}</p><p className="text-[9px] font-bold text-[#4B5563] uppercase">Rank</p></div>
            <div><p className="text-xl font-bold text-[#10B981]">{u.badges.length}</p><p className="text-[9px] font-bold text-[#4B5563] uppercase">Badges</p></div>
          </div>
          <button className="btn-outline w-full mt-5">Edit Profile</button>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6"><h3 className="text-[15px] font-semibold text-white mb-5">Impact Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ l: 'Trees', v: u.impact.trees, i: '🌳', c: '#10B981' }, { l: 'Water', v: `${u.impact.water}L`, i: '💧', c: '#22D3EE' }, { l: 'Waste', v: `${u.impact.waste}Kg`, i: '♻️', c: '#FBBF24' }, { l: 'CO2', v: `${u.impact.co2}Kg`, i: '🌬️', c: '#F97316' }].map((s, j) => (
                <motion.div key={j} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: j * 0.08 }}
                  className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] text-center hover:border-[#374151] transition-colors">
                  <div className="text-2xl mb-2">{s.i}</div>
                  <p className="text-xl font-bold text-white">{s.v}</p>
                  <p className="text-[9px] font-bold text-[#4B5563] uppercase mt-1">{s.l}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="card p-6"><h3 className="text-[15px] font-semibold text-white mb-5">Settings</h3>
            <div className="space-y-3">
              {[{ icon: Shield, l: 'Privacy & Security', d: 'Manage data settings' }, { icon: Globe, l: 'Language & Region', d: 'Preferred locale' }, { icon: Zap, l: 'Notifications', d: 'Alerts and reminders' }, { icon: Settings, l: 'Account', d: 'Email, password, more' }].map((s, i) => (
                <div key={i} className="flex items-center gap-5 p-4 bg-[#111827] border border-[#1F2937] rounded-xl hover:border-[#374151] transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-[#252B3B] flex items-center justify-center text-[#4B5563] group-hover:text-[#4F6EF7] transition-colors"><s.icon size={18} /></div>
                  <div className="flex-1"><h4 className="text-[13px] font-semibold text-white">{s.l}</h4><p className="text-[10px] text-[#4B5563]">{s.d}</p></div>
                  <ChevronRight size={16} className="text-[#4B5563] group-hover:text-[#4F6EF7] transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
