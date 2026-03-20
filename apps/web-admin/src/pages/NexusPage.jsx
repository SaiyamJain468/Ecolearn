import React, { useState } from 'react';
import { MOCK_TRADES } from '../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Zap, ChevronRight, ArrowRightLeft, ShieldCheck, Cpu, Plus, TrendingUp, X, CheckCircle2, Camera, FileText, Star, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.25,0.46,0.45,0.94] } } };

const alliances = [
  {
    name: 'Green Guardians', rank: '#04', pts: '124k', mb: '4.2k', color: '#10B981', emoji: '🌿',
    bio: 'Focused on reforestation and biodiversity across central India.',
    joined: true,
    requirements: ['Minimum 500 XP earned', '5+ missions completed', 'Active for 30+ days'],
    terms: 'Members must complete at least 2 missions per month and participate in quarterly tree-planting drives. Inactive members (30+ days) are moved to reserve status.',
    focus: ['Reforestation', 'Biodiversity', 'Seed Bombing'],
    leader: 'Prof. Ananya Sharma',
  },
  {
    name: 'Water Warriors', rank: '#12', pts: '89k', mb: '2.8k', color: '#06B6D4', emoji: '💧',
    bio: 'Protecting freshwater sources through community-driven action.',
    joined: false,
    requirements: ['Minimum 300 XP earned', '3+ water missions completed', 'Photo proof: water conservation activity'],
    terms: 'Applicants must submit photo evidence of at least one water conservation project. Members commit to monthly water quality testing in their local area.',
    focus: ['Water Quality', 'Rainwater Harvesting', 'River Cleanup'],
    leader: 'Dr. Rajeev Patel',
  },
  {
    name: 'Solar Sentinels', rank: '#02', pts: '156k', mb: '5.2k', color: '#F59E0B', emoji: '⚡',
    bio: 'Deploying renewable energy solutions to rural schools.',
    joined: false,
    requirements: ['Minimum 1,000 XP earned', '10+ missions completed', 'Energy category specialization', 'Photo proof: energy audit or solar maintenance'],
    terms: 'This is an elite alliance. Members must demonstrate advanced knowledge of renewable energy. Monthly energy audits are mandatory. All members participate in the annual Solar Drive.',
    focus: ['Solar Panels', 'Energy Audits', 'Smart Grids'],
    leader: 'Eng. Vikram Desai',
  },
];

export default function NexusPage() {
  const [tab, setTab] = useState('alliances');
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [applyStep, setApplyStep] = useState(0); // 0: details, 1: terms, 2: apply
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [applicationNote, setApplicationNote] = useState('');
  const [submitted, setSubmitted] = useState([]);

  const handleApply = (allianceName) => {
    setSubmitted(prev => [...prev, allianceName]);
    toast.success(`Application sent to ${allianceName}! You'll hear back within 48 hours.`, { icon: '📨' });
    setSelectedAlliance(null);
    setApplyStep(0);
    setAgreedTerms(false);
    setApplicationNote('');
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      {/* Hero */}
      <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl p-7"
        style={{ background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(8, 145, 178, 0.06) 100%)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #00F2FE, transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1" style={{ color: '#22D3EE' }}>Global Network</p>
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">Collaboration Nexus</h1>
            <p className="text-[13px]" style={{ color: '#94A3B8' }}>Form alliances, trade eco-credits, and amplify your collective impact.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[{ k: 'Alliances', v: '12.4k', c: '#00F2FE' }, { k: 'Active Now', v: '3.2k', c: '#10B981' }, { k: 'Trades Today', v: '840', c: '#F59E0B' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-[20px] font-bold" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] font-medium uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {[['alliances', 'Alliances'], ['trades', 'Eco-Credit Exchange']].map(([val, label]) => (
          <motion.button key={val} onClick={() => setTab(val)} whileTap={{ scale: 0.96 }}
            className="px-4 py-[7px] rounded-lg text-[11px] font-semibold transition-all cursor-pointer relative"
            style={{ color: tab === val ? 'white' : '#64748B' }}>
            {tab === val && <motion.div layoutId="ntab" className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(90deg, #0891B2, #00F2FE)' }} />}
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {tab === 'alliances' ? (
          <motion.div key="alliances" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alliances.map((a, i) => {
              const isPending = submitted.includes(a.name);
              return (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: `0 24px 48px rgba(0,0,0,0.35), 0 0 60px ${a.color}15` }}
                  className="surface p-5 flex flex-col cursor-pointer relative overflow-hidden"
                  style={{ transition: 'all 0.3s ease' }}
                  onClick={() => { setSelectedAlliance(a); setApplyStep(0); }}
                >
                  <div className="relative flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl select-none"
                      style={{ background: `${a.color}12`, border: `1px solid ${a.color}25` }}>
                      {a.emoji}
                    </div>
                    <span className={`badge ${a.joined ? 'badge-success' : isPending ? 'badge-warning' : 'badge-accent'}`} style={{ fontSize: '9px', padding: '2px 10px' }}>
                      {a.joined ? '✓ Joined' : isPending ? '⏳ Pending' : 'Open'}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-white mb-0.5">{a.name}</h4>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: a.color }}>{a.rank} Global · Led by {a.leader}</p>
                  <p className="text-[11px] leading-relaxed mb-4" style={{ color: '#64748B' }}>{a.bio}</p>
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {a.focus.map((f, j) => (
                      <span key={j} className="text-[8px] font-semibold uppercase px-2 py-0.5 rounded-md"
                        style={{ background: `${a.color}10`, color: a.color, border: `1px solid ${a.color}20` }}>{f}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 mt-auto">
                    {[{ k: 'Eco Yield', v: a.pts }, { k: 'Members', v: a.mb }].map((s, j) => (
                      <div key={j} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-[15px] font-bold text-white">{s.v}</p>
                        <p className="text-[9px] font-medium uppercase tracking-wider mt-0.5" style={{ color: '#475569' }}>{s.k}</p>
                      </div>
                    ))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className={a.joined ? 'btn-ghost mt-4 w-full text-[12px]' : 'btn-primary mt-4 w-full text-[12px]'}
                    style={{ padding: '10px' }}>
                    {a.joined ? 'View Alliance' : isPending ? 'Application Pending' : 'View Details & Apply'}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="trades" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="surface p-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-[14px] font-semibold text-white mb-0.5">Eco-Credit Exchange</h3>
                <p className="text-[11px]" style={{ color: '#475569' }}>Inter-school Resource Transfers</p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                <ArrowRightLeft size={18} style={{ color: '#F59E0B' }} />
              </div>
            </div>
            <div className="space-y-2.5">
              {MOCK_TRADES.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  whileHover={{ x: 4 }}
                  onClick={() => toast.success(`Viewing details for trade: ${t.action}`)}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#22D3EE' }}>
                    {i % 3 === 0 ? <Zap size={14} /> : i % 3 === 1 ? <ShieldCheck size={14} /> : <Cpu size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-white truncate">
                      <span className="truncate">{t.from}</span>
                      <ChevronRight size={11} style={{ color: '#475569', flexShrink: 0 }} />
                      <span className="truncate">{t.to}</span>
                    </div>
                    <p className="text-[10px] mt-0.5 truncate" style={{ color: '#475569' }}>{t.action}</p>
                  </div>
                  <p className="text-[9px] font-semibold uppercase shrink-0" style={{ color: '#334155' }}>{t.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alliance Detail Modal */}
      <AnimatePresence>
        {selectedAlliance && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
            onClick={() => { setSelectedAlliance(null); setApplyStep(0); }}>
            <motion.div initial={{ scale: 0.88, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 40 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              className="glass-strong rounded-2xl max-w-lg w-full p-7 shadow-2xl overflow-hidden relative max-h-[85vh] overflow-y-auto"
              style={{ border: `1px solid ${selectedAlliance.color}30` }}
              onClick={e => e.stopPropagation()}>
              
              <AnimatePresence mode="wait">
                {applyStep === 0 && (
                  <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ background: `${selectedAlliance.color}12`, border: `1px solid ${selectedAlliance.color}30` }}>
                          {selectedAlliance.emoji}
                        </div>
                        <div>
                          <h2 className="text-[20px] font-bold text-white">{selectedAlliance.name}</h2>
                          <p className="text-[11px] font-semibold" style={{ color: selectedAlliance.color }}>{selectedAlliance.rank} Global · {selectedAlliance.mb} Members</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedAlliance(null)} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all" style={{ color: '#64748B' }}><X size={16} /></button>
                    </div>

                    <p className="text-[12px] leading-relaxed mb-5" style={{ color: '#94A3B8' }}>{selectedAlliance.bio}</p>

                    <div className="mb-5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#475569' }}>
                        <Shield size={12} /> Join Requirements
                      </h4>
                      <div className="space-y-2">
                        {selectedAlliance.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <CheckCircle2 size={13} style={{ color: selectedAlliance.color }} />
                            <span className="text-[11px] text-white/80">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: '#475569' }}>
                        <Star size={12} /> Focus Areas
                      </h4>
                      <div className="flex gap-2 flex-wrap">
                        {selectedAlliance.focus.map((f, i) => (
                          <span key={i} className="text-[10px] font-semibold px-3 py-1.5 rounded-lg"
                            style={{ background: `${selectedAlliance.color}10`, color: selectedAlliance.color, border: `1px solid ${selectedAlliance.color}20` }}>{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#475569' }}>Alliance Leader</p>
                      <p className="text-[13px] font-semibold text-white">{selectedAlliance.leader}</p>
                    </div>

                    {selectedAlliance.joined ? (
                      <button className="btn-ghost w-full" style={{ padding: '12px', fontSize: '13px' }}
                        onClick={() => { toast.success('Opening command center...'); setSelectedAlliance(null); }}>
                        Open Alliance Dashboard
                      </button>
                    ) : submitted.includes(selectedAlliance.name) ? (
                      <div className="w-full py-3 rounded-xl text-center text-[13px] font-semibold" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
                        ⏳ Application Pending Review
                      </div>
                    ) : (
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="btn-primary w-full" style={{ padding: '12px', fontSize: '13px' }}
                        onClick={() => setApplyStep(1)}>
                        Continue to Terms & Apply
                      </motion.button>
                    )}
                  </motion.div>
                )}

                {applyStep === 1 && (
                  <motion.div key="terms" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-[18px] font-bold text-white flex items-center gap-2"><FileText size={18} style={{ color: selectedAlliance.color }} /> Terms of Participation</h3>
                      <button onClick={() => setApplyStep(0)} className="text-[11px] font-bold text-white/40 hover:text-white transition-colors cursor-pointer">BACK</button>
                    </div>

                    <div className="p-5 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-[12px] leading-relaxed" style={{ color: '#94A3B8' }}>{selectedAlliance.terms}</p>
                    </div>

                    <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
                      <p className="text-[11px] font-bold mb-1" style={{ color: '#F59E0B' }}>⚠️ Important</p>
                      <p className="text-[10px]" style={{ color: '#94A3B8' }}>By applying, you agree to be reviewed by alliance mentors. Photo proof of environmental activity may be requested.</p>
                    </div>

                    <label className="flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-5 transition-all"
                      style={{ background: agreedTerms ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)', border: agreedTerms ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)' }}>
                      <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)} className="accent-green-500 w-4 h-4" />
                      <span className="text-[11px] font-medium" style={{ color: agreedTerms ? '#10B981' : '#94A3B8' }}>I have read and agree to the terms of participation</span>
                    </label>

                    <motion.button whileHover={agreedTerms ? { scale: 1.02 } : {}} whileTap={agreedTerms ? { scale: 0.97 } : {}}
                      disabled={!agreedTerms}
                      className={`w-full py-3 rounded-xl font-bold text-[13px] transition-all ${agreedTerms ? 'bg-eco-green text-white shadow-lg cursor-pointer' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                      onClick={() => setApplyStep(2)}>
                      Accept & Continue to Application
                    </motion.button>
                  </motion.div>
                )}

                {applyStep === 2 && (
                  <motion.div key="apply" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-[18px] font-bold text-white">Submit Application</h3>
                      <button onClick={() => setApplyStep(1)} className="text-[11px] font-bold text-white/40 hover:text-white transition-colors cursor-pointer">BACK</button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: '#475569' }}>Why do you want to join {selectedAlliance.name}?</label>
                        <textarea rows={3}
                          value={applicationNote}
                          onChange={e => setApplicationNote(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-eco-teal transition-all"
                          placeholder="I'm passionate about environmental sustainability and want to contribute..." />
                      </div>

                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 242, 254, 0.1)' }}>
                          <Camera size={18} style={{ color: '#22D3EE' }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-white">Photo proof (optional)</p>
                          <p className="text-[9px]" style={{ color: '#475569' }}>Upload evidence of your eco-activities to strengthen your application</p>
                        </div>
                        <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0, 242, 254, 0.1)', color: '#22D3EE', border: '1px solid rgba(0, 242, 254, 0.2)' }}
                          onClick={() => toast('File picker would open here', { icon: '📎' })}>
                          Attach
                        </button>
                      </div>

                      <div className="p-4 rounded-xl" style={{ background: `${selectedAlliance.color}08`, border: `1px solid ${selectedAlliance.color}15` }}>
                        <p className="text-[10px] font-bold mb-2" style={{ color: selectedAlliance.color }}>Application Summary</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div><span style={{ color: '#475569' }}>Alliance:</span> <span className="text-white font-semibold">{selectedAlliance.name}</span></div>
                          <div><span style={{ color: '#475569' }}>Rank:</span> <span className="text-white font-semibold">{selectedAlliance.rank}</span></div>
                          <div><span style={{ color: '#475569' }}>Your XP:</span> <span className="text-white font-semibold">1,000,000</span></div>
                          <div><span style={{ color: '#475569' }}>Status:</span> <span className="font-semibold" style={{ color: '#10B981' }}>Eligible</span></div>
                        </div>
                      </div>

                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="btn-primary w-full flex items-center justify-center gap-2" style={{ padding: '13px', fontSize: '13px' }}
                        onClick={() => handleApply(selectedAlliance.name)}>
                        <CheckCircle2 size={16} /> Submit Application
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
