import { useState } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { MOCK_STUDENTS } from '../lib/mockData';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'eco_points_total', direction: 'desc' });

  const students = MOCK_STUDENTS;

  const sortedStudents = [...(students || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  }).filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Student Directory</h1>
          <p className="text-white/40 mt-1">Manage and track individual student environmental performance</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-eco-green transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Student</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('class_grade')}>
                  Class <ArrowUpDown className="inline w-3 h-3 ml-1" />
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('eco_points_total')}>
                  Points <ArrowUpDown className="inline w-3 h-3 ml-1" />
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Challenges</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green font-bold border border-eco-green/20">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{student.name}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Student ID: ECO-{student.id}932</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/60 font-mono">
                      {student.class_grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-eco-green font-bold">
                      <Leaf className="w-3 h-3 mr-1.5" />
                      {student.eco_points_total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">
                    {student.challenges_done} tasks
                  </td>
                  <td className="px-6 py-4 text-xs text-white/40">
                    {new Date(student.last_active).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <p className="text-xs text-white/20">Showing {sortedStudents.length} of {students.length} students</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/20 hover:text-white cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/20 hover:text-white cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
