import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { 
  Users, 
  Leaf, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, trend, link }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-eco-green/30 transition-all duration-300 relative overflow-hidden">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 blur-2xl ${color}`} />
    
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-white/40 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2 text-xs font-medium text-eco-green">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}% from last week
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${color.replace('bg-', 'bg-')}/10 text-${color.replace('bg-', '')}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    
    {link && (
      <button className="mt-4 text-xs text-white/40 hover:text-white flex items-center transition-colors">
        View details <ArrowUpRight className="ml-1 w-3 h-3" />
      </button>
    )}
  </div>
);

const DashboardPage = () => {
  // Mock data for charts - in real app these would come from APIs
  const studentData = [
    { name: 'Aryan', points: 1240 },
    { name: 'Sanya', points: 1100 },
    { name: 'Rahul', points: 980 },
    { name: 'Priya', points: 850 },
    { name: 'Ishaan', points: 720 },
    { name: 'Ananya', points: 650 },
    { name: 'Kabir', points: 590 },
    { name: 'Zoya', points: 450 },
  ];

  const pointTrends = [
    { day: 'Mon', points: 400 },
    { day: 'Tue', points: 300 },
    { day: 'Wed', points: 500 },
    { day: 'Thu', points: 280 },
    { day: 'Fri', points: 590 },
    { day: 'Sat', points: 820 },
    { day: 'Sun', points: 450 },
  ];

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // In a real implementation, we'd have a specific stats endpoint
      // For now, let's mock or fetch from multiple endpoints
      // const [users, points] = await Promise.all([
      //   client.get('/users/'),
      //   client.get('/challenges/my-points/'), // This is wrong for admin, should be global
      // ]);
      return {
        totalStudents: 412,
        pointsThisWeek: 8450,
        completedToday: 24,
        pendingApprovals: 7
      };
    }
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Environment Overview</h1>
        <p className="text-white/40 mt-1">Real-time impact tracking for DPS Bhopal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats?.totalStudents} 
          icon={Users} 
          color="bg-blue-500" 
          trend={12}
        />
        <StatCard 
          title="Eco Points This Week" 
          value={stats?.pointsThisWeek} 
          icon={Leaf} 
          color="bg-eco-green" 
          trend={18}
        />
        <StatCard 
          title="Completed Today" 
          value={stats?.completedToday} 
          icon={CheckCircle2} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Pending Approvals" 
          value={stats?.pendingApprovals} 
          icon={AlertCircle} 
          color="bg-eco-coral" 
          link="/submissions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Students Bar Chart */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Top Performing Students</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-white/50 focus:outline-none focus:ring-1 focus:ring-eco-green">
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F120C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#E8573A' }}
                />
                <Bar 
                  dataKey="points" 
                  fill="#E8573A" 
                  radius={[6, 6, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Line Chart */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white tracking-tight">Points Growth Trend</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[10px] text-white/40 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-eco-green mr-2" />
                Impact
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pointTrends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F120C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#2D5A27" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPoints)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
