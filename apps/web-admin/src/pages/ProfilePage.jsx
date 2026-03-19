import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, Zap, Globe, ChevronRight, Award } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function ProfilePage() {
  const u = MOCK_USER;
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={fadeUp}><h1 className="text-[22px] font-bold text-white tracking-tight">Profile</h1></motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <motion.div variants={fadeUp} className="surface p-7 flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 ring-4"
            style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 30px rgba(249,115,22,0.35)', ringColor: 'rgba(249,115,22,0.15)' }}
          >
            {u.first_name[0]}{u.last_name[0]}
          </motion.div>
          <h2 className="text-[18px] font-bold text-white mb-0.5">{u.first_name} {u.last_name}</h2>
          <p className="text-[11px] mb-1" style={{ color: '#475569' }}>{u.email}</p>
          <p className="text-[11px] mb-5 badge badge-accent">Eco Warrior</p>
          <div className="grid grid-cols-3 w-full gap-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {[{ k: 'Level', v: u.level, c: '#00F2FE' }, { k: 'Rank', v: `#${u.rank}`, c: '#F59E0B' }, { k: 'Badges', v: u.badges.length, c: '#10B981' }].map((s, i) => (
              <div key={i}><p className="text-[18px] font-bold" style={{ color: s.c }}>{s.v}</p><p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>{s.k}</p></div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-ghost w-full mt-4 text-[12px]">Edit Profile</motion.button>
        </motion.div>

        <div className="lg:col-span-2 space-y-4">
          {/* Impact */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-4">Eco Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ l: 'Trees', v: u.impact.trees, i: '🌳', c: '#10B981' }, { l: 'Water', v: `${u.impact.water}L`, i: '💧', c: '#06B6D4' }, { l: 'Waste', v: `${u.impact.waste}Kg`, i: '♻️', c: '#F59E0B' }, { l: 'CO₂', v: `${u.impact.co2}Kg`, i: '🌬️', c: '#F97316' }].map((s, j) => (
                <motion.div key={j} whileHover={{ scale: 1.04 }}
                  className="p-4 rounded-xl text-center cursor-pointer transition-all"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 4, delay: j * 0.7 }} className="text-2xl mb-2">{s.i}</motion.div>
                  <p className="text-[18px] font-bold text-white">{s.v}</p>
                  <p className="text-[8px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Badges Row */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-3">Earned Badges</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {['🌱', '💧', '♻️', '⚡', '👑'].map((emoji, i) => (
                <motion.div key={i} whileHover={{ scale: 1.15, y: -3 }} className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 cursor-pointer"
                  style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-4">Settings</h3>
            <div className="space-y-2">
              {[{ icon: Shield, l: 'Privacy & Security', d: 'Manage data settings' }, { icon: Globe, l: 'Language & Region', d: 'Preferred locale' }, { icon: Zap, l: 'Notifications', d: 'Alerts and reminders' }, { icon: Settings, l: 'Account', d: 'Email, password, more' }].map((s, i) => (
                <motion.div key={i} whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl cursor-pointer group transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}><s.icon size={16} /></div>
                  <div className="flex-1"><h4 className="text-[12px] font-semibold text-white">{s.l}</h4><p className="text-[9px]" style={{ color: '#475569' }}>{s.d}</p></div>
                  <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" style={{ color: '#334155' }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
