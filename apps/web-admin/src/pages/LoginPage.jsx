import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Zap, Chrome, UserCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('gaia.admin@ecolearn.in');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(email, password); nav('/'); }
    catch (err) { setError(err.response?.data?.detail || 'Invalid credentials'); }
    finally { setLoading(false); }
  };
  const handleGuest = () => { login('guest@ecolearn.in', 'guest').then(() => nav('/')).catch(() => nav('/')); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#4F6EF7]/8 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#22D3EE]/6 blur-[100px]" />

      <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
        className="relative w-full max-w-[420px] bg-[#131B2E] rounded-2xl border border-[#1E293B] p-9 shadow-2xl shadow-black/30">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-9">
          <div className="w-11 h-11 bg-gradient-to-br from-[#4F6EF7] to-[#22D3EE] rounded-xl flex items-center justify-center shadow-lg shadow-[#4F6EF7]/20">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-[17px] font-bold text-white tracking-tight">GAIA Protocol</h1>
            <p className="text-[10px] text-[#475569] font-medium uppercase tracking-wider">Eco Intelligence Platform</p>
          </div>
        </div>

        {error && <div className="mb-5 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl text-[#EF4444] text-[13px] font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-[#475569] uppercase tracking-wider mb-2 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-[#475569] uppercase tracking-wider mb-2 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#4F6EF7] hover:bg-[#6B85FF] text-white font-semibold text-[13px] rounded-xl transition-all shadow-lg shadow-[#4F6EF7]/25 disabled:opacity-50 cursor-pointer mt-2">
            {loading ? 'Connecting...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-5 space-y-2.5">
          <button className="w-full py-2.5 bg-white/[0.03] border border-[#1E293B] hover:border-[#334155] text-[#94A3B8] hover:text-white text-[12px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer">
            <Chrome size={15} /> Continue with Google
          </button>
          <button onClick={handleGuest} className="w-full py-2.5 bg-white/[0.03] border border-[#1E293B] hover:border-[#334155] text-[#64748B] hover:text-[#94A3B8] text-[12px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer">
            <UserCircle size={15} /> Guest Access
          </button>
        </div>
      </motion.div>
    </div>
  );
}
