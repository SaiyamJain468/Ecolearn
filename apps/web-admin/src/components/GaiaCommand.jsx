import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, TerminalSquare, Database, Cpu, Zap, ShieldCheck, Globe, X, Maximize2, Minimize2 } from 'lucide-react';
import { MOCK_LOGS } from '../lib/mockData';

const LOG_MAX = 6;

export default function GaiaCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(MOCK_LOGS.slice(0, 6).map(l => ({
      id: l.id, type: l.status.toLowerCase(), msg: l.message, time: l.time
    })));
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); setIsOpen(prev => !prev); }
    };
    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(() => {
      const types = ['success', 'warning', 'info'];
      const prefixes = ['UPLINK', 'NODE', 'PKT', 'SYNC', 'AUTH'];
      setLogs(prev => [...prev.slice(-(LOG_MAX - 1)), {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        msg: `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${Math.floor(Math.random() * 9999)}_OK`,
        time: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })
      }]);
    }, 5000);
    return () => { window.removeEventListener('keydown', handleKeyDown); clearInterval(interval); };
  }, []);

  return (
    <>
      {/* Minimized: just a small pill */}
      {minimized && (
        <motion.button
          onClick={() => setMinimized(false)}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-[100] px-4 py-2.5 bg-[#111827] border border-[#1F2937] rounded-full flex items-center gap-2 shadow-xl cursor-pointer hover:border-[#10B981]/40 transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
          <span className="text-[10px] font-bold text-[#8B92A5] uppercase tracking-wider">GAIA</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#1A1F2E] text-[#4B5563] text-[9px] font-bold border border-[#1F2937]">^K</kbd>
        </motion.button>
      )}

      {/* Expanded Log */}
      {!minimized && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 right-6 z-[100] w-80 bg-[#0B0F19] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-[#1F2937]">
          <div className="bg-[#111827] px-4 py-2.5 flex items-center justify-between border-b border-[#1F2937]">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-[#10B981]" />
              <span className="text-[10px] font-bold text-[#8B92A5] uppercase tracking-widest">GAIA_LOG</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24]/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]/50" />
              </div>
              <button onClick={() => setMinimized(true)} className="text-[#4B5563] hover:text-white ml-1"><Minimize2 size={12} /></button>
            </div>
          </div>
          <div className="p-3 space-y-1.5 font-mono max-h-[180px] overflow-y-auto no-scrollbar">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2 text-[9px] leading-tight">
                <span className="text-[#4B5563] whitespace-nowrap">[{log.time}]</span>
                <span className={`truncate ${log.type === 'success' ? 'text-[#10B981]' : log.type === 'warning' ? 'text-[#FBBF24]' : 'text-[#4F6EF7]'}`}>{log.msg}</span>
              </div>
            ))}
          </div>
          <div className="px-3 py-2 bg-[#111827] flex items-center justify-between border-t border-[#1F2937]">
            <span className="text-[9px] font-bold text-[#10B981] uppercase tracking-wider animate-pulse">Online</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#1A1F2E] text-[#4B5563] text-[9px] font-bold border border-[#1F2937]">^K</kbd>
          </div>
        </motion.div>
      )}

      {/* Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-8"
            onClick={() => setIsOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xl bg-[#1A1F2E] rounded-2xl shadow-2xl overflow-hidden border border-[#1F2937]"
              onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-[#1F2937] flex items-center gap-4">
                <div className="w-10 h-10 bg-[#252B3B] text-[#10B981] rounded-xl flex items-center justify-center"><TerminalSquare size={22} /></div>
                <input autoFocus placeholder="Type a command..." className="flex-1 bg-transparent text-base font-semibold text-white focus:outline-none placeholder:text-[#4B5563] border-none" />
                <button onClick={() => setIsOpen(false)} className="text-[#4B5563] hover:text-white text-xs font-bold uppercase">ESC</button>
              </div>
              <div className="p-3 bg-[#111827]">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Globe, label: 'Impact Map', key: 'G' },
                    { icon: Cpu, label: 'Diagnostics', key: 'D' },
                    { icon: Database, label: 'Sync Data', key: 'S' },
                    { icon: ShieldCheck, label: 'Auth Override', key: 'A' },
                  ].map((cmd) => (
                    <div key={cmd.key} className="p-4 bg-[#1A1F2E] border border-[#1F2937] rounded-xl flex items-center justify-between cursor-pointer group hover:border-[#10B981]/30 transition-all">
                      <div className="flex items-center gap-3">
                        <cmd.icon size={16} className="text-[#4B5563] group-hover:text-[#10B981] transition-colors" />
                        <span className="text-[11px] font-semibold text-[#8B92A5] group-hover:text-white transition-colors">{cmd.label}</span>
                      </div>
                      <kbd className="px-1.5 py-0.5 rounded bg-[#252B3B] text-[#4B5563] text-[9px] font-bold">{cmd.key}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
