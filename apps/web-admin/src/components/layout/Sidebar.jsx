import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Trophy,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import clsx from "clsx";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: ClipboardCheck, label: "Submissions", path: "/submissions" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1F120C] border-r border-white/5 flex flex-col fixed left-0 top-0">
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-eco-green rounded-lg flex items-center justify-center">
            <Trophy className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            EcoLearn
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
                isActive
                  ? "bg-eco-green/10 text-eco-green border border-eco-green/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="p-4 mx-4 mb-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-eco-green/20 rounded-full flex items-center justify-center text-eco-green font-bold">
              {user.first_name?.[0] || user.username?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {user.first_name || user.username}
              </p>
              <p className="text-[10px] text-white/40 truncate uppercase tracking-widest">
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 text-xs text-eco-coral/70 hover:text-eco-coral hover:bg-eco-coral/10 rounded-lg transition-all"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
