import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_LOGS = [
  "UPLINK_ESTABLISHED :: PORT_5000",
  "DECRYPTING_EcoLearn_ARRAY... [OK]",
  "SIGN_OF_LIFE_DETECTED :: SECTOR_7G",
  "ENCRYPTION_KEY_ROTATED :: SHA-256",
  "NODE_SYNC_COMPLETE :: LATENCY_12ms",
  "SCANNING_REF_DATA... [12%]",
  "INTERCEPTING_PACKET_ID_9901",
  "SECURE_BUFFER_OVERFLOW_PREVENTED",
  "HEARTBEAT_STABLE :: CORE_0",
  "RECALIBRATING_SENSORS... [78%]",
  "ACCESS_GRANTED :: ADMIN_V3",
  "TRACE_CLEARED :: VOLATILE_MEM",
  "UPLINK_STRENGTH :: 98.4%",
  "NEURAL_NET_STALL_RECOVERY... [OK]",
  "MOCK_API_INJECTED :: DASHBOARD_V1"
];

const Snitch = () => {
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
      setLogs(prev => [...prev.slice(-20), { id: Date.now(), text: newLine }]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      className="fixed bottom-4 left-4 z-[9999] pointer-events-none w-64 max-h-48 overflow-hidden font-mono text-[10px] opacity-40 hover:opacity-100 transition-opacity duration-500"
      style={{ 
        textShadow: '0 0 5px var(--coral)',
        background: 'linear-gradient(transparent, rgba(26, 15, 10, 0.8))'
      }}
    >
      <div className="flex items-center gap-2 mb-1 px-2 py-1 bg-black/40 border-l-2 border-coral">
        <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
        <span className="text-coral font-bold tracking-widest uppercase">SNITCH_MONITOR_V4.2</span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex flex-col gap-0.5 px-2 pb-2 scroll-smooth"
      >
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-peach/80 flex gap-2 shrink-0 whitespace-nowrap"
            >
              <span className="text-coral/50 opacity-50">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <span className="truncate">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="absolute top-0 right-0 w-12 h-full pointer-events-none bg-gradient-to-l from-dark/50 to-transparent" />
    </div>
  );
};

export default Snitch;
