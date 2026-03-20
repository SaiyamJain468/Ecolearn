import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, AlertTriangle, Search, ChevronRight, Cpu, LifeBuoy, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

const DOCS = [
  { cat: 'Missions', title: 'How to calibrate your IoT sensor for air quality drops', views: '12k' },
  { cat: 'Hardware', title: 'Troubleshooting Garmin Connect sync latency', views: '8.4k' },
  { cat: 'Account',  title: 'Bio-Auth setup and recovery protocols', views: '15k' },
  { cat: 'Alliances',title: 'Trading credits with Level 3 Factions', views: '6.2k' },
];

export default function HelpDeskPage() {
  const [query, setQuery] = useState('');

  const submitTicket = (e) => {
    e.preventDefault();
    toast.success('Anomaly reported to EcoLearn Central. ID: #8892-ALPHA', { icon: '🐛' });
    e.target.reset();
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* ── HEADER & SEARCH ── */}
      <motion.div variants={fadeUp} className="text-center bg-[#0B101D] border border-white/10 rounded-3xl p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F2FE]/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00F2FE]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <LifeBuoy size={48} className="mx-auto text-[#00F2FE] mb-6 drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]" />
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">EcoLearn Support Channel</h1>
        <p className="text-[#94A3B8] text-base max-w-xl mx-auto mb-8">
          Search the mission protocols, initialize a live comm-link with AI support, or report system anomalies.
        </p>
        
        <div className="max-w-xl mx-auto relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#00F2FE] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search knowledge base (e.g., 'How to sync Oura Ring')" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#080B14] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-[#00F2FE] focus:shadow-[0_0_20px_rgba(0,242,254,0.15)] transition-all text-sm"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ── KNOWLEDGE BASE ── */}
        <motion.div variants={fadeUp} className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="text-[#10B981]" size={24} />
            <h2 className="text-xl font-bold text-white">Top Protocols</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOCS.map((doc, idx) => (
              <div key={idx} onClick={() => toast('Opening protocol data...')} className="bg-[#111827] border border-white/5 hover:border-white/20 p-5 rounded-2xl cursor-pointer group transition-all">
                <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest">{doc.cat}</span>
                <h3 className="text-[14px] font-bold text-white mt-2 mb-3 leading-snug group-hover:text-[#22D3EE] transition-colors">{doc.title}</h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-[#64748B] flex items-center gap-1"><FileText size={12}/> {doc.views} reads</span>
                  <ChevronRight size={14} className="text-[#334155] group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── ACTION CARDS ── */}
        <motion.div variants={fadeUp} className="space-y-4">
          
          {/* Live Chat */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0B101D] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform"><MessageSquare size={120} /></div>
            <div className="w-12 h-12 bg-[#3B82F6]/20 text-[#3B82F6] rounded-xl flex items-center justify-center mb-4 border border-[#3B82F6]/30">
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Comm-Link</h3>
            <p className="text-sm text-[#94A3B8] mb-6 relative z-10">Initialize a live session with our Neural Support Agent for instant answers.</p>
            <button onClick={() => toast.success('Establishing secure neural link...', { icon: '🤖' })} className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold rounded-xl transition-colors relative z-10">
              Initialize Chat
            </button>
          </div>

          {/* Bug Report */}
          <div className="bg-[#111827] border border-white/5 hover:border-[#EF4444]/20 p-6 rounded-3xl transition-all">
            <h3 className="text-md font-bold text-white flex items-center gap-2 mb-4"><AlertTriangle className="text-[#EF4444]" size={18} /> Report Anomaly</h3>
            <form onSubmit={submitTicket} className="space-y-3">
              <input required type="text" placeholder="Subject module..." className="w-full bg-[#080B14] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-[#EF4444] outline-none transition-colors" />
              <textarea required rows={3} placeholder="Describe the anomaly steps..." className="w-full bg-[#080B14] border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-[#EF4444] outline-none transition-colors resize-none" />
              <button type="submit" className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-[#EF4444] font-bold rounded-lg text-sm transition-colors border border-red-500/20">
                Submit Report
              </button>
            </form>
          </div>

        </motion.div>
      </div>

    </motion.div>
  );
}
