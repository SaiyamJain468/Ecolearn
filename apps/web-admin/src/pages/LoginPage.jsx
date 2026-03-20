import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Zap, Chrome, UserCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('gaia.admin@ecolearn.in');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    await login(email, password); 
    nav('/');
  };
  const handleGuest = () => { 
    setLoading(true);
    login('guest@ecolearn.in', 'guest').then(() => nav('/')); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-eco-green/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-eco-coral/8 blur-[100px]" />

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-[400px] bg-[#131B2E] rounded-[32px] border border-white/5 p-10 shadow-2xl shadow-black/50 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-green via-eco-teal to-eco-coral" />

        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-4 shadow-xl">
            <Zap size={32} className="text-eco-green fill-eco-green/20" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">GAIA <span className="text-eco-teal">Protocol</span></h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em] mt-1">Admin Dashboard v1.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Terminal ID</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-eco-green transition-all"
              placeholder="admin@ecolearn.in"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Access Key</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-eco-green transition-all"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-4 bg-eco-green text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-eco-green/30 disabled:opacity-50 flex items-center justify-center group mt-4 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'INITIALIZE UPLINK'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
          <button onClick={handleGuest} className="w-full py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
            <UserCircle size={16} className="group-hover:scale-110 transition-transform" /> GUEST PROTOCOL
          </button>
        </div>
      </motion.div>
    </div>
  );
}
