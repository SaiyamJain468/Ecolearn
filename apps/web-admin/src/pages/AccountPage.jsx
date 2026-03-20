import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Zap, Globe, ChevronRight, Award, User, Bell, Lock, Database, LogOut } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';
import { toast } from 'react-hot-toast';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp  = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AccountPage() {
  const u = MOCK_USER;
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    toast.success('Changes saved successfully!', { icon: '💾' });
  };

  const handleLogout = () => {
    toast('Logging out...', { icon: '👋' });
  };

  const TABS = [
    { id: 'profile',  label: 'Profile',    icon: User },
    { id: 'security', label: 'Security',   icon: Shield },
    { id: 'settings', label: 'Settings',   icon: Settings },
    { id: 'eco',      label: 'Eco-Sync',   icon: Zap }
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={fadeUp} className="flex justify-between items-center">
        <h1 className="text-[24px] font-black text-white tracking-tighter uppercase italic">Account <span className="text-eco-teal">Center</span></h1>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all">
          <LogOut size={14} /> TERMINATE SESSION
        </button>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <motion.div variants={fadeUp} className="lg:w-64 shrink-0 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all relative overflow-hidden group ${
                activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white/5 border border-white/10" style={{ borderRadius: 16 }} />
              )}
              <tab.icon size={18} className={`relative z-10 transition-colors ${activeTab === tab.id ? 'text-eco-teal' : ''}`} />
              <span className="relative z-10 font-bold text-[12px] uppercase tracking-wider">{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="tab-indicator" className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-eco-teal rounded-full" />}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <motion.div variants={fadeUp} className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="surface p-8 min-h-[500px]"
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-eco-green to-eco-teal p-1">
                      <div className="w-full h-full rounded-[28px] bg-[#0B0F19] flex items-center justify-center text-3xl font-black text-white">
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{u.first_name} {u.last_name}</h3>
                      <p className="text-sm text-white/40">{u.email}</p>
                      <span className="badge badge-accent mt-2">RANK #42 GLOBAL</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Display Name</label>
                      <input type="text" defaultValue={`${u.first_name} ${u.last_name}`} className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Terminal ID</label>
                      <input type="text" readOnly value="GAIA-77-ALPHA" className="w-full opacity-50 cursor-not-allowed" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Bio Transmission</label>
                      <textarea rows={3} className="w-full" defaultValue="Dedicated Eco-Warrior and data architect for the Bhopal Central monitoring zone." />
                    </div>
                  </div>
                  <button onClick={handleSave} className="btn-primary">SYNC PROFILE CHANGES</button>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-6">Encryption & Access</h3>
                  {[
                    { label: 'Two-Factor Bio-Auth', desc: 'Secure your uplink with biometric verification', enabled: true, icon: Database },
                    { label: 'Key Rotation', desc: 'Automatically rotate terminal access keys every 30 days', enabled: false, icon: Lock },
                    { label: 'Session Logging', desc: 'Maintain complete history of terminal interactions', enabled: true, icon: Bell }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-eco-teal transition-colors">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-white">{item.label}</p>
                          <p className="text-[11px] text-white/40">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => toast.success(`Toggled ${item.label}`)}
                        className={`w-12 h-6 rounded-full p-1 transition-all ${item.enabled ? 'bg-eco-green' : 'bg-white/10'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => toast.error('Security protocols require admin override')} className="text-[11px] font-bold text-eco-coral hover:underline">REVOKE ALL SESSIONS</button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                   <h3 className="text-lg font-bold text-white mb-6">Interface Preferences</h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[13px] font-bold text-white/80">HUD Particles</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-eco-teal" />
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[13px] font-bold text-white/80">Compact Telemetry View</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-eco-teal" />
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-[13px] font-bold text-white/80">Regional Uplink Sound</span>
                        <input type="checkbox" className="w-4 h-4 accent-eco-teal" />
                      </div>
                   </div>
                   <button onClick={handleSave} className="btn-primary w-full mt-4">APPLY INTERFACE THEME</button>
                </div>
              )}

              {activeTab === 'eco' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-eco-teal/5 border border-eco-teal/20 text-center">
                    <Zap size={32} className="mx-auto mb-4 text-eco-teal animate-pulse" />
                    <h3 className="text-lg font-bold text-white">Universal Eco-Sync</h3>
                    <p className="text-sm text-white/50 max-w-sm mx-auto mt-2">Directly connect your personal monitoring devices to the GAIA network for real-time XP accumulation.</p>
                  </div>
                  <div className="space-y-3">
                    {['Apple Health', 'Google Fit', 'Whoop Protocol', 'Garmin Connect'].map(device => (
                      <div key={device} className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                        <span className="text-[12px] font-bold text-white/70 group-hover:text-white transition-colors">{device}</span>
                        <button onClick={() => toast.promise(new Promise(r => setTimeout(r, 1500)), { loading: 'Initializing...', success: 'Linked!', error: 'Failed' })} className="text-[10px] font-black text-eco-teal uppercase tracking-widest">Connect</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
