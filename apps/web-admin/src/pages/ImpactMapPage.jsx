import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Leaf,
  Droplets,
  Wind,
  Sun,
  TrendingUp,
  Zap,
  Activity,
} from "lucide-react";
import { MOCK_MAP_NODES } from "../lib/mockData";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const typeConfig = {
  BIO_HUB: { color: "#10B981", icon: Leaf, label: "Bio Hub" },
  ENERGY_GRID: { color: "#F59E0B", icon: Zap, label: "Energy Grid" },
  WATER_SYNC: { color: "#06B6D4", icon: Droplets, label: "Water Sync" },
  RECYCLE_POINT: { color: "#F97316", icon: Wind, label: "Recycle" },
  NODE_MASTER: { color: "#00F2FE", icon: Globe, label: "Master Node" },
};

const radarData = [
  { area: "Planting", A: 82 },
  { area: "Water", A: 74 },
  { area: "Energy", A: 68 },
  { area: "Waste", A: 91 },
  { area: "Alliance", A: 55 },
];

const RadarTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="glass-strong rounded-xl p-3 text-[11px]"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p className="text-white font-bold">{payload[0]?.payload?.area}</p>
      <p style={{ color: "#22D3EE" }}>{payload[0]?.value}% impact</p>
    </div>
  );
};

const regions = [
  {
    name: "Bhopal Central",
    trees: 420,
    water: "12k L",
    co2: "450 Kg",
    color: "#10B981",
    status: "Active",
    trend: "+18%",
    x: 50,
    y: 40,
  },
  {
    name: "Indore North",
    trees: 310,
    water: "8.4k L",
    co2: "320 Kg",
    color: "#00F2FE",
    status: "Active",
    trend: "+12%",
    x: 20,
    y: 70,
  },
  {
    name: "Sagar District",
    trees: 180,
    water: "5.1k L",
    co2: "180 Kg",
    color: "#06B6D4",
    status: "Growing",
    trend: "+9%",
    x: 80,
    y: 30,
  },
  {
    name: "Jabalpur East",
    trees: 95,
    water: "2.8k L",
    co2: "95 Kg",
    color: "#F59E0B",
    status: "New",
    trend: "+4%",
    x: 70,
    y: 80,
  },
];

const connectionLines = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [2, 3],
];

export default function ImpactMapPage() {
  const [sel, setSel] = useState(regions[0]);
  const [nodes, setNodes] = useState([]);

  // Generate some random floating background nodes for the "crazy" visual effect
  useEffect(() => {
    const randomNodes = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setNodes(randomNodes);
  }, []);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Global Impact Matrix{" "}
            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-eco-green/20 text-eco-green border border-eco-green/30 animate-pulse">
              LIVE
            </div>
          </h1>
          <p className="text-white/40 mt-1">
            Real-time planetary intelligence and node density visualization
          </p>
        </div>
      </div>

      {/* Hero Interactive Map - The "Crazy" visual element */}
      <motion.div
        variants={fadeUp}
        className="relative w-full h-[400px] rounded-3xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.05)",
          background: "#0D1120",
          boxShadow:
            "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 100px rgba(0,242,254,0.05)",
        }}
      >
        {/* Abstract Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Dynamic Glows */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0"
          animate={{
            background: `radial-gradient(circle, ${sel?.color || "#00F2FE"}15 0%, transparent 60%)`,
          }}
          transition={{ duration: 1 }}
        />

        {/* Floating background nodes */}
        {nodes.map((n) => (
          <motion.div
            key={`bg-${n.id}`}
            className="absolute rounded-full bg-white/10 z-0"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: n.size,
              height: n.size,
            }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: n.duration,
              delay: n.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* SVG Network Lines */}
        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {connectionLines.map(([startIdx, endIdx], i) => {
            const start = regions[startIdx];
            const end = regions[endIdx];
            const isSelected =
              sel?.name === start.name || sel?.name === end.name;
            return (
              <motion.line
                key={i}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={isSelected ? sel?.color : "#ffffff1A"}
                strokeWidth={isSelected ? 2 : 1}
                filter={isSelected ? "url(#glow)" : ""}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
            );
          })}
        </svg>

        {/* Interactive Main Nodes */}
        <div className="absolute inset-0 z-20">
          {regions.map((r, i) => {
            const isSelected = sel?.name === r.name;
            return (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
                onClick={() => setSel(r)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: i * 0.1 }}
              >
                {/* Node Rings */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-transparent rounded-full -m-6"
                    style={{ border: `1px solid ${r.color}50` }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <div
                  className="relative w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-125 z-10"
                  style={{
                    background: r.color,
                    boxShadow: `0 0 20px ${r.color}80, inset 0 0 10px rgba(255,255,255,0.5)`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                </div>

                {/* Node Tooltip Label */}
                <div
                  className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all ${isSelected ? "opacity-100 scale-100 y-0" : "opacity-0 scale-95 -y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:y-0"}`}
                  style={{
                    background: "rgba(13,17,32,0.8)",
                    borderColor: `${r.color}40`,
                  }}
                >
                  <p className="text-[11px] font-bold text-white">{r.name}</p>
                  <p
                    className="text-[9px] font-semibold text-center"
                    style={{ color: r.color }}
                  >
                    {r.status}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Region Detailed Stats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={sel?.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <div
            className="col-span-2 md:col-span-1 p-5 rounded-2xl flex flex-col justify-center"
            style={{
              background: `linear-gradient(135deg, ${sel?.color}15, transparent)`,
              border: `1px solid ${sel?.color}30`,
            }}
          >
            <h3 className="text-sm font-bold text-white mb-1">{sel?.name}</h3>
            <p
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: sel?.color }}
            >
              Selected Zone
            </p>
          </div>
          {[
            {
              k: "Trees Planted",
              v: sel?.trees,
              c: "#10B981",
              i: <Leaf size={16} />,
            },
            {
              k: "Water Saved",
              v: sel?.water,
              c: "#06B6D4",
              i: <Droplets size={16} />,
            },
            {
              k: "CO₂ Offset",
              v: sel?.co2,
              c: "#F59E0B",
              i: <Wind size={16} />,
            },
            {
              k: "Growth Trend",
              v: sel?.trend,
              c: "#00F2FE",
              i: <TrendingUp size={16} />,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
            >
              <div className="mb-2" style={{ color: s.c }}>
                {s.i}
              </div>
              <p className="text-xl font-bold text-white">{s.v}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 mt-1">
                {s.k}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Radar Chart & Details */}
        <motion.div
          variants={fadeUp}
          className="xl:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#0D1120]"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Impact Vector Analysis
              </h3>
              <p className="text-xs text-white/40">
                Multi-dimensional sustainability scoring across 5 key metrics
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Chart Area */}
            <div className="w-full md:w-1/2 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis
                    dataKey="area"
                    tick={{ fontSize: 11, fill: "#64748B", fontWeight: 600 }}
                  />
                  <Radar
                    name="Impact"
                    dataKey="A"
                    stroke={sel?.color || "#00F2FE"}
                    fill={sel?.color || "#00F2FE"}
                    fillOpacity={0.2}
                    strokeWidth={3}
                    dot={{
                      fill: sel?.color || "#00F2FE",
                      r: 4,
                      strokeWidth: 0,
                    }}
                  />
                  <RechartsTooltip content={<RadarTip />} cursor={false} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Metrics */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">
                    Overall Efficiency
                  </p>
                  <p className="text-2xl font-bold text-white">
                    88<span className="text-sm text-white/50">%</span>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">
                    Strongest Vector
                  </p>
                  <p
                    className="text-xl font-bold"
                    style={{ color: sel?.color || "#00F2FE" }}
                  >
                    Waste Mgmt
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {radarData.map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-semibold text-white/80">
                        {d.area}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {d.A}/100
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${d.A}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: sel?.color || "#00F2FE" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Nodes List */}
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-3xl border border-white/10 bg-[#0D1120] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Live Terminals</h3>
            <span className="px-2.5 py-1 rounded bg-eco-green/10 text-eco-green text-[10px] font-bold uppercase tracking-wider border border-eco-green/20">
              {MOCK_MAP_NODES.length} Online
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_MAP_NODES.map((node, i) => {
              const cfg = typeConfig[node.type] || {
                color: "#00F2FE",
                icon: Globe,
                label: node.type,
              };
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{
                    scale: 1.02,
                    background: "rgba(255,255,255,0.04)",
                  }}
                  className="flex items-center gap-4 p-3.5 rounded-2xl cursor-pointer transition-all border border-white/5 bg-white/[0.02]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${cfg.color}15`,
                      boxShadow: `inset 0 0 10px ${cfg.color}30`,
                    }}
                  >
                    <Icon size={16} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {node.label.replace(/_/g, " ")}
                    </p>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider mt-0.5"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{
                          background:
                            node.status === "active" ? "#10B981" : "#F59E0B",
                          boxShadow: `0 0 10px ${node.status === "active" ? "#10B981" : "#F59E0B"}`,
                        }}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                        {node.status}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white">
                      {Math.round(node.strength * 100)}% Str
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-in {
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `,
        }}
      />
    </motion.div>
  );
}
