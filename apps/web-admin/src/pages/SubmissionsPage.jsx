import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Image as ImageIcon
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { MOCK_SUBMISSIONS } from '../lib/mockData';

import { toast } from 'react-hot-toast';

const SubmissionsPage = () => {
  const [filter, setFilter] = useState('pending');
  const [submissions, setSubmissions] = useState(() => {
    try { 
      const saved = sessionStorage.getItem('ecolearn_submissions');
      return saved ? JSON.parse(saved) : MOCK_SUBMISSIONS; 
    } catch { return MOCK_SUBMISSIONS; }
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredSubmissions = submissions.filter(s => filter === 'all' || s.status === filter);

  const handleApprove = (id) => {
    const next = submissions.map(s => s.id === id ? { ...s, status: 'approved' } : s);
    setSubmissions(next);
    sessionStorage.setItem('ecolearn_submissions', JSON.stringify(next));
    toast.success('Submission approved! +XP awarded.', { icon: '✅' });
  };

  const handleReject = () => {
    if (!rejectionReason) return;
    const next = submissions.map(s => s.id === selectedSubmission.id ? { ...s, status: 'rejected' } : s);
    setSubmissions(next);
    sessionStorage.setItem('ecolearn_submissions', JSON.stringify(next));
    toast.error('Submission rejected. Feedback sent.', { icon: '❌' });
    setShowRejectModal(false);
    setSelectedSubmission(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Submission Review</h1>
          <p className="text-white/40 mt-1">Review and validate student environmental actions</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {['pending', 'approved', 'rejected', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                filter === tab 
                  ? 'bg-eco-green text-white shadow-lg shadow-eco-green/20' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
          <Clock className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">All caught up!</h3>
          <p className="text-white/40 mt-2">There are no {filter} submissions to review right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredSubmissions.map((sub) => (
            <div key={sub.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-white/20 transition-all duration-300 flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden bg-eco-dark">
                {sub.proof_image_url ? (
                  <img src={sub.proof_image_url} alt="Proof" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-white/10 w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white/80 font-bold uppercase tracking-wider">
                  {sub.challenge.category}
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight mb-1">{sub.challenge.title}</h4>
                      <p className="text-sm text-eco-green font-medium mb-3">+{sub.challenge.points_reward} Eco Points</p>
                    </div>
                    <div className="text-[10px] text-white/30 flex items-center bg-white/5 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(sub.submitted_at))} ago
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/5">
                      {sub.user.first_name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{sub.user.first_name} {sub.user.last_name}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Student @ DPS Bhopal</p>
                    </div>
                  </div>
                </div>

                {sub.status === 'pending' ? (
                  <div className="flex items-center space-x-3 border-t border-white/5 pt-4 mt-2">
                    <button 
                      onClick={() => handleApprove(sub.id)}
                      className="flex-1 bg-eco-green/10 hover:bg-eco-green text-eco-green hover:text-white border border-eco-green/20 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center group/btn"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Approve
                    </button>
                    <button 
                      onClick={() => { setSelectedSubmission(sub); setShowRejectModal(true); }}
                      className="flex-1 bg-eco-coral/10 hover:bg-eco-coral text-eco-coral hover:text-white border border-eco-coral/20 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center group/btn"
                    >
                      <XCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className={`mt-4 pt-4 border-t border-white/5 flex items-center ${sub.status === 'approved' ? 'text-eco-green' : 'text-eco-coral'}`}>
                    {sub.status === 'approved' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                    <span className="text-sm font-bold uppercase tracking-widest">{sub.status}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRejectModal(false)} />
          <div className="bg-[#1F120C] border border-white/10 w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Reject Submission</h3>
            <p className="text-white/40 text-sm mb-6">Briefly explain why this submission is being rejected. The student will see this reason.</p>
            
            <textarea 
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-eco-coral transition-all h-32 mb-6"
              placeholder="e.g. Photo is too blurry, please retake."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-3 text-white/50 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectionReason}
                className="flex-1 bg-eco-coral text-white font-bold py-3 rounded-xl hover:bg-eco-coral/90 transition-all disabled:opacity-50"
              >
                Confirm Rejection
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

export default SubmissionsPage;
