import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, X, Zap, Shield, Sparkles, Globe, Target, Cpu, Crown, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25 } }
};

const FEATURES = [
  { group: 'Core Tracking & Analytics' },
  { name: 'Basic Eco-Activity Logging', free: true, pro: true },
  { name: 'Standard XP Generation', free: true, pro: true },
  { name: '24-hour Activity History', free: true, pro: true },
  { name: 'Unlimited Historical Data', free: false, pro: true },
  { name: 'Real-time Telemetry Sync', free: false, pro: true },
  { name: 'Advanced Impact Analytics (AI)', free: false, pro: true },
  { name: 'Custom Data Export (CSV/PDF)', free: false, pro: true },
  { name: 'Predictive Eco-Modeling', free: false, pro: true },

  { group: 'Missions & Rewards' },
  { name: 'Access to Standard Missions', free: true, pro: true },
  { name: 'Daily Eco-Challenges', free: true, pro: true },
  { name: 'Basic Badges & Trophies', free: true, pro: true },
  { name: '2x XP Multiplier Events', free: false, pro: true },
  { name: 'Exclusive "Prime-Only" Missions', free: false, pro: true },
  { name: 'Hardware Reward Unlocks', free: false, pro: true },
  { name: 'Priority Mission Approval', free: false, pro: true },
  { name: 'Custom Avatar Holograms', free: false, pro: true },

  { group: 'Hardware & Integrations' },
  { name: 'Mobile App Sync', free: true, pro: true },
  { name: 'Apple Health / Google Fit', free: true, pro: true },
  { name: 'Garmin & Whoop Direct Uplink', free: false, pro: true },
  { name: 'Oura Ring Biometric Sync', free: false, pro: true },
  { name: 'Smart Home IoT Integration', free: false, pro: true },
  { name: 'Solar Inverter Syncing', free: false, pro: true },
  { name: 'EV Charging Telemetry', free: false, pro: true },
  { name: 'Zero-Latency Hardware Updates', free: false, pro: true },

  { group: 'Community & Collaboration' },
  { name: 'Global Leaderboard Access', free: true, pro: true },
  { name: 'Join Local Alliances', free: true, pro: true },
  { name: 'Basic Forum Access', free: true, pro: true },
  { name: 'Create Sub-Factions', free: false, pro: true },
  { name: 'VIP Priority Support Ticket', free: false, pro: true },
  { name: 'Direct Comms with Faction Leaders', free: false, pro: true },
  { name: '1-on-1 Eco-Consulting', free: false, pro: true },
  { name: 'Exclusive Discord/Slack Channel', free: false, pro: true },
];

export default function ProPage() {
  const [billing, setBilling] = useState('yearly');
  const { scrollYProgress } = useScroll();
  const scaleParams = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const navigate = useNavigate();

  const handleUpgrade = () => {
    toast.loading('Initializing Secure Payment Gateway...', {
      duration: 2000,
      style: { background: '#080B14', color: '#fff', border: '1px solid #00F2FE' }
    });
    setTimeout(() => {
      toast.success('Welcome to EcoLearn Prime. Your terminal has been upgraded.', { 
        icon: '👑', duration: 4000,
        style: { background: '#080B14', color: '#fff', border: '1px solid #FBBF24' }
      });
      // Trigger massive global XP event just for show!
      window.dispatchEvent(new CustomEvent('xp-earned', { detail: { amount: 50000 } }));
      
      // Navigate to Prime dashboard demo
      navigate('/prime');
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* ── HERO SECTION ── */}
      <div className="relative pt-12 pb-20 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F2FE] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-block mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10">
            <Crown size={14} className="text-[#FBBF24]" />
            <span className="text-[11px] font-bold text-[#FBBF24] tracking-[0.2em] uppercase">EcoLearn Protocol Prime</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
          Unleash <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F2FE] via-[#0891B2] to-[#10B981]">Limitless</span> Impact.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Upgrade your terminal to EcoLearn Prime. Get real-time predictive modeling, unlimited hardware integrations, VIP support, and massive XP multipliers. Save the planet, faster.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex justify-center items-center gap-4 mb-4">
          <span className={`text-sm font-bold transition-colors ${billing === 'monthly' ? 'text-white' : 'text-[#64748B]'}`}>Monthly</span>
          <button 
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 rounded-full bg-[#1E293B] border border-white/10 transition-colors"
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-[#00F2FE] shadow-[0_0_10px_#00F2FE] transition-all duration-300 ${billing === 'yearly' ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-bold flex items-center gap-2 transition-colors ${billing === 'yearly' ? 'text-white' : 'text-[#64748B]'}`}>
            Yearly <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded-md border border-[#10B981]/30">SAVE 20%</span>
          </span>
        </motion.div>
      </div>

      {/* ── PRICING CARDS ── */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32 px-4">
        
        {/* Basic Tier */}
        <motion.div variants={fadeUp} className="bg-[#0B101D] border border-white/10 rounded-[32px] p-8 flex flex-col hover:border-white/20 transition-colors shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">Standard Uplink</h3>
          <p className="text-sm text-[#64748B] mb-8">Essential tools for individual eco-warriors starting their journey.</p>
          <div className="mb-8">
            <span className="text-5xl font-black text-white">₹0</span>
            <span className="text-[#64748B] font-medium ml-2">/forever</span>
          </div>
          <ul className="space-y-4 mb-10 flex-1">
            {['Basic Activity Logging', 'Connect Apple Health / Fit', 'Standard Missions', 'Join Global Leaderboard'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#94A3B8] font-medium">
                <Check size={18} className="text-[#10B981]" /> {f}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 px-6 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-colors" disabled>
            Current Plan
          </button>
        </motion.div>

        {/* Pro Tier */}
        <motion.div variants={fadeUp} className="relative bg-gradient-to-b from-[#0F172A] to-[#0B101D] border border-[#00F2FE]/40 rounded-[32px] p-8 flex flex-col hover:border-[#00F2FE]/70 transition-all shadow-[0_0_50px_rgba(0,242,254,0.1)] transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#00F2FE] to-[#0891B2] text-[#080B14] text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,242,254,0.5)]">
            Recommended
          </div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay rounded-[32px]"></div>

          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 relative z-10"><Crown className="text-[#FBBF24]" /> EcoLearn Prime</h3>
          <p className="text-sm text-[#94A3B8] mb-8 relative z-10">Maximize your impact with unrestricted telemetry and hardware sync.</p>
          <div className="mb-8 relative z-10">
            <div className="flex items-end flex-wrap gap-2">
              <span className="text-5xl font-black text-white">₹{billing === 'yearly' ? '999' : '1,299'}</span>
              <span className="text-[#94A3B8] font-medium mb-1">/month</span>
            </div>
            {billing === 'yearly' && <p className="text-[12px] text-[#10B981] font-bold mt-2">Billed ₹11,988 annually</p>}
          </div>
          <ul className="space-y-4 mb-10 flex-1 relative z-10">
            {['Unlimited IoT Integrations', 'AI Predictive Modeling', '2x XP Multiplier Events', 'Priority Mission Approval', 'VIP 24/7 Support'].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-white font-medium">
                <Check size={18} className="text-[#00F2FE] drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]" /> {f}
              </li>
            ))}
          </ul>
          <button onClick={handleUpgrade} className="relative z-10 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0891B2] to-[#00F2FE] text-[#080B14] font-black border border-[#00F2FE] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:scale-[1.02] transition-all overflow-hidden group">
            <span className="relative z-10">UPGRADE TO PRIME</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>

      </motion.div>

      {/* ── MASSIVE FEATURE COMPARISON MATRIX ── */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-4">The Ultimate Architecture</h2>
          <p className="text-[#94A3B8]">Compare every feature parameter between standard uplink and Prime.</p>
        </div>

        <div className="bg-[#0B101D] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 bg-white/[0.02] sticky top-0 z-20 backdrop-blur-xl">
            <div className="col-span-6 font-bold text-white uppercase tracking-widest text-xs">System Feature</div>
            <div className="col-span-3 text-center font-bold text-white/50 uppercase tracking-widest text-xs">Standard</div>
            <div className="col-span-3 text-center font-black text-[#00F2FE] uppercase tracking-widest text-xs">Prime</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {FEATURES.map((feat, i) => {
              if (feat.group) {
                return (
                  <div key={i} className="grid grid-cols-1 gap-4 p-6 bg-white/[0.04]">
                    <div className="col-span-1 border-l-2 border-[#00F2FE] pl-3 font-bold text-white text-sm uppercase tracking-widest">{feat.group}</div>
                  </div>
                );
              }
              return (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 lg:p-6 hover:bg-white/[0.02] transition-colors items-center group">
                  <div className="col-span-6 font-medium text-white/80 text-[13px] md:text-sm group-hover:text-white transition-colors">
                    {feat.name}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    {feat.free ? <Check size={20} className="text-white/40" /> : <X size={20} className="text-red-500/30" />}
                  </div>
                  <div className="col-span-3 flex justify-center">
                    {feat.pro ? <Check size={20} className="text-[#00F2FE] drop-shadow-[0_0_5px_rgba(0,242,254,0.5)]" /> : <X size={20} className="text-red-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to maximize your impact velocity?</h2>
          <button onClick={handleUpgrade} className="py-4 px-10 rounded-full bg-gradient-to-r from-[#0891B2] to-[#00F2FE] text-[#080B14] font-black border border-[#00F2FE] hover:shadow-[0_0_40px_rgba(0,242,254,0.4)] hover:scale-105 transition-all text-lg">
            ACTIVATE EcoLearn PRIME NOW
          </button>
        </div>
      </div>
    </div>
  );
}
