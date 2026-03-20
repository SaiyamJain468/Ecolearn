import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, CheckCircle2, Sparkles, Filter, Hexagon, Crown } from 'lucide-react';
import { MOCK_USER } from '../lib/mockData';
import { toast } from 'react-hot-toast';

const badges = [
  // Genesis Run
  { id: 'b1', name: 'First Steps', desc: 'Log your first eco-action', icon: '🌱', color: '#10B981', cat: 'Genesis Run' },
  { id: 'b2', name: 'Profile Secured', desc: 'Secure account with Bio-Auth', icon: '🛡️', color: '#3B82F6', cat: 'Genesis Run' },
  { id: 'b3', name: 'Network Tap', desc: 'Join your first Alliance', icon: '🤝', color: '#8B5CF6', cat: 'Genesis Run' },
  { id: 'b4', name: 'Comm-Link', desc: 'Send a message in the Nexus', icon: '💬', color: '#06B6D4', cat: 'Genesis Run' },
  { id: 'b5', name: 'Telemetry Active', desc: 'Sync a 3rd-party device', icon: '⌚', color: '#F59E0B', cat: 'Genesis Run' },
  { id: 'b6', name: 'Genesis Complete', desc: 'Complete onboarding sequence', icon: '✨', color: '#FBBF24', cat: 'Genesis Run' },

  // Eco-Warrior
  { id: 'green-thumb', name: 'Green Thumb', desc: 'Plant 10 trees in one mission', icon: '🌳', color: '#10B981', cat: 'Eco-Warrior' },
  { id: 'water-saver', name: 'Water Saver', desc: 'Save 500L of water', icon: '💧', color: '#06B6D4', cat: 'Eco-Warrior' },
  { id: 'waste-warrior', name: 'Waste Warrior', desc: 'Divert 50Kg from landfill', icon: '♻️', color: '#F59E0B', cat: 'Eco-Warrior' },
  { id: 'solar-pioneer', name: 'Solar Pioneer', desc: '5 energy audit missions', icon: '⚡', color: '#F97316', cat: 'Eco-Warrior' },
  { id: 'carbon-zero', name: 'Carbon Zero', desc: 'Net-zero for 7 consecutive days', icon: '🌍', color: '#14B8A6', cat: 'Eco-Warrior' },
  { id: 'ocean-guardian', name: 'Ocean Guardian', desc: 'Coastal cleanup participation', icon: '🌊', color: '#3B82F6', cat: 'Eco-Warrior' },

  // Data Broker
  { id: 'data-analyst', name: 'Data Analyst', desc: 'Log 100 data points', icon: '📊', color: '#A855F7', cat: 'Data Broker' },
  { id: 'sensor-deploy', name: 'Sensor Deploy', desc: 'Register 3 physical AQI sensors', icon: '📡', color: '#EF4444', cat: 'Data Broker' },
  { id: 'node-master', name: 'Node Master', desc: 'Maintain 99% sensor uptime', icon: '🔋', color: '#22C55E', cat: 'Data Broker' },
  { id: 'ai-trainer', name: 'AI Trainer', desc: 'Validate 50 image challenges', icon: '🧠', color: '#EC4899', cat: 'Data Broker' },
  { id: 'mapping-expert', name: 'Mapping Expert', desc: 'Map 25 unverified eco-zones', icon: '🗺️', color: '#F59E0B', cat: 'Data Broker' },
  { id: 'truth-seeker', name: 'Truth Seeker', desc: 'Report and verify 10 false claims', icon: '👁️', color: '#6366F1', cat: 'Data Broker' },

  // Hardware Sync
  { id: 'whoop-link', name: 'Whoop Link', desc: 'Connect Whoop biometric strap', icon: '💪', color: '#E11D48', cat: 'Hardware Sync' },
  { id: 'oura-ring', name: 'Oura Sync', desc: 'Sleep data synchronized', icon: '💤', color: '#1D4ED8', cat: 'Hardware Sync' },
  { id: 'apple-health', name: 'Apple Core', desc: 'Apple Health integration active', icon: '🍎', color: '#64748B', cat: 'Hardware Sync' },
  { id: 'garmin-trek', name: 'Garmin Trek', desc: 'Log 50km of Garmin hiking', icon: '⛰️', color: '#0EA5E9', cat: 'Hardware Sync' },
  { id: 'strava-king', name: 'Strava King', desc: 'Top 10% Strava cycling segment', icon: '🚴', color: '#F97316', cat: 'Hardware Sync' },
  { id: 'iot-architect', name: 'IoT Architect', desc: 'Sync 5 device protocols', icon: '🔌', color: '#8B5CF6', cat: 'Hardware Sync' },

  // Social Vanguard
  { id: 'influencer', name: 'Eco Influencer', desc: 'Get 100 likes on a Nexus post', icon: '🌟', color: '#F43F5E', cat: 'Social Vanguard' },
  { id: 'recruiter', name: 'Recruiter', desc: 'Invite 5 friends to EcoLearn', icon: '👥', color: '#10B981', cat: 'Social Vanguard' },
  { id: 'pact-maker', name: 'Pact Maker', desc: 'Sign 3 trade alliances', icon: '📜', color: '#D97706', cat: 'Social Vanguard' },
  { id: 'mentor', name: 'Mentor', desc: 'Help Lvl 1 user complete a mission', icon: '🎓', color: '#3B82F6', cat: 'Social Vanguard' },
  { id: 'rally-point', name: 'Rally Point', desc: 'Host physical eco-meetup event', icon: '⛺', color: '#A855F7', cat: 'Social Vanguard' },
  { id: 'voice-reason', name: 'Voice of Reason', desc: 'Resolve 10 dispute resolutions', icon: '⚖️', color: '#64748B', cat: 'Social Vanguard' },

  // Elite Operations
  { id: 'prime-member', name: 'EcoLearn Prime', desc: 'Upgrade to EcoLearn Prime Terminal', icon: '👑', color: '#FBBF24', cat: 'Elite Operations' },
  { id: 'eco-leader', name: 'Global Vanguard', desc: 'Reach Level 50 Override', icon: '🦅', color: '#00F2FE', cat: 'Elite Operations' },
  { id: 'zero-day', name: 'Zero Day', desc: 'Participate in Beta testing', icon: '🐛', color: '#EF4444', cat: 'Elite Operations' },
  { id: 'anomaly', name: 'The Anomaly', desc: 'Discover a hidden easter egg', icon: '👾', color: '#14B8A6', cat: 'Elite Operations' },
  { id: '100k-club', name: '100k XP Club', desc: 'Accumulate 100,000 Total XP', icon: '💎', color: '#6366F1', cat: 'Elite Operations' },
  { id: 'savior', name: 'Planet Savior', desc: '1 Year Streak Unbroken', icon: '🔥', color: '#F97316', cat: 'Elite Operations' },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } } };

export default function BadgesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extend mock user unlocked badges to look impressive
  const unlocked = [...MOCK_USER.badges, 'b1', 'b2', 'b4', 'b6', 'data-analyst', 'prime-member', 'zero-day', 'apple-health'];
  
  const categories = ['All', ...new Set(badges.map(b => b.cat))];
  const filteredBadges = activeFilter === 'All' ? badges : badges.filter(b => b.cat === activeFilter);
  const pct = Math.round((unlocked.length / badges.length) * 100);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8 pb-32">
      
      {/* ── MASSIVE HERO HEADER ── */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[32px] border border-[#00F2FE]/20 p-8 md:p-12 shadow-[0_0_50px_rgba(0,242,254,0.05)] bg-[#0B101D]">
        {/* Animated Background Orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00F2FE] opacity-[0.05] blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#A855F7] opacity-[0.05] blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 flex items-center justify-center md:justify-start gap-4">
              <Award className="text-[#FBBF24]" size={40} /> 
              Reward Vault
            </h1>
            <p className="text-[#94A3B8] text-sm md:text-base max-w-lg mb-6 leading-relaxed">
              Unlock prestigious commendations by completing missions, securing hardware uplinks, and dominating the eco-grid. Collect them all to achieve <strong className="text-white">Planet Savior</strong> status.
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <Filter size={16} className="text-[#64748B] mr-2" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    activeFilter === cat 
                      ? 'bg-[#00F2FE] text-[#080B14] border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.4)]' 
                      : 'bg-white/5 text-[#94A3B8] border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Epic Progress Radial */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }} 
            className="relative w-48 h-48 shrink-0 flex items-center justify-center rounded-full bg-[#080B14] border border-white/5 shadow-2xl"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <motion.circle cx="50" cy="50" r="44" fill="none" stroke="url(#gradient)" strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 44}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - pct / 100) }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.6))' }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F2FE" />
                  <stop offset="100%" stopColor="#4FACFE" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-[#94A3B8]">{pct}%</span>
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-1">Completion</p>
              <p className="text-[11px] font-bold text-[#00F2FE] mt-1">{unlocked.length} / {badges.length}</p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── MASSIVE CRAZY GRID ── */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <AnimatePresence>
          {filteredBadges.map((b) => {
            const isUnlocked = unlocked.includes(b.id);
            return (
              <motion.div
                layout
                key={b.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -5, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${b.color}40`, border: `1px solid ${b.color}` } : { scale: 1.02 }}
                onClick={() => {
                   if(isUnlocked) toast.success(`Badge details: ${b.name}`, { icon: b.icon, style: { border: `1px solid ${b.color}`, background: '#080B14', color: '#fff' }});
                   else toast.error(`Locked: ${b.desc}`, { style: { background: '#080B14', color: '#64748B' }});
                }}
                className={`flex flex-col items-center text-center p-5 rounded-3xl transition-all cursor-pointer relative overflow-hidden group h-full ${
                  isUnlocked 
                    ? 'bg-gradient-to-b from-[#131B2E] to-[#0B101D] border border-white/10' 
                    : 'bg-[#080B14] border border-white/5 opacity-60 grayscale-[50%]'
                }`}
              >
                {/* Glow Background for unlocked */}
                {isUnlocked && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" style={{ background: `radial-gradient(circle at center, ${b.color}, transparent 70%)` }} />
                )}

                {/* Badge Icon Hexagon Container */}
                <div className="relative mb-4 mt-2">
                  <motion.div
                    animate={isUnlocked ? { rotate: 360 } : {}}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 opacity-20"
                  >
                    <Hexagon size={64} className="text-white" fill={b.color} />
                  </motion.div>
                  <Hexagon size={64} style={{ color: isUnlocked ? b.color : '#334155' }} strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center text-3xl drop-shadow-md">
                    {isUnlocked ? b.icon : <Lock size={20} className="text-[#64748B]" />}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className={`text-[13px] font-black uppercase tracking-wider mb-2 ${isUnlocked ? 'text-white' : 'text-[#64748B]'}`}>
                  {b.name}
                </h3>
                <p className="text-[11px] leading-tight text-[#94A3B8] mb-4 flex-1">
                  {b.desc}
                </p>

                {/* Category Pill */}
                <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 bg-[#080B14] border border-white/10 rounded-full text-white/40">
                  {b.cat}
                </span>

                {isUnlocked && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="absolute top-3 right-3 w-5 h-5 bg-[#080B14] rounded-full flex items-center justify-center border border-white/20"
                    style={{ borderColor: b.color }}
                  >
                    <CheckCircle2 size={12} style={{ color: b.color }} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
