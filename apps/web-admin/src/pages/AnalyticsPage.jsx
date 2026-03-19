import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Sparkles, Binary } from 'lucide-react';
import { MOCK_ANALYTICS } from '../lib/mockData';

export default function AnalyticsPage() {
  const chartData = MOCK_ANALYTICS.monthly_offset;
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div><h1 className="text-2xl font-bold text-white">Eco Analytics</h1><p className="text-[13px] text-[#8B92A5] mt-1">AI-driven environmental projections</p></div>
        <div className="card px-5 py-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#252B3B] text-[#4F6EF7] rounded-xl flex items-center justify-center"><Binary size={20} /></div>
          <div><p className="text-[10px] font-semibold text-[#4B5563] uppercase">AI Confidence</p><p className="text-xl font-bold text-white">98.4%</p></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-6">
          <div className="flex justify-between items-center mb-6">
            <div><h3 className="text-[15px] font-semibold text-white mb-1">Projected CO2 Offset</h3><p className="text-[12px] text-[#4B5563]">12-Month Impact Velocity</p></div>
            <div className="w-10 h-10 bg-[#10B981]/10 text-[#10B981] rounded-xl flex items-center justify-center"><TrendingUp size={20} /></div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="co2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F6EF7" stopOpacity={0.3}/><stop offset="95%" stopColor="#4F6EF7" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#4B5563'}} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#1A1F2E', border: '1px solid #1F2937', borderRadius: '12px', color: '#F1F5F9', fontSize: '12px' }} />
                <Area type="monotone" dataKey="offset" stroke="#4F6EF7" strokeWidth={3} fillOpacity={1} fill="url(#co2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1F2937]">
            <div><p className="text-[10px] font-semibold text-[#4B5563] uppercase mb-1">Peak</p><p className="text-xl font-bold text-white">6.4k KG</p></div>
            <div><p className="text-[10px] font-semibold text-[#4B5563] uppercase mb-1">Growth</p><p className="text-xl font-bold text-[#10B981]">+24.8%</p></div>
            <div><p className="text-[10px] font-semibold text-[#4B5563] uppercase mb-1">Status</p><p className="text-xl font-bold text-[#4F6EF7]">Optimal</p></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card p-6">
            <div className="w-10 h-10 bg-[#4F6EF7]/10 rounded-xl flex items-center justify-center mb-4"><Sparkles className="text-[#4F6EF7]" size={20} /></div>
            <h3 className="text-[15px] font-semibold text-white mb-2">AI Optimization</h3>
            <p className="text-[12px] text-[#8B92A5] leading-relaxed mb-5">Hydro-Retention protocols in Week 4 will increase XP yield by <span className="font-bold text-[#FBBF24]">2.4x</span>.</p>
            <button className="btn-accent w-full text-[13px]">Execute Path</button>
          </div>
          <div className="card p-6">
            <h3 className="text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-4">Telemetry</h3>
            <div className="space-y-4">
              {[{ l: 'Neural Res', v: '4K', s: 'Optimal' }, { l: 'Latency', v: '1.2ms', s: 'Fast' }, { l: 'Uptime', v: '99.9%', s: 'Stable' }].map((t, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div><p className="text-[13px] font-medium text-white">{t.l}</p><p className="text-[10px] font-bold text-[#10B981] uppercase">{t.s}</p></div>
                  <span className="text-[15px] font-bold text-[#8B92A5]">{t.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
