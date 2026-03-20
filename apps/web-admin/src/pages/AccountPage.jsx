import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Settings, Zap, Globe, Award, User, Bell, Lock, Database, LogOut, 
  Activity, CheckCircle2, AlertTriangle, MonitorSmartphone, Key, Terminal
} from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp  = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

export default function AccountPage() {
  const u = MOCK_USER;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [linkedDevices, setLinkedDevices] = useState(['Apple Health']);

  const handleSave = () => {
    toast.success('Configuration synced successfully!', { icon: '💾', style: { background: '#080B14', color: '#fff', border: '1px solid #10B981' } });
  };

  const handleLogout = () => {
    toast('Terminating session...', { icon: '👋', duration: 1500 });
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 1500);
  };

  const handleConnectDevice = (device) => {
    toast.promise(new Promise(r => setTimeout(r, 1500)), { 
      loading: 'Establishing secure link...', 
      success: () => {
        setLinkedDevices([...linkedDevices, device]);
        // Trigger the global XP animation
        window.dispatchEvent(new CustomEvent('xp-earned', { detail: { amount: 250 } }));
        return `Linked to ${device}! +250 XP Bonus`;
      },
      error: 'Uplink Failed' 
    }, { style: { background: '#080B14', color: '#fff', border: '1px solid #00F2FE' } });
  };

  const TABS = [
    { id: 'profile',  label: 'Identity & Access',  icon: User },
    { id: 'security', label: 'Security Protocols', icon: Shield },
    { id: 'eco',      label: 'Eco-Sync Devices',   icon: Zap },
    { id: 'settings', label: 'System Config',      icon: Settings },
  ];

  const statCards = [
    { label: 'Security Clearance', value: 'Level 14', color: '#10B981' },
    { label: 'Active Devices', value: linkedDevices.length, color: '#00F2FE' },
    { label: 'System Uptime', value: '99.9%', color: '#FBBF24' },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-20">
      
      {/* ── HEADER BANNERS ── */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.15), rgba(0, 242, 254, 0.05))',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          boxShadow: 'inset 0 0 40px rgba(0, 242, 254, 0.05)'
        }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
             style={{ background: 'radial-gradient(circle, #00F2FE 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
             
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl p-[2px]" style={{ background: 'linear-gradient(135deg, #00F2FE, #0891B2)' }}>
                <div className="w-full h-full bg-[#080B14] rounded-xl flex items-center justify-center text-3xl font-black text-white">
                  {u.first_name[0]}{u.last_name[0]}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#10B981] w-6 h-6 rounded-lg border-2 border-[#080B14] flex items-center justify-center">
                <CheckCircle2 size={12} className="text-[#080B14]" />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#00F2FE] tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
                <MonitorSmartphone size={12} /> Terminal Active
              </p>
              <h1 className="text-3xl font-black text-white tracking-tight">{u.first_name} {u.last_name}</h1>
              <p className="text-[#94A3B8] text-sm mt-1">{u.email} • ID: EcoLearn-77-ALPHA</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
              <LogOut size={16} /> TERMINATE
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── QUICK STATS ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.07] transition-all">
            <div>
              <p className="text-[12px] font-medium text-[#94A3B8] mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform" style={{ background: `${s.color}20`, color: s.color }}>
              <Activity size={24} />
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── MAIN CONTENT CONFIGURATION ── */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <motion.div variants={fadeUp} className="lg:w-72 shrink-0 space-y-1.5">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                activeTab === tab.id ? 'text-white bg-white/5 border border-white/10 shadow-lg' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <tab.icon size={18} className={`relative z-10 transition-colors ${activeTab === tab.id ? 'text-[#00F2FE]' : ''}`} />
              <div className="relative z-10 flex flex-col items-start gap-0.5">
                <span className="font-bold text-[13px] tracking-wide">{tab.label}</span>
                {activeTab === tab.id && <span className="text-[9px] text-[#00F2FE] uppercase tracking-widest">Selected Panel</span>}
              </div>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-indicator" className="absolute right-0 top-0 bottom-0 w-1 bg-[#00F2FE]" style={{ boxShadow: '0 0 10px #00F2FE' }} />
              )}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Content Area */}
        <motion.div variants={fadeUp} className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.2 }}
              className="bg-[#0B101D] border border-white/10 rounded-3xl p-8 lg:p-10 min-h-[500px]"
              style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.01)' }}
            >
              
              {/* === PROFILE TAB === */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><User className="text-[#00F2FE]"/> Identity Configuration</h3>
                    <p className="text-sm text-[#64748B] mt-1">Manage your public persona and system identification metrics.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">First Name</label>
                      <input type="text" defaultValue={u.first_name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F2FE] outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Last Name</label>
                      <input type="text" defaultValue={u.last_name} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F2FE] outline-none transition-colors" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Comm-Link Address</label>
                      <input type="email" defaultValue={u.email} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F2FE] outline-none transition-colors opacity-70" disabled />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] ml-1">Bio Transmission</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00F2FE] outline-none transition-colors resize-none" defaultValue="Dedicated Eco-Warrior and data architect for the Bhopal Central monitoring zone. Specializing in sustainable network integrations." />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button onClick={handleSave} className="px-6 py-3 bg-[#00F2FE] text-[#080B14] font-bold rounded-xl hover:bg-[#22D3EE] transition-all flex items-center gap-2">
                      <Database size={18} /> Sync Identity Changes
                    </button>
                  </div>
                </div>
              )}

              {/* === SECURITY TAB === */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><Shield className="text-[#10B981]"/> Security Protocols</h3>
                    <p className="text-sm text-[#64748B] mt-1">Configure your terminal's defensive measures and access logging.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Two-Factor Bio-Auth', desc: 'Secure your uplink with biometric verification. Highly recommended.', enabled: true, icon: Key, color: '#10B981' },
                      { label: 'Key Rotation', desc: 'Automatically rotate terminal access keys every 30 days to prevent intrusion.', enabled: false, icon: Lock, color: '#FBBF24' },
                      { label: 'Session Logging', desc: 'Maintain complete history of terminal interactions and geo-locations.', enabled: true, icon: Terminal, color: '#00F2FE' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#111827] border border-white/5 hover:border-white/10 transition-all gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mt-1" style={{ background: `${item.color}15`, color: item.color }}>
                            <item.icon size={24} />
                          </div>
                          <div>
                            <p className="text-[15px] font-bold text-white mb-1">{item.label}</p>
                            <p className="text-[13px] text-[#64748B] leading-relaxed max-w-md">{item.desc}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => toast.success(`Security protocol updated.`)}
                          className={`w-14 h-7 shrink-0 rounded-full p-1 transition-all flex items-center relative ${item.enabled ? 'bg-[#10B981]' : 'bg-[#334155]'}`}>
                          <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-md absolute ${item.enabled ? 'left-8' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
                    <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Danger Zone</h4>
                      <p className="text-xs text-[#94A3B8] mb-3">Irreversible actions that affect your EcoLearn account synchronization.</p>
                      <button onClick={() => toast.error('Security protocols require admin override')} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">
                        Purge All Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* === ECO-SYNC TAB === */}
              {activeTab === 'eco' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><Zap className="text-[#FBBF24]"/> Eco-Sync Devices</h3>
                    <p className="text-sm text-[#64748B] mt-1">Connect third-party health and activity trackers to automate XP generation.</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B101D] to-[#111827] border border-[#00F2FE]/20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
                    <Zap size={40} className="mx-auto mb-4 text-[#FBBF24] animate-pulse drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                    <h3 className="text-lg font-bold text-white">Universal Tracking Architecture</h3>
                    <p className="text-sm text-[#94A3B8] max-w-md mx-auto mt-2 leading-relaxed">
                      Every physical step, bike ride, or eco-action tracked on your connected devices translates directly to EcoLearn Protocol XP.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Apple Health', 'Google Fit', 'Whoop Protocol', 'Garmin Connect', 'Strava Ultra', 'Oura Ring'].map(device => {
                      const isLinked = linkedDevices.includes(device);
                      return (
                        <div key={device} className={`flex flex-col p-5 rounded-2xl border transition-all ${isLinked ? 'bg-[#00F2FE]/5 border-[#00F2FE]/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                          <div className="flex justify-between items-center mb-4">
                            <span className={`text-[15px] font-bold ${isLinked ? 'text-white' : 'text-white/70'}`}>{device}</span>
                            {isLinked && <CheckCircle2 size={18} className="text-[#00F2FE]" />}
                          </div>
                          {isLinked ? (
                            <button className="mt-auto py-2 px-4 rounded-xl text-[11px] font-bold text-white bg-white/10 cursor-not-allowed text-center">
                              SYNC ACTIVE
                            </button>
                          ) : (
                            <button onClick={() => handleConnectDevice(device)} className="mt-auto py-2 px-4 rounded-xl text-[11px] font-bold text-[#080B14] bg-white hover:bg-[#00F2FE] transition-colors text-center">
                              ESTABLISH LINK
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* === SETTINGS TAB === */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><Settings className="text-[#94A3B8]"/> System Config</h3>
                    <p className="text-sm text-[#64748B] mt-1">Tweak visual and audio parameters of the EcoLearn administrative UI.</p>
                  </div>

                  <div className="bg-[#111827] border border-white/5 rounded-2xl p-2">
                     {[
                       {name: 'Ambient HUD Particles', on: true},
                       {name: 'Compact Telemetry Layout', on: false},
                       {name: 'Regional Uplink Sound FX', on: true},
                       {name: 'Auto-refresh Dashboard', on: true},
                     ].map((cfg, i) => (
                        <div key={i} className={`flex justify-between items-center p-4 px-6 ${i !== 3 ? 'border-b border-white/5' : ''}`}>
                          <span className="text-[14px] font-bold text-white/80">{cfg.name}</span>
                          <input type="checkbox" defaultChecked={cfg.on} className="w-5 h-5 accent-[#00F2FE] bg-[#0B101D] border-white/20 rounded cursor-pointer" />
                        </div>
                     ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button onClick={handleSave} className="px-6 py-3 bg-[#334155] text-white font-bold rounded-xl hover:bg-[#475569] transition-all">
                      Apply Parameters
                    </button>
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
