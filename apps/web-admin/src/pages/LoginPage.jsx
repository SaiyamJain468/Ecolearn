import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Zap, Chrome, UserCircle, Loader2, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@ecolearn.in");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("System Uplink Established", {
        style: {
          background: "#0F172A",
          color: "#10B981",
          border: "1px solid rgba(16,185,129,0.2)",
        },
      });
      nav("/");
    } catch (err) {
      toast.error("Auth failed: " + err.message.substring(0, 30) + "...");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    toast.loading("Connecting to Google Auth...", { duration: 1500 });
    try {
      await loginWithGoogle();
      toast.dismiss();
      toast.success("Verified via Google");
      nav("/");
    } catch (err) {
      toast.dismiss();
      toast.error("Google Auth Canceled or Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-teal/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-green/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px] z-10"
      >
        <div className="surface-glass p-6 md:p-10 rounded-[40px] border border-white/10 shadow-3xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eco-teal via-eco-green to-eco-teal opacity-50" />

          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-5 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-eco-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/logo.png" alt="EcoLearn Logo" className="w-10 h-10 object-contain relative z-10" />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              EcoLearn <span className="text-eco-teal">Protocol</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-eco-green animate-pulse" />
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">
                DEMO ENVIRONMENT ACTIVE
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                Universal ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-eco-green focus:bg-white/10 transition-all text-sm"
                placeholder="admin@ecolearn.in"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                Encryption Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-eco-green focus:bg-white/10 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 bg-eco-green hover:bg-eco-green/90 text-[13px] text-white font-bold rounded-2xl transition-all shadow-lg shadow-eco-green/30 disabled:opacity-50 flex items-center justify-center group mt-4 hover:translate-y-[-2px] active:translate-y-[1px]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  LOG IN AS ADMIN(DEMO USER) <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-[#0D1117] px-4 text-white/20">
                OR SECURE AUTH
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group"
            >
              <Chrome
                size={18}
                className="group-hover:text-eco-teal transition-colors"
              />{" "}
              CONTINUE WITH GOOGLE
            </button>

            <Link to="/signup" className="block">
              <button className="w-full py-4 text-white/40 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                CREATE NEW ACCOUNT <ArrowRight size={12} />
              </button>
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-[11px] text-white/20 font-medium">
          &copy; 2026 INNOSOFT | EcoLearn CORE v1.0.4-PROTO
        </p>
      </motion.div>
    </div>
  );
}
