import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Sparkles, Binary, Cpu, Wifi, Shield, Zap, Activity } from 'lucide-react';
import { MOCK_ANALYTICS, MOCK_USER } from '../lib/mockData';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25,0.46,0.45,0.94] } } };

const AreaTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl p-3 text-[11px]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="font-semibold mb-1" style={{ color: '#475569' }}>{label}</p>
      <p className="font-bold text-white">{payload[0]?.value} KG CO₂</p>
    </div>
  );
};

const pieData = [
  { name: 'Plant',  value: 38, color: '#10B981' },
  { name: 'Water',  value: 28, color: '#06B6D4' },
  { name: 'Waste',  value: 22, color: '#F59E0B' },
  { name: 'Energy', value: 12, color: '#6366F1' },
];

const telemetry = [
  { icon: Cpu,      label: 'Neural  Res',  value: '4K',    status: 'Optimal', color: '#10B981' },
  { icon: Wifi,     label: 'Latency',      value: '1.2ms', status: 'Fast',    color: '#06B6D4' },
  { icon: Shield,   label: 'Uptime',       value: '99.9%', status: 'Stable',  color: '#6366F1' },
  { icon: Activity, label: 'Throughput',   value: '4.8 Gb', status: 'High',   color: '#F59E0B' },
];

const statCards = [
  { label: 'AI Confidence', value: '98.4%', icon: Binary,    color: '#6366F1', glow: 'rgba(99,102,241,0.25)',    bg: 'rgba(99,102,241,0.1)'   },
  { label: 'CO₂ Saved',     value: '1,045 Kg', icon: Zap,   color: '#10B981', glow: 'rgba(16,185,129,0.25)',    bg: 'rgba(16,185,129,0.1)'   },
  { label: 'Growth Rate',   value: '+24.8%', icon: TrendingUp, color: '#F59E0B', glow: 'rgba(245,158,11,0.25)',  bg: 'rgba(245,158,11,0.1)'   },
  { label: 'Live Nodes',    value: '12,400', icon: Activity, color: '#06B6D4', glow: 'rgba(6,182,212,0.25)',     bg: 'rgba(6,182,212,0.1)'    },
];

export default function AnalyticsPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-px h-full opacity-20" style={{ background: 'linear-gradient(180deg, transparent, #6366F1, transparent)' }} />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: '#A5B4FC' }}>Powered by GAIA Intelligence</p>
          <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">Eco Analytics</h1>
          <p className="text-[13px]" style={{ color: '#94A3B8' }}>AI-driven environmental intelligence · Updated every 60 seconds</p>
        </div>
      </motion.div>

      {/* Stat Cards Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5, boxShadow: `0 16px 40px rgba(0,0,0,0.3), 0 0 40px ${s.glow}` }}
            className="surface p-5 flex flex-col gap-3 cursor-pointer group" style={{ transition: 'all 0.3s ease' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: s.bg, boxShadow: `0 0 20px ${s.glow}` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[24px] font-bold text-white leading-none tracking-tight">{s.value}</p>
              <p className="text-[11px] font-medium mt-1" style={{ color: '#64748B' }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 surface p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-[14px] font-semibold text-white mb-0.5">CO₂ Offset Velocity</h3>
              <p className="text-[11px]" style={{ color: '#475569' }}>12-Month projection</p>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-bold" style={{ color: '#10B981' }}><TrendingUp size={13} /> +24.8%</span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS.monthly_offset}>
                <defs>
                  <linearGradient id="co2g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis hide />
                <Tooltip content={<AreaTip />} />
                <Area type="monotone" dataKey="offset" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#co2g)"
                  activeDot={{ r: 5, fill: '#6366F1', stroke: '#080B14', strokeWidth: 2.5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[{ k: 'Peak Month', v: 'MAR · 510 KG', c: 'white' }, { k: 'Average', v: '358 KG', c: '#94A3B8' }, { k: 'Delta', v: '+112.5%', c: '#10B981' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}>
                <p className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: '#475569' }}>{s.k}</p>
                <p className="text-[15px] font-bold" style={{ color: s.c }}>{s.v}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Pie Chart */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[14px] font-semibold text-white mb-4">XP by Category</h3>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: 'rgba(13,17,32,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                  <span className="text-[10px] font-medium" style={{ color: '#94A3B8' }}>{p.name}</span>
                  <span className="text-[10px] font-bold text-white ml-auto">{p.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Telemetry */}
          <motion.div variants={fadeUp} className="surface p-5">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider mb-4" style={{ color: '#475569' }}>System Telemetry</h3>
            <div className="space-y-3">
              {telemetry.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${t.color}12` }}>
                    <t.icon size={14} style={{ color: t.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-white">{t.label}</p>
                    <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div className="h-full rounded-full" style={{ background: t.color }}
                        initial={{ width: 0 }} animate={{ width: t.status === 'Optimal' || t.status === 'High' ? '90%' : t.status === 'Fast' || t.status === 'Stable' ? '75%' : '50%' }}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }} />
                    </div>
                  </div>
                  <span className="text-[12px] font-bold font-mono shrink-0" style={{ color: t.color }}>{t.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Insight Card */}
      <motion.div variants={fadeUp} whileHover={{ scale: 1.005 }} className="relative overflow-hidden rounded-2xl p-6 cursor-pointer"
        style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }} />
        <div className="relative flex items-start gap-5">
          <motion.div animate={{ rotate: [0,5,-5,0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
            🤖
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-accent" style={{ fontSize: '9px' }}>AI Insight</span>
              <span className="text-[9px] font-semibold uppercase" style={{ color: '#475569' }}>· Updated 2min ago</span>
            </div>
            <p className="text-[14px] font-bold text-white mb-1">Hydro-Retention Opportunity Detected</p>
            <p className="text-[12px]" style={{ color: '#94A3B8' }}>Activating water conservation protocols could increase your school's XP yield by <span className="font-bold" style={{ color: '#F59E0B' }}>2.4×</span> over the next 30 days.</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn-primary shrink-0" style={{ padding: '10px 20px', fontSize: '12px' }}>Execute</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
