import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, LayoutDashboard, Target, Trophy, User, BookOpen, Bell, Settings, Sparkles, Globe, Zap, Network, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GaiaCommand from './GaiaCommand';

const NavLink = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
      active 
        ? 'bg-[#4F6EF7] text-white shadow-lg shadow-[#4F6EF7]/20' 
        : 'text-[#8B92A5] hover:text-white hover:bg-[#1A1F2E]'
    }`}>
      <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
      <span>{label}</span>
    </div>
  </Link>
);

export default function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  const mainNav = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/missions', icon: Target, label: 'Missions' },
    { to: '/analytics', icon: BarChart3, label: 'Metrics' },
    { to: '/nexus', icon: Network, label: 'Teams' },
    { to: '/rankings', icon: Trophy, label: 'Leaderboard' },
    { to: '/badges', icon: Sparkles, label: 'Badges' },
    { to: '/career', icon: Zap, label: 'Career' },
  ];

  const guideNav = [
    { to: '/learn', icon: BookOpen, label: 'Guides' },
    { to: '/map', icon: Globe, label: 'Impact Map' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-[#F1F5F9] font-['Inter'] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-[#1F2937] bg-[#111827] overflow-y-auto no-scrollbar">
        {/* User Profile */}
        <div className="p-5 border-b border-[#1F2937]">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F6EF7] to-[#22D3EE] flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user?.first_name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.first_name || 'Aryan'} Sharma</p>
              <p className="text-[11px] text-[#8B92A5] truncate">Eco Scholar</p>
            </div>
            <ChevronDown size={16} className="text-[#4B5563] group-hover:text-[#8B92A5]" />
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#0B0F19] border border-[#1F2937] rounded-xl text-[#4B5563]">
            <Search size={15} />
            <span className="text-[12px]">Search</span>
            <span className="ml-auto text-[10px] bg-[#1A1F2E] border border-[#1F2937] px-1.5 py-0.5 rounded text-[#4B5563]">⌘K</span>
          </div>
        </div>

        {/* Main Nav */}
        <div className="px-3 flex-1">
          <p className="px-4 text-[10px] font-semibold text-[#4B5563] uppercase tracking-[0.15em] mb-2 mt-2">Main</p>
          <nav className="space-y-0.5">
            {mainNav.map(item => (
              <NavLink key={item.to} {...item} active={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))} />
            ))}
          </nav>

          <p className="px-4 text-[10px] font-semibold text-[#4B5563] uppercase tracking-[0.15em] mb-2 mt-6">Resources</p>
          <nav className="space-y-0.5">
            {guideNav.map(item => (
              <NavLink key={item.to} {...item} active={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))} />
            ))}
          </nav>
        </div>

        {/* Promo Card */}
        <div className="p-3 mt-auto">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#4F6EF7]/20 to-[#22D3EE]/10 border border-[#4F6EF7]/20">
            <p className="text-sm font-semibold text-white mb-1">Unlock Pro features</p>
            <p className="text-[11px] text-[#8B92A5] mb-4">Complete 5 more missions</p>
            <button className="w-full py-2 bg-[#1A1F2E] border border-[#1F2937] rounded-xl text-[12px] font-semibold text-white hover:bg-[#252B3B] transition-colors flex items-center justify-center gap-2">
              <Zap size={14} className="text-[#FBBF24]" /> Level Up
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 sticky top-0 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-[#1F2937] z-40">
          <h2 className="text-lg font-semibold text-white capitalize">
            {location.pathname.replace('/', '') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-[#1A1F2E] transition-colors text-[#8B92A5] hover:text-white">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0B0F19]" />
            </button>
            <button className="p-2 rounded-xl hover:bg-[#1A1F2E] transition-colors text-[#8B92A5] hover:text-white">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Page */}
        <div className="p-8 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </main>

      <GaiaCommand />
    </div>
  );
}
