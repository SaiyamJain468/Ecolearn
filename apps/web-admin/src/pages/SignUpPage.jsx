import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Zap, Chrome, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Provisioning Secure Identity...", { duration: 1500 });

    try {
      await signup(formData.email, formData.password, formData.name);
      toast.dismiss();
      toast.success("Account Created. Welcome to EcoLearn.", {
        style: {
          background: "#0F172A",
          color: "#10B981",
          border: "1px solid rgba(16,185,129,0.2)",
        },
      });
      nav("/");
    } catch (err) {
      toast.dismiss();
      toast.error("Signup failed: " + err.message.substring(0, 30) + "...");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    toast.loading("Connecting to Google...", { duration: 1000 });
    try {
      await loginWithGoogle();
      toast.dismiss();
      toast.success("Identity Verified via Google");
      nav("/");
    } catch (err) {
      toast.dismiss();
      toast.error("Google Auth Canceled or Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-coral/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-teal/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px] z-10"
      >
        <div className="surface-glass p-6 md:p-10 rounded-[40px] border border-white/10 shadow-3xl relative">
          <Link
            to="/login"
            className="absolute top-8 left-8 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>

          <div className="flex flex-col items-center text-center mb-10 mt-2">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-5 overflow-hidden p-2">
              <img src="/logo.png" alt="EcoLearn Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              JOIN <span className="text-eco-teal">THE MISSION</span>
            </h1>
            <p className="text-[11px] text-white/30 font-medium mt-2">
              Create your decentralized ecological identity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-eco-teal focus:bg-white/10 transition-all text-sm"
                placeholder="Eco Explorer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-eco-teal focus:bg-white/10 transition-all text-sm"
                placeholder="name@nexus.sh"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                Security Phrase
              </label>
              <input
                required
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-eco-teal focus:bg-white/10 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-eco-teal hover:bg-eco-teal/90 text-[13px] text-white font-bold rounded-2xl transition-all shadow-lg shadow-eco-teal/30 disabled:opacity-50 flex items-center justify-center group mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "GENERATE IDENTITY"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-[#0D1117] px-4 text-white/20">
                OR RAPID JOIN
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            <Chrome size={18} /> SIGN UP WITH GOOGLE
          </button>
        </div>
      </motion.div>
    </div>
  );
}
