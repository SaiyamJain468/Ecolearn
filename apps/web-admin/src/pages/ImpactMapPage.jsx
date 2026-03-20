import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Leaf, Droplets, Wind, Sun, TrendingUp, Zap } from 'lucide-react';
import { MOCK_MAP_NODES } from '../lib/mockData';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25,0.46,0.45,0.94] } } };

const typeConfig = {
  BIO_HUB:      { color: '#10B981', icon: Leaf,     label: 'Bio Hub'    },
  ENERGY_GRID:  { color: '#F59E0B', icon: Zap,      label: 'Energy Grid'},
  WATER_SYNC:   { color: '#06B6D4', icon: Droplets,  label: 'Water Sync' },
  RECYCLE_POINT:{ color: '#F97316', icon: Wind,      label: 'Recycle'    },
  NODE_MASTER:  { color: '#00F2FE', icon: Globe,     label: 'Master Node'},
};

const radarData = [
  { area: 'Planting', A: 82 }, { area: 'Water', A: 74 },
  { area: 'Energy',  A: 68 }, { area: 'Waste', A: 91 }, { area: 'Alliance', A: 55 },
];

const RadarTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl p-3 text-[11px]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="text-white font-bold">{payload[0]?.payload?.area}</p>
      <p style={{ color: '#22D3EE' }}>{payload[0]?.value}% impact</p>
    </div>
  );
};

const regions = [
  { name: 'Bhopal Central', trees: 420, water: '12k L', co2: '450 Kg', color: '#10B981', status: 'Active', trend: '+18%' },
  { name: 'Indore North',   trees: 310, water: '8.4k L', co2: '320 Kg', color: '#00F2FE', status: 'Active', trend: '+12%' },
  { name: 'Sagar District', trees: 180, water: '5.1k L', co2: '180 Kg', color: '#06B6D4', status: 'Growing',trend: '+9%'  },
  { name: 'Jabalpur East',  trees: 95,  water: '2.8k L', co2: '95 Kg',  color: '#F59E0B', status: 'New',    trend: '+4%'  },
];

export default function ImpactMapPage() {
  const [sel, setSel] = useState(null);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-7">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(0, 242, 254, 0.06) 100%)', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }} />
        <div className="relative flex flex-col xl:flex-row xl:items-center gap-8">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1.5" style={{ color: '#34D399' }}>Central India · 4 Active Zones</p>
            <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">Impact Map</h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#94A3B8' }}>Real-time environmental intelligence across monitored regions. Track progress, node density, and local biodiversity impact.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 shrink-0">
            {[{ k: 'Trees', v: '1,005', c: '#10B981', i: '🌳' }, { k: 'Water', v: '28.3k L', c: '#06B6D4', i: '💧' }, { k: 'CO₂', v: '1,045 Kg', c: '#FBBF24', i: '🌬️' }, { k: 'Energy', v: '2.4 MWh', c: '#F97316', i: '⚡' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 200 }}
                className="p-5 rounded-2xl text-center min-w-[100px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-2xl mb-2">{s.i}</div>
                <p className="text-[18px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider mt-1" style={{ color: '#475569' }}>{s.k}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Region Cards */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ alignContent: 'start' }}>
          {regions.map((r, i) => (
           <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -2, boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 40px ${r.color}08` }}
              onClick={() => setSel(sel?.name === r.name ? null : r)}
              className="surface cursor-pointer relative overflow-hidden"
              style={{ border: sel?.name === r.name ? `1px solid ${r.color}50` : undefined, transition: 'all 0.2s ease', padding: '12px 14px', height: 'fit-content' }}
            >
              <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ opacity: sel?.name === r.name ? 1 : 0 }}
                style={{ background: `${r.color}04` }} />
              <div className="relative flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${r.color}10`, border: `1px solid ${r.color}20` }}>
                    <MapPin size={11} style={{ color: r.color }} />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-white leading-tight">{r.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="badge" style={{ fontSize: '7px', padding: '0px 5px', height: '13px', background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}20` }}>{r.status}</span>
                      <span className="flex items-center gap-0.5 text-[8px] font-bold" style={{ color: '#10B981' }}><TrendingUp size={8} />{r.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative grid grid-cols-3 gap-1 pt-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Leaf size={9} style={{ color: '#10B981' }} />
                    <span className="text-[12px] font-bold text-white">{r.trees}</span>
                  </div>
                  <span className="text-[7px] uppercase font-bold tracking-tighter" style={{ color: '#475569' }}>Trees</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Droplets size={9} style={{ color: '#06B6D4' }} />
                    <span className="text-[12px] font-bold text-white">{r.water}</span>
                  </div>
                  <span className="text-[7px] uppercase font-bold tracking-tighter" style={{ color: '#475569' }}>Water</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Wind size={9} style={{ color: '#F59E0B' }} />
                    <span className="text-[12px] font-bold text-white">{r.co2}</span>
                  </div>
                  <span className="text-[7px] uppercase font-bold tracking-tighter" style={{ color: '#475569' }}>CO₂</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radar + Active Nodes */}
        <div className="space-y-6">
          <motion.div variants={fadeUp} className="surface p-6">
            <h3 className="text-[15px] font-semibold text-white mb-1">Sector Breakdown</h3>
            <p className="text-[12px] mb-6" style={{ color: '#475569' }}>Monthly Performance</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="area" tick={{ fontSize: 11, fill: '#475569' }} />
                  <Radar name="Impact" dataKey="A" stroke="#00F2FE" fill="#00F2FE" fillOpacity={0.15} strokeWidth={2.5}
                    dot={{ fill: '#00F2FE', r: 3.5, strokeWidth: 0 }} />
                  <Tooltip content={<RadarTip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="surface p-6">
            <h3 className="text-[15px] font-semibold text-white mb-5">Active Nodes</h3>
            <div className="space-y-3">
              {MOCK_MAP_NODES.slice(0, 5).map((node, i) => {
                const cfg = typeConfig[node.type] || { color: '#00F2FE', icon: Globe, label: node.type };
                const Icon = cfg.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                    whileHover={{ x: 4, background: 'rgba(255,255,255,0.04)' }}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/5"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cfg.color}12` }}>
                      <Icon size={14} style={{ color: cfg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-white truncate">{node.label.replace(/_/g, ' ')}</p>
                      <p className="text-[10px] font-medium" style={{ color: cfg.color }}>{cfg.label}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: node.status === 'active' ? '#10B981' : '#F59E0B', boxShadow: `0 0 8px ${node.status === 'active' ? '#10B981' : '#F59E0B'}` }} />
                      <span className="text-[14px] font-bold" style={{ color: '#94A3B8' }}>{Math.round(node.strength * 100)}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
