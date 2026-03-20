import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Activity, Shield, Cpu, Globe2, ChevronRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function PrimeDashboardPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-20">
      {/* ── HEADER ── */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-[#1A1A2E] to-[#0B101D] border border-[#00F2FE]/30 shadow-[0_0_50px_rgba(0,242,254,0.1)]">
        {/* Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F2FE]/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FBBF24]/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown size={28} className="text-[#FBBF24]" />
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F2FE]">
                EcoLearn Prime Terminal
              </h1>
            </div>
            <p className="text-[#94A3B8] text-sm">Welcome to Elite Operations. All telemetry systems active.</p>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#00F2FE] tracking-widest uppercase mb-1">Network Status</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FE] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F2FE]"></span>
              </span>
              <span className="text-[11px] font-bold text-[#22D3EE]">SYNCHRONIZED (0ms Ping)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── PREMIUM FEATURES DEMO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Predictive AI Modeling */}
        <motion.div variants={fadeUp} className="rounded-3xl p-6 bg-[#0B101D] border border-white/5 hover:border-[#A855F7]/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-[50px] group-hover:bg-[#A855F7]/20 transition-all pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] mb-4 border border-[#A855F7]/20">
            <Cpu size={24} />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">AI Predictive Modeling</h2>
          <p className="text-sm text-[#64748B] mb-6">Your Prime access unlocks direct neural link to EcoLearn's forecasting engine. Predict environmental shifts in your sector with 99.8% precision.</p>
          
          <div className="h-40 rounded-xl border border-white/5 bg-[#080B14] p-4 flex flex-col justify-end relative overflow-hidden">
            {/* Fake Chart Lines */}
            <div className="absolute inset-0 flex items-end gap-1 p-4 opacity-50">
              {[40, 70, 30, 80, 50, 90, 60, 100].map((h, i) => (
                <motion.div key={i} className="flex-1 bg-gradient-to-t from-[#A855F7] to-[#00F2FE] rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="relative z-10 flex justify-between items-center w-full">
              <span className="text-[10px] text-[#A855F7] font-bold">FORECAST LIVE</span>
              <span className="text-[10px] text-white">ETA: 4 Hours</span>
            </div>
          </div>
        </motion.div>

        {/* Global Satellite Override */}
        <motion.div variants={fadeUp} className="rounded-3xl p-6 bg-[#0B101D] border border-white/5 hover:border-[#10B981]/30 transition-colors group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#10B981]/10 blur-[50px] group-hover:bg-[#10B981]/20 transition-all pointer-events-none" />
          <div className="w-12 h-12 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] mb-4 border border-[#10B981]/20">
            <Globe2 size={24} />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Satellite Telemetry</h2>
          <p className="text-sm text-[#64748B] mb-6">Real-time thermal and CO2 imaging from low earth orbit. Prime members receive zero-latency direct feeds from our orbital network.</p>
          
          <div className="h-40 rounded-xl border border-white/5 bg-[#080B14] relative overflow-hidden flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-64 h-64 border border-[#10B981]/20 rounded-full absolute opacity-30 border-dashed" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="w-48 h-48 border border-[#00F2FE]/20 rounded-full absolute opacity-20" />
            
            <div className="w-20 h-20 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center backdrop-blur-md relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Activity size={32} className="text-[#10B981]" />
            </div>
          </div>
        </motion.div>
        
        {/* Instant Approval Priority */}
        <motion.div variants={fadeUp} className="md:col-span-2 rounded-3xl p-6 bg-[#0B101D] border border-white/5 hover:border-[#F59E0B]/30 transition-colors group relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#F59E0B]/5 to-transparent pointer-events-none" />
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center text-[#FBBF24] border border-[#F59E0B]/20">
            <Shield size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              Priority Mission Processing
              <span className="px-2 py-0.5 rounded ml-2 text-[9px] font-bold bg-[#F59E0B] text-black">ACTIVE</span>
            </h2>
            <p className="text-sm text-[#64748B]">All your mission submissions bypass the standard community validation queue. As a verified Prime agent, your actions are trusted and XP is awarded instantaneously upon submission.</p>
          </div>
          <div className="shrink-0">
            <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
              Submit Priority Run <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
