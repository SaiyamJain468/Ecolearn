import { motion } from "framer-motion";
import { Trophy, Medal, School, TrendingUp, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MOCK_LEADERBOARD } from "../lib/mockData";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const LeaderboardPage = () => {
  const schools = MOCK_LEADERBOARD;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Global Leaderboard
          </h1>
          <p className="text-white/40 mt-1">
            Inter-school environmental impact rankings
          </p>
        </div>

        <div className="flex items-center space-x-3 px-4 py-2 bg-eco-green/10 border border-eco-green/20 rounded-2xl">
          <Trophy className="text-eco-green w-5 h-5" />
          <div>
            <p className="text-[10px] text-eco-green font-bold uppercase tracking-widest leading-none">
              Your School Rank
            </p>
            <p className="text-xl font-bold text-white leading-tight">
              #1{" "}
              <span className="text-xs font-normal text-white/40 ml-1">
                Overall
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-8">
            Inter-School Points Comparison
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <BarChart
                data={schools}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,0.8)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  width={140}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{
                    backgroundColor: "#1F120C",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="points"
                  radius={[0, 8, 8, 0]}
                  barSize={32}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {schools.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-white px-2">
            School Standings
          </h3>
          {schools.map((school, index) => (
            <motion.div
              variants={fadeUp}
              key={school.name}
              className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-white/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                    index === 0
                      ? "bg-yellow-500/10 text-yellow-500"
                      : index === 1
                        ? "bg-gray-400/10 text-gray-400"
                        : index === 2
                          ? "bg-orange-500/10 text-orange-500"
                          : "bg-white/5 text-white/40"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {school.name}
                  </h4>
                  <div className="flex items-center text-[10px] text-white/30 uppercase tracking-widest mt-1">
                    <Users className="w-3 h-3 mr-1" />
                    {school.students} Students
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-white">
                  {school.points.toLocaleString()}
                </p>
                <div className="flex items-center justify-end text-[10px] text-eco-green font-bold">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1.2k today
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
