import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Zap, Chrome, UserCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('gaia.admin@ecolearn.in');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(email, password); navigate('/'); }
    catch (err) { setError(err.response?.data?.detail || 'Invalid credentials'); }
    finally { setLoading(false); }
  };

  const handleGuest = () => { login('guest@ecolearn.in', 'guest').then(() => navigate('/')).catch(() => navigate('/')); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111827] rounded-2xl border border-[#1F2937] p-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-gradient-to-br from-[#4F6EF7] to-[#22D3EE] rounded-xl flex items-center justify-center shadow-lg"><Zap size={28} className="text-white" /></div>
          <div><h1 className="text-xl font-bold text-white">GAIA Protocol</h1><p className="text-[11px] text-[#4B5563]">Eco Intelligence Platform</p></div>
        </div>
        {error && <div className="mb-6 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl text-[#EF4444] text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2 block">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full" /></div>
          <div><label className="text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2 block">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full" /></div>
          <button type="submit" disabled={loading} className="btn-accent w-full py-3 disabled:opacity-50">{loading ? 'Connecting...' : 'Sign In'}</button>
        </form>
        <div className="mt-6 space-y-3">
          <button className="btn-outline w-full flex items-center justify-center gap-3"><Chrome size={18} /> Continue with Google</button>
          <button onClick={handleGuest} className="btn-outline w-full flex items-center justify-center gap-3 text-[#4B5563]"><UserCircle size={18} /> Guest Access</button>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginPage;
