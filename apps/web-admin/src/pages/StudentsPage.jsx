import { useState } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X,
  Trophy,
  Target,
  Clock,
  Mail
} from 'lucide-react';
import { MOCK_STUDENTS } from '../lib/mockData';
import { toast } from 'react-hot-toast';

const ITEMS_PER_PAGE = 10;

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'eco_points_total', direction: 'desc' });
  const [page, setPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = MOCK_STUDENTS;

  const sortedStudents = [...(students || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  }).filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(sortedStudents.length / ITEMS_PER_PAGE);
  const pageStudents = sortedStudents.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
    setPage(0);
  };

  const getRank = (points) => {
    if (points >= 3000) return { label: 'Eco Champion', color: '#FBBF24' };
    if (points >= 2000) return { label: 'Green Warrior', color: '#10B981' };
    if (points >= 1000) return { label: 'Eco Scout', color: '#06B6D4' };
    return { label: 'Seedling', color: '#94A3B8' };
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
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
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
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('challenges_done')}>
                  Challenges <ArrowUpDown className="inline w-3 h-3 ml-1" />
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40">Rank</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageStudents.map((student) => {
                const rank = getRank(student.eco_points_total);
                return (
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
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-bold uppercase px-2 py-1 rounded-md" style={{ background: `${rank.color}15`, color: rank.color, border: `1px solid ${rank.color}25` }}>
                        {rank.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all cursor-pointer">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <p className="text-xs text-white/20">Showing {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, sortedStudents.length)} of {sortedStudents.length} students</p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`p-2 bg-white/5 border border-white/10 rounded-lg transition-all ${page === 0 ? 'text-white/10 cursor-not-allowed' : 'text-white/60 hover:text-white cursor-pointer'}`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-bold text-white/40 px-2">Page {page + 1} / {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className={`p-2 bg-white/5 border border-white/10 rounded-lg transition-all ${page >= totalPages - 1 ? 'text-white/10 cursor-not-allowed' : 'text-white/60 hover:text-white cursor-pointer'}`}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
          <div className="bg-[#0D1120] border border-white/10 w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-eco-green/10 flex items-center justify-center text-eco-green text-xl font-bold border-2 border-eco-green/20">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedStudent.name}</h3>
                  <p className="text-xs text-white/40">Class {selectedStudent.class_grade} · ID: ECO-{selectedStudent.id}932</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-white/10 rounded-lg text-white/30 hover:text-white transition-all cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl text-center bg-white/[0.03] border border-white/5">
                <Leaf className="w-5 h-5 text-eco-green mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">{selectedStudent.eco_points_total.toLocaleString()}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest">Eco Points</p>
              </div>
              <div className="p-3.5 rounded-xl text-center bg-white/[0.03] border border-white/5">
                <Target className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">{selectedStudent.challenges_done}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest">Challenges</p>
              </div>
              <div className="p-3.5 rounded-xl text-center bg-white/[0.03] border border-white/5">
                <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white" style={{ color: getRank(selectedStudent.eco_points_total).color }}>{getRank(selectedStudent.eco_points_total).label}</p>
                <p className="text-[9px] text-white/30 uppercase tracking-widest">Rank</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-white/40 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Last Active</span>
                <span className="text-xs font-semibold text-white">{new Date(selectedStudent.last_active).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs text-white/40">XP per Challenge</span>
                <span className="text-xs font-semibold text-eco-green">{selectedStudent.challenges_done > 0 ? Math.round(selectedStudent.eco_points_total / selectedStudent.challenges_done) : 0} avg</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { toast.success(`Viewing ${selectedStudent.name}'s full activity log`, { icon: '📋' }); setSelectedStudent(null); }}
                className="flex-1 bg-eco-green/10 hover:bg-eco-green text-eco-green hover:text-white border border-eco-green/20 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer">
                Activity Log
              </button>
              <button 
                onClick={() => { toast.success(`Message sent to ${selectedStudent.name}`, { icon: '✉️' }); setSelectedStudent(null); }}
                className="flex-1 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-cyan-500/20 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Mail className="w-4 h-4" /> Message
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-in {
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default StudentsPage;
