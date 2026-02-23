import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
import Login from './pages/Auth/Login';
import GymSignup from './pages/Auth/GymSignup';

import GymDashboard from './pages/Gym/Dashboard';
import UserDashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
const ArmWrestling = React.lazy(() => import('./pages/Competitions/ArmWrestling'));
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, role }: { children: React.JSX.Element, role: 'gym' | 'user' | 'super_admin' }) => {
  const { isAuthenticated, role: userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // If authenticated but trying to access the wrong dashboard
  if (userRole && userRole !== role) {
    if (userRole === 'gym') return <Navigate to="/gym/dashboard" replace />;
    if (userRole === 'user') return <Navigate to="/user/dashboard" replace />;
    if (userRole === 'super_admin') return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/v2" element={<HomeV2 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-gym" element={<GymSignup />} />
      <Route path="/competitions/armwrestling" element={
        <React.Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><Loader className="w-8 h-8 text-[#d4af37] animate-spin" /></div>}>
          <ArmWrestling />
        </React.Suspense>
      } />

      <Route path="/gym/dashboard" element={
        <ProtectedRoute role="gym">
          <GymDashboard />
        </ProtectedRoute>
      } />

      <Route path="/user/dashboard" element={
        <ProtectedRoute role="user">
          <UserDashboard />
        </ProtectedRoute>
      } />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute role="super_admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
