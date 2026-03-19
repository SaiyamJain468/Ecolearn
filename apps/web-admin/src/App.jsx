import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MissionsPage from './pages/MissionsPage';
import LearnPage from './pages/LearnPage';
import RankingsPage from './pages/RankingsPage';
import BadgesPage from './pages/BadgesPage';
import ProfilePage from './pages/ProfilePage';
import ImpactMapPage from './pages/ImpactMapPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NexusPage from './pages/NexusPage';
import CareerPathPage from './pages/CareerPathPage';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="badges" element={<BadgesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="map" element={<ImpactMapPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="nexus" element={<NexusPage />} />
          <Route path="career" element={<CareerPathPage />} />
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
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
