import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Target, Shield, AlertTriangle, Users, Settings, Filter, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ALERTS_DATA = [
  { id: 1, type: 'mission', title: 'Mission Approved: City Biodiversity', desc: 'Your photographic evidence was validated by the community. +500 XP rewarded.', time: '2 hours ago', icon: Target, color: '#10B981', read: false },
  { id: 2, type: 'social', title: 'Alliance Invitation', desc: 'Commander Rex invited you to join "Green Vanguard".', time: '5 hours ago', icon: Users, color: '#3B82F6', read: false },
  { id: 3, type: 'system', title: 'Terminal Latency Spike', desc: 'We detected a 400ms delay in your last telemetry sync. Re-establishing connection...', time: '1 day ago', icon: AlertTriangle, color: '#F59E0B', read: true },
  { id: 4, type: 'security', title: 'New Device Link', desc: 'Oura Ring Gen 3 was successfully authenticated to your profile.', time: '2 days ago', icon: Shield, color: '#A855F7', read: true },
  { id: 5, type: 'mission', title: 'Daily Challenge Unlocked', desc: 'Log 5km of zero-emission transit to earn the "Velocity" badge.', time: '3 days ago', icon: Target, color: '#10B981', read: true },
  { id: 6, type: 'system', title: 'EcoLearn Prime Update v2.4', desc: 'New AI predictive models are now live in the Prime Terminal.', time: '1 week ago', icon: Settings, color: '#00F2FE', read: true },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

export default function AlertsPage() {
  const [filter, setFilter] = useState('all');
  const [alerts, setAlerts] = useState(ALERTS_DATA);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);
  const unreadCount = alerts.filter(a => !a.read).length;

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
    toast.success('All alerts marked as read', { icon: '✅' });
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast('Alert removed from archive', { icon: '🗑️', style: { background: '#080B14', color: '#64748B' } });
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* ── HEADER ── */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Bell className="text-[#EF4444]" size={32} /> System Alerts 
            {unreadCount > 0 && <span className="bg-[#EF4444] text-white text-[11px] px-3 py-1 rounded-full">{unreadCount} UNREAD</span>}
          </h1>
          <p className="text-[#94A3B8] text-sm mt-2">Comprehensive archive of all network notifications and system events.</p>
        </div>
        <button onClick={markAllRead} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
          <CheckCircle2 size={16} /> Mark All Read
        </button>
      </motion.div>

      {/* ── FILTERS ── */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
        <Filter size={16} className="text-[#64748B] mr-2" />
        {['all', 'mission', 'social', 'system', 'security'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider border ${
              filter === f 
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                : 'bg-white/5 text-[#94A3B8] border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* ── ALERTS LIST ── */}
      <motion.div variants={fadeUp} className="space-y-3">
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 border border-white/5 border-dashed rounded-3xl bg-white/[0.02]">
              <Bell size={48} className="mx-auto text-[#334155] mb-4" />
              <h3 className="text-white font-bold mb-1">No Alerts Found</h3>
              <p className="text-sm text-[#64748B]">Your terminal is completely caught up.</p>
            </motion.div>
          ) : (
            filteredAlerts.map(alert => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={alert.id}
                className={`relative flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border transition-all group overflow-hidden ${
                  alert.read ? 'bg-[#0B101D] border-white/5' : 'bg-[#111827] border-white/10 shadow-lg'
                }`}
              >
                {/* Unread indicator line */}
                {!alert.read && <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: alert.color }} />}
                
                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center opacity-80" style={{ background: `${alert.color}15`, color: alert.color }}>
                  <alert.icon size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className={`text-[15px] font-bold truncate ${alert.read ? 'text-white/80' : 'text-white'}`}>{alert.title}</h3>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{alert.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#94A3B8] max-w-2xl">{alert.desc}</p>
                </div>

                <div className="shrink-0 flex items-center justify-end sm:flex-col sm:justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => {
                    setAlerts(alerts.map(a => a.id === alert.id ? { ...a, read: true } : a));
                    toast.success('Action deployed.', { id: 'deploy' });
                  }} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors" title="Review Context">
                    <ChevronRight size={16} />
                  </button>
                  <button onClick={() => deleteAlert(alert.id)} className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-500 transition-colors" title="Delete Archive">
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
