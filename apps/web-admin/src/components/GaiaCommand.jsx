import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Leaf, Zap, Cpu, Sparkles } from 'lucide-react';

const EcoLearn_RESPONSES = [
  { q: 'missions',  a: 'You have 9 active missions. Your highest-XP opportunity is **Solar Pulse Sync** (+2,000 XP). Start it before 2PM for max sun exposure data.' },
  { q: 'rank',      a: 'DPS Bhopal is **#2** globally. You need 2,790 more XP to overtake Kendriya Vidyalaya. Focus on energy missions this week.' },
  { q: 'streak',    a: "You're on a **6-day streak**! Complete any mission today to hit 7 days and unlock the 50 XP bonus." },
  { q: 'badges',    a: 'You have 5 of 6 badges. **Data Analyst** is the only one remaining — log 100 environmental data points to unlock it.' },
  { q: 'analytics', a: 'Your CO₂ offset grew by **24.8%** this month. Hydro-Retention protocols could boost your yield by 2.4× next cycle.' },
  { q: 'default',   a: "I'm EcoLearn Intelligence. Ask me about your missions, rank, streak, badges, or analytics." },
];

const SUGGESTIONS = ['Check my rank', 'Active missions', 'My badges', 'Streak status'];

function getResponse(text) {
  const t = text.toLowerCase();
  if (t.includes('mission')) return EcoLearn_RESPONSES[0];
  if (t.includes('rank') || t.includes('leader')) return EcoLearn_RESPONSES[1];
  if (t.includes('streak')) return EcoLearn_RESPONSES[2];
  if (t.includes('badge')) return EcoLearn_RESPONSES[3];
  if (t.includes('analytic') || t.includes('co2') || t.includes('carbon')) return EcoLearn_RESPONSES[4];
  return EcoLearn_RESPONSES[5];
}

function format(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#22D3EE">$1</strong>');
}

/* Orbiting dot around the button */
function OrbitDot() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ animation: 'none' }}>
      <motion.div className="absolute w-2 h-2 rounded-full"
        style={{ background: '#10B981', top: '50%', left: '50%', boxShadow: '0 0 8px #10B981',  marginTop: -4, marginLeft: -4 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        transformTemplate={({ rotate }) => `rotate(${rotate}) translateX(26px) rotate(-${rotate})`}
      />
    </div>
  );
}

export default function EcoLearnCommand() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', text: "Hello! I'm **EcoLearn Intelligence**. How can I help you today?" }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text = input) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const res = getResponse(text);
      setTyping(false);
      setMessages(m => [...m, { role: 'assistant', text: res.a }]);
    }, 900 + Math.random() * 400);
  };

  return (
    <>
      {/* ── Floating Pill Button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-full cursor-pointer relative ecolearn-pill"
          >
            <OrbitDot />
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
              <Sparkles size={16} style={{ color: '#22D3EE' }} />
            </motion.div>
            <span className="text-[12px] font-semibold text-white">EcoLearn AI</span>
            <motion.div className="w-2 h-2 rounded-full" style={{ background: '#10B981', boxShadow: '0 0 8px #10B981' }}
              animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-[100] w-[340px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'rgba(8,11,20,0.95)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0, 242, 254, 0.15)',
              height: 420
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0, 242, 254, 0.06)' }}>
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-md"
                  style={{ background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.3), rgba(8, 145, 178, 0.2))', border: '1px solid rgba(0, 242, 254, 0.4)' }}>
                  🌿
                </motion.div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#10B981] rounded-full border-2 border-[#080B14]" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-bold text-white">EcoLearn Intelligence</p>
                <p className="text-[9px] flex items-center gap-1" style={{ color: '#10B981' }}>
                  <span className="relative w-1 h-1 inline-block">
                    <span className="absolute inset-0 rounded-full bg-[#10B981]" />
                    <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
                  </span>
                  Online
                </p>
              </div>
              <motion.button whileHover={{ scale: 1.15, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-white/10"
                style={{ color: '#64748B' }}>
                <X size={14} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 no-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-[11.5px] leading-relaxed ${
                      m.role === 'user'
                        ? 'text-white rounded-br-md'
                        : 'text-[#E2E8F0] rounded-bl-md'
                    }`} style={m.role === 'user'
                      ? { background: 'linear-gradient(135deg, #0891B2, #00F2FE)', boxShadow: '0 4px 16px rgba(0, 242, 254, 0.3)' }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                    } dangerouslySetInnerHTML={{ __html: format(m.text) }} />
                  </motion.div>
                ))}
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: '#22D3EE' }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTIONS.map((s, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap cursor-pointer shrink-0 transition-all"
                  style={{ background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.2)', color: '#22D3EE' }}>
                  {s}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ask EcoLearn anything…"
                  className="flex-1 text-[12px] bg-transparent border-0 outline-none text-white placeholder:text-[#334155]"
                  style={{ fontFamily: 'Inter, sans-serif' }} />
                <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
                  onClick={() => send()}
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: input.trim() ? 'linear-gradient(135deg, #0891B2, #00F2FE)' : 'rgba(255,255,255,0.06)', color: input.trim() ? 'white' : '#334155' }}>
                  <Send size={13} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
