import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const barData = [
  { month: 'Jul', prod: 3200, final: 2400 }, { month: 'Aug', prod: 4100, final: 3500 },
  { month: 'Sep', prod: 5800, final: 4200 }, { month: 'Oct', prod: 4600, final: 3800 },
  { month: 'Nov', prod: 5200, final: 4500 }, { month: 'Dec', prod: 6100, final: 5200 },
];
const lineData = [
  { month: 'Jan', plant: 2100, water: 1800, energy: 1200 },
  { month: 'Feb', plant: 2400, water: 2100, energy: 1300 },
  { month: 'Mar', plant: 3200, water: 2600, energy: 1500 },
  { month: 'Apr', plant: 3800, water: 2900, energy: 1400 },
  { month: 'May', plant: 4200, water: 3200, energy: 1600 },
  { month: 'Jun', plant: 6100, water: 4450, energy: 2480 },
  { month: 'Jul', plant: 5400, water: 3800, energy: 2100 },
  { month: 'Aug', plant: 5800, water: 4100, energy: 2300 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1A1F2E] border border-[#1F2937] rounded-xl p-3 shadow-2xl min-w-[140px]">
      <p className="text-[10px] text-[#4B5563] font-semibold mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 text-[12px] mb-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#8B92A5]">{p.name}</span>
          </div>
          <span className="font-bold text-white">${p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const leaders = [
    { name: 'Priya Mishra', role: 'Eco Research Lead', earnings: '$14,200', projects: '2.1k', rating: '5.0', progress: 88, accent: true },
    { name: 'Aryan Sharma', role: 'Environmental Analyst', earnings: '$11,700', projects: '1.4k', rating: '4.8', progress: 44, accent: false },
    { name: 'Zarah Khan', role: 'Sustainability Director', earnings: '$9,300', projects: '1.6k', rating: '4.6', progress: 76, accent: false },
  ];

  return (
    <div className="space-y-6">
      {/* ---- CREATIVE LEADERS ---- */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[15px] font-semibold text-white">Creative leaders</h3>
          <button className="text-[12px] text-[#8B92A5] hover:text-[#4F6EF7] flex items-center gap-1 transition-colors">View all <ArrowUpRight size={13} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaders.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative p-5 rounded-2xl border overflow-hidden ${
                l.accent
                  ? 'bg-gradient-to-br from-[#1E3A8A] to-[#3B5BDB] border-[#4F6EF7]/30 shadow-lg shadow-[#4F6EF7]/10'
                  : 'bg-[#1A1F2E] border-[#1F2937] hover:border-[#374151]'
              } transition-all`}>

              {/* Top: Avatar + Name + Progress */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${
                  l.accent ? 'bg-white/20 text-white' : 'bg-[#252B3B] text-[#8B92A5]'}`}>
                  {l.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-semibold text-white truncate">{l.name}</p>
                    <CheckCircle2 size={13} className="text-[#22D3EE] shrink-0" />
                  </div>
                  <p className={`text-[11px] truncate ${l.accent ? 'text-white/50' : 'text-[#4B5563]'}`}>{l.role}</p>
                </div>
                <span className={`text-[12px] font-bold shrink-0 ${l.accent ? 'text-white' : 'text-[#8B92A5]'}`}>{l.progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className={`h-1.5 rounded-full mb-5 ${l.accent ? 'bg-white/15' : 'bg-[#252B3B]'}`}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${l.progress}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                  className={`h-full rounded-full ${l.accent ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'bg-[#4F6EF7] shadow-[0_0_8px_rgba(79,110,247,0.3)]'}`} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[{ k: 'Earnings', v: l.earnings }, { k: 'Projects', v: l.projects }, { k: 'Rating', v: l.rating }].map((s, j) => (
                  <div key={j}>
                    <p className={`text-[9px] font-medium uppercase tracking-wider mb-0.5 ${l.accent ? 'text-white/40' : 'text-[#4B5563]'}`}>{s.k}</p>
                    <p className={`text-[16px] font-bold ${l.accent ? 'text-white' : 'text-white'}`}>{s.v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- TRENDING + PERFORMANCE ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Trending Skills */}
        <div className="lg:col-span-2 bg-[#1A1F2E] border border-[#1F2937] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-semibold text-white">Trending Skills ✨</h3>
            <ArrowUpRight size={15} className="text-[#4B5563] cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'Renewable Engineering', growth: '+12.4%', positive: true },
              { name: 'Carbon Auditing', growth: '+5.1%', positive: true },
              { name: 'Biodiversity Mapping', growth: '-2.3%', positive: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-[#111827] rounded-xl border border-[#1F2937] hover:border-[#374151] transition-colors cursor-pointer group">
                <span className="text-[13px] font-medium text-[#F1F5F9] group-hover:text-[#4F6EF7] transition-colors">{s.name}</span>
                <span className={`text-[11px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg ${
                  s.positive ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#EF4444] bg-[#EF4444]/10'
                }`}>
                  {s.positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {s.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Line Chart */}
        <div className="lg:col-span-3 bg-[#1A1F2E] border border-[#1F2937] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-semibold text-white">Performance</h3>
              <p className="text-[11px] text-[#4B5563]">Output value across eco sectors</p>
            </div>
            <div className="flex gap-1 bg-[#111827] rounded-lg p-1 border border-[#1F2937]">
              <button className="px-3 py-1.5 bg-[#4F6EF7] text-white text-[10px] font-semibold rounded-md">Overview</button>
              <button className="px-3 py-1.5 text-[#8B92A5] text-[10px] font-semibold hover:text-white rounded-md transition-colors">My region</button>
            </div>
          </div>
          <div className="h-[230px] mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4B5563' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4B5563' }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} width={35} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="plant" name="Planting" stroke="#4F6EF7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="water" name="Water" stroke="#22D3EE" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="energy" name="Energy" stroke="#FBBF24" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ---- TIME VS REVENUE BAR CHART ---- */}
      <div className="bg-[#1A1F2E] border border-[#1F2937] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-semibold text-white">Time vs Revenue</h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#4F6EF7]" /><span className="text-[10px] text-[#8B92A5]">Production time</span></div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#22D3EE]" /><span className="text-[10px] text-[#8B92A5]">Finalized assets</span></div>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#4B5563' }} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="prod" name="Production" fill="#4F6EF7" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="final" name="Finalized" fill="#22D3EE" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
