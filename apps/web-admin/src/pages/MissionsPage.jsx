import React, { useState, useRef } from "react";
import { MOCK_MISSIONS } from "../lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Camera,
  Leaf,
  Droplets,
  BatteryCharging,
  Flame,
  Zap,
  X,
  CheckCircle2,
  Trophy,
  Star,
  Upload,
} from "lucide-react";
import { toast } from "react-hot-toast";

const catConfig = {
  plant: {
    icon: Leaf,
    color: "#10B981",
    label: "Plant",
    bg: "rgba(16,185,129,0.12)",
  },
  water: {
    icon: Droplets,
    color: "#06B6D4",
    label: "Water",
    bg: "rgba(6,182,212,0.12)",
  },
  waste: {
    icon: Flame,
    color: "#F59E0B",
    label: "Waste",
    bg: "rgba(245,158,11,0.12)",
  },
  energy: {
    icon: BatteryCharging,
    color: "#00F2FE",
    label: "Energy",
    bg: "rgba(0, 242, 254, 0.12)",
  },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const CATS = ["All", "Plant", "Water", "Waste", "Energy"];

const diffLabel = (d) =>
  d >= 3
    ? ["Hard", "badge-danger"]
    : d >= 2
      ? ["Medium", "badge-warning"]
      : ["Easy", "badge-success"];

export default function MissionsPage() {
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("ecolearn_completed_missions") || "[]",
      );
    } catch {
      return [];
    }
  });
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proof, setProof] = useState(null);
  const [proofName, setProofName] = useState("");
  const fileInputRef = useRef(null);

  const filtered =
    cat === "All"
      ? MOCK_MISSIONS
      : MOCK_MISSIONS.filter((m) => m.category === cat.toLowerCase());
  const done = completed.length;
  const totalXP = completed.reduce(
    (a, id) => a + (MOCK_MISSIONS.find((m) => m.id === id)?.xp || 0),
    0,
  );

  const complete = (m) => {
    if (!completed.includes(m.id)) {
      const next = [...completed, m.id];
      setCompleted(next);
      sessionStorage.setItem(
        "ecolearn_completed_missions",
        JSON.stringify(next),
      );
      setSuccess(m);
      setSel(null);
      setIsSubmitting(false);
      setProof(null);
      setProofName("");
      toast.success(`Mission "${m.title}" submitted for validation!`);
      setTimeout(() => setSuccess(null), 3200);
    }
  };

  const handleStartSubmit = () => {
    setIsSubmitting(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProofName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProof(reader.result);
      toast.success("Photo proof attached!", { icon: "📸" });
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-5"
    >
      {/* ... previous Hero and Category Filter code ... */}
      {/* Hero */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl p-7"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 242, 254, 0.12) 0%, rgba(16, 185, 129, 0.06) 100%)",
          border: "1px solid rgba(0, 242, 254, 0.2)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00F2FE, transparent 70%)",
          }}
        />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-1"
              style={{ color: "#22D3EE" }}
            >
              Mission Control
            </p>
            <h1 className="text-[26px] font-bold text-white tracking-tight mb-1">
              Active Challenges
            </h1>
            <p className="text-[13px]" style={{ color: "#94A3B8" }}>
              {MOCK_MISSIONS.length} missions · {done} completed ·{" "}
              {MOCK_MISSIONS.reduce((a, m) => a + m.xp, 0).toLocaleString()} XP
              available
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 shrink-0">
            {[
              { k: "Available", v: MOCK_MISSIONS.length, c: "#22D3EE" },
              { k: "Completed", v: done, c: "#10B981" },
              {
                k: "XP Earned",
                v: `${totalXP.toLocaleString()}`,
                c: "#F59E0B",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.07, type: "spring" }}
                className="p-4 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-[20px] font-bold" style={{ color: s.c }}>
                  {s.v}
                </p>
                <p
                  className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
                  style={{ color: "#475569" }}
                >
                  {s.k}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        variants={fadeUp}
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {CATS.map((c) => (
          <motion.button
            key={c}
            onClick={() => setCat(c)}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-[7px] rounded-lg text-[11px] font-semibold cursor-pointer relative"
            style={{ color: cat === c ? "white" : "#64748B" }}
          >
            {cat === c && (
              <motion.div
                layoutId="mcat"
                className="absolute inset-0 rounded-lg"
                style={{
                  background: "linear-gradient(90deg, #0891B2, #00F2FE)",
                }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((m, i) => {
            const cfg = catConfig[m.category] || {
              icon: Zap,
              color: "#00F2FE",
              bg: "rgba(0, 242, 254, 0.12)",
              label: m.category,
            };
            const Icon = cfg.icon;
            const isDone = completed.includes(m.id);
            const [dLabel, dBadge] = diffLabel(m.difficulty);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={
                  !isDone
                    ? {
                        y: -5,
                        boxShadow: `0 20px 48px rgba(0,0,0,0.3), 0 0 60px ${cfg.color}12`,
                      }
                    : {}
                }
                onClick={() => !isDone && setSel(m)}
                className="surface p-5 flex flex-col cursor-pointer group relative overflow-hidden"
                style={{
                  opacity: isDone ? 0.55 : 1,
                  transition: "all 0.3s ease",
                }}
              >
                {isDone && (
                  <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center z-10"
                    style={{
                      background: "rgba(16,185,129,0.06)",
                      backdropFilter: "blur(1px)",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle2 size={32} style={{ color: "#10B981" }} />
                      <span
                        className="text-[11px] font-bold mt-2"
                        style={{ color: "#10B981" }}
                      >
                        Completed
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: cfg.bg }}
                  >
                    <Icon size={18} style={{ color: cfg.color }} />
                  </motion.div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`badge ${dBadge}`}
                      style={{ fontSize: "8px", padding: "2px 8px" }}
                    >
                      {dLabel}
                    </span>
                    <span
                      className="badge badge-accent"
                      style={{ fontSize: "8px", padding: "2px 8px" }}
                    >
                      +{m.xp} XP
                    </span>
                  </div>
                </div>
                <h3 className="text-[14px] font-semibold text-white mb-1.5 group-hover:text-[#22D3EE] transition-colors">
                  {m.title}
                </h3>
                <p
                  className="text-[11px] leading-relaxed mb-auto"
                  style={{ color: "#64748B" }}
                >
                  {m.description}
                </p>
                <div
                  className="flex items-center justify-between pt-4 mt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center gap-1.5 text-[10px] font-medium"
                      style={{ color: "#475569" }}
                    >
                      <Clock size={10} />
                      {m.time}
                    </span>
                    {m.requires_photo && (
                      <Camera size={11} style={{ color: "#475569" }} />
                    )}
                  </div>
                  <span
                    className="text-[9px] font-semibold uppercase px-2 py-1 rounded-lg"
                    style={{ background: `${cfg.color}10`, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Mission Detail Modal */}
      <AnimatePresence>
        {sel &&
          (() => {
            const cfg = catConfig[sel.category] || {
              icon: Zap,
              color: "#00F2FE",
              bg: "rgba(0, 242, 254, 0.12)",
            };
            const Icon = cfg.icon;
            const [dLabel, dBadge] = diffLabel(sel.difficulty);
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => setSel(null)}
              >
                <motion.div
                  initial={{ scale: 0.88, y: 40, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.88, y: 40, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="glass-strong rounded-2xl max-w-md w-full p-7 shadow-2xl overflow-hidden relative"
                  style={{ border: `1px solid ${cfg.color}30` }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    {!isSubmitting ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="flex justify-between items-start mb-5">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                              background: cfg.bg,
                              border: `1px solid ${cfg.color}30`,
                              boxShadow: `0 0 30px ${cfg.color}20`,
                            }}
                          >
                            <Icon size={26} style={{ color: cfg.color }} />
                          </div>
                          <button
                            onClick={() => setSel(null)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all"
                            style={{ color: "#64748B" }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`badge ${dBadge}`}
                            style={{ fontSize: "9px" }}
                          >
                            {dLabel}
                          </span>
                          <span
                            className="badge badge-accent"
                            style={{ fontSize: "9px" }}
                          >
                            +{sel.xp} XP
                          </span>
                          <span
                            className="flex items-center gap-1 text-[10px]"
                            style={{ color: "#475569" }}
                          >
                            <Clock size={10} />
                            {sel.time}
                          </span>
                        </div>
                        <h2 className="text-[22px] font-bold text-white mb-2 tracking-tight">
                          {sel.title}
                        </h2>
                        <p
                          className="text-[13px] leading-relaxed mb-6"
                          style={{ color: "#94A3B8" }}
                        >
                          {sel.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="btn-primary w-full"
                          style={{ padding: "13px", fontSize: "13px" }}
                          onClick={handleStartSubmit}
                        >
                          Initiate Completion · +{sel.xp} XP
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-white">
                            Proof of Impact
                          </h3>
                          <button
                            onClick={() => setIsSubmitting(false)}
                            className="text-[11px] font-bold text-white/40 hover:text-white transition-colors"
                          >
                            BACK
                          </button>
                        </div>

                        <div className="space-y-5">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${proof ? "border-eco-green bg-eco-green/5" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                          >
                            {proof ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={proof}
                                  alt="Proof"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/70 backdrop-blur-sm flex items-center gap-2">
                                  <CheckCircle2
                                    size={14}
                                    className="text-eco-green shrink-0"
                                  />
                                  <span className="text-[10px] font-bold text-white truncate">
                                    {proofName}
                                  </span>
                                  <span className="text-[9px] text-eco-green ml-auto shrink-0">
                                    ATTACHED
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                  <Camera size={24} className="text-white/40" />
                                </div>
                                <p className="text-[12px] font-bold text-white mb-1">
                                  Upload Photo Proof
                                </p>
                                <p className="text-[10px] text-white/40">
                                  Click to select an image from your device
                                </p>
                              </>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">
                              Observational Notes
                            </label>
                            <textarea
                              rows={2}
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-eco-teal transition-all"
                              placeholder="Tell us what you accomplished..."
                            ></textarea>
                          </div>

                          <motion.button
                            disabled={!proof}
                            whileHover={proof ? { scale: 1.02 } : {}}
                            whileTap={proof ? { scale: 0.97 } : {}}
                            className={`w-full py-3.5 rounded-xl font-bold text-[13px] transition-all ${proof ? "bg-eco-green hover:bg-eco-green/80 text-white shadow-lg" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                            onClick={() => complete(sel)}
                          >
                            SUBMIT FOR VALIDATION
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-[300] flex items-center gap-4 p-5 rounded-2xl shadow-2xl"
            style={{
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 60px rgba(16,185,129,0.2)",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -5, 5, 0],
                scale: [1, 1.3, 0.9, 1.1, 1],
              }}
              transition={{ duration: 0.6 }}
            >
              <Trophy size={28} style={{ color: "#10B981" }} />
            </motion.div>
            <div>
              <p className="text-[14px] font-bold text-white">
                Mission complete! 🎉
              </p>
              <p className="text-[12px]" style={{ color: "#34D399" }}>
                +{success.xp} XP awarded
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
