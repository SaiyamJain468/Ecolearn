import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import MissionsPage from './pages/MissionsPage';
import LearnPage from './pages/LearnPage';
import RankingsPage from './pages/RankingsPage';
import BadgesPage from './pages/BadgesPage';
import AccountPage from './pages/AccountPage';
import ImpactMapPage from './pages/ImpactMapPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NexusPage from './pages/NexusPage';
import CareerPathPage from './pages/CareerPathPage';
import SubmissionsPage from './pages/SubmissionsPage';
import StudentsPage from './pages/StudentsPage';
import ProPage from './pages/ProPage';
import PrimeDashboardPage from './pages/PrimeDashboardPage';
import AlertsPage from './pages/AlertsPage';
import HelpDeskPage from './pages/HelpDeskPage';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="badges" element={<BadgesPage />} />
          <Route path="profile" element={<AccountPage />} />
          <Route path="map" element={<ImpactMapPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="nexus" element={<NexusPage />} />
          <Route path="career" element={<CareerPathPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="pro" element={<ProPage />} />
          <Route path="prime" element={<PrimeDashboardPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="help" element={<HelpDeskPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" toastOptions={{ 
        style: { background: '#131B2E', color: '#fff', border: '1px solid rgba(0, 242, 254, 0.2)', fontSize: '13px', fontWeight: '500' }
      }} />
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
