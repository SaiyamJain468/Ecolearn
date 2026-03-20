import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  LayoutDashboard,
  Target,
  Trophy,
  User,
  BookOpen,
  Bell,
  Settings,
  Sparkles,
  Globe,
  Zap,
  Network,
  Search,
  ChevronDown,
  Flame,
  ClipboardCheck,
  Users,
  LogOut,
  Shield,
  RefreshCw,
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  Monitor,
  Sliders,
  ExternalLink,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

/* ── Cursor Spotlight ────────────────────────────────────── */
function CursorSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="cursor-spotlight"
      style={{ willChange: "transform" }}
    />
  );
}

/* ── Floating Particle ───────────────────────────────────── */
function Particles() {
  const particles = [
    { x: "15%", size: 3, color: "#00F2FE", dur: "7s", delay: "0s" },
    { x: "30%", size: 2, color: "#0891B2", dur: "9s", delay: "2s" },
    { x: "60%", size: 4, color: "#22D3EE", dur: "6s", delay: "4s" },
    { x: "75%", size: 2, color: "#00F2FE", dur: "8s", delay: "1s" },
    { x: "85%", size: 3, color: "#0891B2", dur: "7s", delay: "3s" },
    { x: "45%", size: 2, color: "#10B981", dur: "10s", delay: "5s" },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle absolute bottom-0"
          style={{
            left: p.x,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            "--dur": p.dur,
            "--delay": p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ── Global XP Fire Animation ───────────────────────────── */
function XpAnimationOverlay() {
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const handleXp = (e) => {
      const amount = e.detail?.amount || 100;
      const id = Date.now() + Math.random();
      setAnimations((prev) => [...prev, { id, amount }]);
      setTimeout(() => {
        setAnimations((prev) => prev.filter((a) => a.id !== id));
      }, 2000);
    };
    window.addEventListener("xp-earned", handleXp);
    return () => window.removeEventListener("xp-earned", handleXp);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {animations.map((anim) => (
          <motion.div
            key={anim.id}
            initial={{ opacity: 0, scale: 0.3, y: 100 }}
            animate={{ opacity: 1, scale: 1.2, y: -50 }}
            exit={{ opacity: 0, scale: 1.5, y: -150 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [-8, 8, -8], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#F97316] blur-[20px] rounded-full opacity-60" />
              <Flame
                size={80}
                className="text-[#FBBF24] relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,1)]"
                fill="#F97316"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black mt-2 tracking-tight"
              style={{
                background: "linear-gradient(to bottom, #FFFFFF, #00F2FE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0px 4px 8px rgba(0, 242, 254, 0.5))",
              }}
            >
              +{anim.amount} XP
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ── Nav Item ────────────────────────────────────────────── */
const NavItem = ({ to, icon: Icon, label, active, onClick }) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-150 cursor-pointer select-none relative ${
        active
          ? "text-white"
          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
      }`}
    >
      {active && (
        <motion.div
          layoutId="navActive"
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(120deg, rgba(0, 242, 254, 0.2), rgba(8, 145, 178, 0.1))",
            border: "1px solid rgba(0, 242, 254, 0.3)",
            boxShadow:
              "0 0 20px rgba(0, 242, 254, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <Icon
        size={16}
        strokeWidth={active ? 2.2 : 1.7}
        className={`relative z-10 transition-colors ${active ? "text-[#22D3EE]" : ""}`}
      />
      <span className="relative z-10">{label}</span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="ml-auto w-1.5 h-1.5 rounded-full relative z-10"
          style={{
            background: "#00F2FE",
            boxShadow: "0 0 8px rgba(0, 242, 254, 0.9)",
          }}
        />
      )}
    </motion.div>
  </Link>
);

/* ── Section Label ───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p
    className="px-3.5 text-[9px] font-bold uppercase tracking-[0.2em] mb-2 mt-1"
    style={{ color: "#2D3748" }}
  >
    {children}
  </p>
);

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const p = location.pathname;
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [p]);

  // Header Dropdowns
  const [openDropdown, setOpenDropdown] = useState(null); // 'alerts', 'help', 'settings'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const navLinks = [
    { n: "Dashboard", p: "/" },
    { n: "Missions", p: "/missions" },
    { n: "Learning Hub", p: "/learn" },
    { n: "Analytics", p: "/analytics" },
    { n: "Collaboration", p: "/nexus" },
    { n: "Approval Queue", p: "/submissions" },
    { n: "Member List", p: "/students" },
    { n: "Leaderboard", p: "/rankings" },
    { n: "Reward Vault", p: "/badges" },
    { n: "Career Path", p: "/career" },
    { n: "Impact Map", p: "/map" },
    { n: "Account Center", p: "/profile" },
    { n: "System Alerts", p: "/alerts" },
    { n: "Help Desk", p: "/help" },
    { n: "EcoLearn Prime", p: "/pro" },
  ];

  const searchResults = searchQuery
    ? navLinks.filter((l) =>
        l.n.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : navLinks.slice(0, 5);

  // Close dropdowns on outside click or escape could be added, but for now we toggle.

  const pageTitle =
    p === "/" ? "Dashboard" : p.replace("/", "").replace(/-/g, " ");

  const handleLogout = () => {
    logout();
    toast.success("Session terminated. Redirecting...");
    navigate("/login");
  };

  const handleSwitchAccount = () => {
    logout();
    toast("Switching identity...", { icon: "🔄" });
    navigate("/login");
  };

  return (
    <div
      className="flex h-screen overflow-hidden font-['Inter']"
      style={{ background: "var(--bg-base)" }}
    >
      <CursorSpotlight />
      <Particles />
      <XpAnimationOverlay />

      {/* Static ambient orbs */}
      <div
        className="ambient-orb w-[600px] h-[600px] -top-32 -left-48 opacity-[0.035]"
        style={{ background: "#00F2FE" }}
      />
      <div
        className="ambient-orb w-[400px] h-[400px] -bottom-24 -right-24 opacity-[0.025]"
        style={{ background: "#06B6D4" }}
      />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ═══ SIDEBAR ═══════════════════════════════════════ */}
      <aside
        className={`fixed md:relative z-50 w-[260px] h-full flex flex-col border-r overflow-y-auto no-scrollbar shrink-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.5), transparent)",
          }}
        />

        {/* Logo / Brand */}
        <div className="px-5 pt-5 pb-2 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(8, 145, 178, 0.1))",
              boxShadow: "0 0 20px rgba(0, 242, 254, 0.3)",
              border: "1px solid rgba(0, 242, 254, 0.2)",
            }}
          >
            <img src="/logo.png" alt="EcoLearn Logo" className="w-full h-full object-cover" />
          </motion.div>
          <span className="text-[15px] font-bold text-white tracking-tight">
            EcoLearn <span style={{ color: "#22D3EE" }}>Protocol</span>
          </span>
        </div>

        {/* User Profile + Dropdown */}
        <div className="px-4 pt-3 pb-1">
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer group transition-all"
            style={{
              background: profileOpen
                ? "rgba(0,242,254,0.06)"
                : "rgba(255,255,255,0.03)",
              border: profileOpen
                ? "1px solid rgba(0,242,254,0.15)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] text-white"
                style={{
                  background: "linear-gradient(135deg, #F97316, #FBBF24)",
                  boxShadow: "0 0 16px rgba(249,115,22,0.4)",
                }}
              >
                {user?.first_name?.[0] || "A"}
                {user?.last_name?.[0] || "D"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0D1120]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate">
                {user?.first_name || "Admin"} {user?.last_name || "(Demo User)"}
              </p>
              <p
                className="text-[10px] font-medium"
                style={{ color: "#475569" }}
              >
                {user?.role === "admin"
                  ? "System Administrator"
                  : "Eco Warrior · Lvl 14"}
              </p>
            </div>
            <motion.div
              animate={{ rotate: profileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                size={12}
                className="text-[#334155] group-hover:text-[#64748B] transition-colors"
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div
                  className="mt-1.5 py-1.5 px-1 rounded-xl space-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Link to="/profile" onClick={() => setProfileOpen(false)}>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] cursor-pointer transition-all">
                      <User size={13} /> View Profile
                    </div>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => {
                      setProfileOpen(false);
                      toast("Opening settings...", { icon: "⚙️" });
                    }}
                  >
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] cursor-pointer transition-all">
                      <Settings size={13} /> Settings
                    </div>
                  </Link>
                  <div
                    onClick={handleSwitchAccount}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.04] cursor-pointer transition-all"
                  >
                    <RefreshCw size={13} /> Switch Account
                  </div>
                  <div
                    className="my-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                  />
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium text-[#EF4444] hover:bg-red-500/10 cursor-pointer transition-all"
                  >
                    <LogOut size={13} /> Log Out
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="px-4 mb-2">
          <motion.div
            whileHover={{ borderColor: "rgba(0, 242, 254, 0.3)" }}
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-pointer group transition-all"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#475569",
            }}
          >
            <Search size={13} />
            <span className="text-[12px] flex-1">Search</span>
            <kbd
              className="text-[9px] px-1.5 py-[2px] rounded-md font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#334155",
              }}
            >
              ⌘K
            </kbd>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="px-3 flex-1">
          <SectionLabel>Main</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem
              to="/"
              icon={LayoutDashboard}
              label="Dashboard"
              active={p === "/"}
            />
            <NavItem
              to="/missions"
              icon={Target}
              label="Missions"
              active={p === "/missions"}
            />
            <NavItem
              to="/learn"
              icon={BookOpen}
              label="Learning Hub"
              active={p === "/learn"}
            />
            <NavItem
              to="/analytics"
              icon={BarChart3}
              label="Analytics"
              active={p === "/analytics"}
            />
            <NavItem
              to="/nexus"
              icon={Network}
              label="Collaboration"
              active={p === "/nexus"}
            />
          </nav>

          <SectionLabel>Management</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem
              to="/submissions"
              icon={ClipboardCheck}
              label="Approval Queue"
              active={p === "/submissions"}
            />
            <NavItem
              to="/students"
              icon={Users}
              label="Member List"
              active={p === "/students"}
            />
          </nav>

          <SectionLabel>Compete</SectionLabel>
          <nav className="space-y-0.5 mb-4">
            <NavItem
              to="/rankings"
              icon={Trophy}
              label="Leaderboard"
              active={p === "/rankings"}
            />
            <NavItem
              to="/badges"
              icon={Sparkles}
              label="Reward Vault"
              active={p === "/badges"}
            />
            <NavItem
              to="/career"
              icon={Zap}
              label="Career Path"
              active={p === "/career"}
            />
          </nav>
          <SectionLabel>System</SectionLabel>
          <nav className="space-y-0.5">
            <NavItem
              to="/map"
              icon={Globe}
              label="Impact Map"
              active={p === "/map"}
            />
            <NavItem
              to="/profile"
              icon={User}
              label="Account Center"
              active={p === "/profile"}
            />
          </nav>
        </div>

        {/* Promo Card */}
        <div className="p-4 mt-3">
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(8, 145, 178, 0.08))",
              border: "1px solid rgba(0, 242, 254, 0.2)",
              boxShadow: "0 0 40px rgba(0, 242, 254, 0.1)",
            }}
          >
            {/* Animated blobs */}
            <motion.div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20 pointer-events-none"
              style={{ background: "#00F2FE", filter: "blur(30px)" }}
              animate={{ scale: [1, 1.2, 1], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15 pointer-events-none"
              style={{ background: "#06B6D4", filter: "blur(25px)" }}
              animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-1.5">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Flame size={14} className="text-[#FBBF24]" />
                </motion.div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "#FBBF24" }}
                >
                  7-Day Streak!
                </span>
              </div>
              <p className="text-[13px] font-semibold text-white mb-0.5">
                Unlock more features
              </p>
              <p className="text-[11px] mb-4" style={{ color: "#94A3B8" }}>
                Get 14 days free — no card needed.
              </p>
              <Link to="/pro">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-[11px] w-full"
                  style={{ padding: "10px", fontSize: "12px" }}
                >
                  Switch to Pro Plan
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN ══════════════════════════════════════════ */}
      <main className="relative flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden z-10">
        {/* Sticky Header */}
        <header
          className="h-14 flex items-center justify-between px-4 md:px-7 sticky top-0 z-30 backdrop-blur-xl"
          style={{
            background: "rgba(8,11,20,0.85)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3 md:gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <Menu size={20} />
            </button>
            <motion.h2
              key={p}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[15px] font-semibold text-white capitalize tracking-tight"
            >
              {pageTitle}
            </motion.h2>
            {p === "/" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge badge-accent"
                style={{ fontSize: "9px", padding: "2px 8px" }}
              >
                LIVE
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => toast.success("XP sync complete. Rank verified.")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold cursor-pointer hidden md:flex"
              style={{
                background: "rgba(0, 242, 254, 0.1)",
                color: "#22D3EE",
                border: "1px solid rgba(0, 242, 254, 0.2)",
              }}
            >
              <Zap size={13} />
              {(user?.xp || 124500).toLocaleString()} XP
            </motion.div>

            {/* Help Desk Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDropdown("help")}
                className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all ${openDropdown === "help" ? "bg-[#00F2FE]/20 text-[#00F2FE] border-[#00F2FE]/40" : "bg-white/5 border-white/10 text-[#64748B] hover:text-white hover:border-white/20"}`}
                style={{ border: "1px solid" }}
              >
                <HelpCircle size={16} />
              </motion.button>

              <AnimatePresence>
                {openDropdown === "help" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-72 rounded-2xl bg-[#0B101D] border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5 bg-gradient-to-r from-transparent to-white/5">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <HelpCircle size={14} className="text-[#00F2FE]" />{" "}
                        Communications Channel
                      </h3>
                      <p className="text-[11px] text-[#64748B] mt-1">
                        Direct uplink to EcoLearn Support AI.
                      </p>
                    </div>
                    <div className="p-2 space-y-1">
                      {[
                        {
                          icon: MessageSquare,
                          label: "Live Comm-Link",
                          desc: "Chat with Support AI",
                          to: "/help",
                        },
                        {
                          icon: BookOpen,
                          label: "Knowledge Base",
                          desc: "Browse mission protocols",
                          to: "/help",
                        },
                        {
                          icon: AlertTriangle,
                          label: "Report Anomaly",
                          desc: "File a bug report",
                          to: "/help",
                        },
                      ].map((item, idx) => (
                        <Link
                          to={item.to}
                          key={idx}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all group">
                            <div className="w-8 h-8 rounded-lg bg-[#080B14] flex items-center justify-center border border-white/5 group-hover:border-[#00F2FE]/50 group-hover:text-[#00F2FE] text-[#94A3B8] transition-colors">
                              <item.icon size={14} />
                            </div>
                            <div>
                              <p className="text-[12px] font-bold text-white/90 group-hover:text-white">
                                {item.label}
                              </p>
                              <p className="text-[10px] text-[#64748B]">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDropdown("alerts")}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all ${openDropdown === "alerts" ? "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40" : "bg-white/5 border-white/10 text-[#64748B] hover:text-white hover:border-white/20"}`}
                style={{ border: "1px solid" }}
              >
                <Bell size={16} />
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border-[1.5px] border-[#080B14]"
                />
              </motion.button>

              <AnimatePresence>
                {openDropdown === "alerts" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 rounded-2xl bg-[#0B101D] border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent to-[#EF4444]/5">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          System Alerts{" "}
                          <span className="text-[10px] font-bold bg-[#EF4444] text-white px-2 py-0.5 rounded-full">
                            3 NEW
                          </span>
                        </h3>
                      </div>
                      <button className="text-[10px] text-[#94A3B8] hover:text-white">
                        Mark All Read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto no-scrollbar">
                      {[
                        {
                          title: "Mission Approved",
                          desc: 'Your "City Biodiversity" proof was accepted. +500 XP.',
                          time: "2m ago",
                          icon: Target,
                          c: "#10B981",
                        },
                        {
                          title: "Alliance Invite",
                          desc: 'You have been invited to "Green Vanguard".',
                          time: "1h ago",
                          icon: Users,
                          c: "#3B82F6",
                        },
                        {
                          title: "System Warning",
                          desc: "Terminal connection latency spike detected.",
                          time: "3h ago",
                          icon: AlertTriangle,
                          c: "#F59E0B",
                        },
                      ].map((alert, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer relative overflow-hidden group"
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: alert.c }}
                          />
                          <div
                            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-0.5"
                            style={{
                              background: `${alert.c}15`,
                              color: alert.c,
                            }}
                          >
                            <alert.icon size={14} />
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-white">
                              {alert.title}
                            </p>
                            <p className="text-[11px] text-[#64748B] mt-0.5">
                              {alert.desc}
                            </p>
                            <p className="text-[9px] text-[#475569] mt-1 font-bold">
                              {alert.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-white/5">
                      <Link to="/alerts" onClick={() => setOpenDropdown(null)}>
                        <button className="text-[11px] font-bold text-[#00F2FE] hover:text-white transition-colors">
                          View Alert Archive
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 30 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDropdown("settings")}
                className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all ${openDropdown === "settings" ? "bg-white/10 text-white border-white/30" : "bg-white/5 border-white/10 text-[#64748B] hover:text-white hover:border-white/20"}`}
                style={{ border: "1px solid" }}
              >
                <Settings size={16} />
              </motion.button>

              <AnimatePresence>
                {openDropdown === "settings" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-64 rounded-2xl bg-[#0B101D] border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/5 bg-gradient-to-r from-transparent to-white/5">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sliders size={14} className="text-[#94A3B8]" /> Quick
                        Config
                      </h3>
                    </div>
                    <div className="p-3 space-y-2">
                      <div
                        className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                        onClick={() =>
                          toast.success("Telemetry streaming active", {
                            id: "st1",
                          })
                        }
                      >
                        <span className="text-[12px] font-medium text-white/80">
                          Telemetry Logging
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="accent-[#00F2FE]"
                        />
                      </div>
                      <div
                        className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                        onClick={() =>
                          toast.success("Haptics updated", { id: "st2" })
                        }
                      >
                        <span className="text-[12px] font-medium text-white/80">
                          Haptic Feedback
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="accent-[#00F2FE]"
                        />
                      </div>
                      <div
                        className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 cursor-pointer"
                        onClick={() =>
                          toast.success("Anonymous Mode enabled", { id: "st3" })
                        }
                      >
                        <span className="text-[12px] font-medium text-white/80">
                          Anonymous Mode
                        </span>
                        <input type="checkbox" className="accent-[#00F2FE]" />
                      </div>
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <Link to="/profile" onClick={() => setOpenDropdown(null)}>
                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer text-[#64748B] hover:text-white transition-colors">
                          <span className="text-[11px] font-bold">
                            Advanced Settings
                          </span>
                          <ExternalLink size={12} />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Global Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-start justify-center pt-[10vh]"
              onClick={() => setSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-[#0B101D] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.1)] overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <Search className="text-[#00F2FE]" size={20} />
                  <input
                    autoFocus
                    placeholder="Search terminal... (modules, alliances, settings)"
                    className="flex-1 bg-transparent border-none text-white text-lg outline-none placeholder:text-[#475569]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <kbd className="text-xs text-[#64748B] bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                    ESC
                  </kbd>
                </div>
                <div className="p-2 max-h-[60vh] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <Link
                        to={res.p}
                        key={i}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 cursor-pointer text-white/70 hover:text-white transition-colors group">
                          <span className="font-semibold text-sm drop-shadow-md group-hover:text-[#00F2FE] transition-colors">
                            {res.n}
                          </span>
                          <ChevronDown
                            className="rotate-[270deg] opacity-0 group-hover:opacity-100 transition-opacity"
                            size={16}
                          />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-[#64748B]">
                      <Search className="mx-auto mb-2 opacity-50" size={32} />
                      <p>No valid modules found in terminal registry.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content with transition */}
        <div className="p-6 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
