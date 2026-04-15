// @ts-nocheck
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Heatmap from './pages/Heatmap';
import LoginPage from './pages/LoginPage';
import CitizenDashboard from './pages/CitizenDashboard';

function App() {
  // Helper functions to check auth status dynamically from the "storage locker"
  const isCitizen = () => !!localStorage.getItem('citizenName');
  const isAdmin = () => !!localStorage.getItem('adminId');

  return (
    <BrowserRouter basename="/panchayat-tourism-system">
      <Routes>
        {/* 1. Public Entry: Now checks for existing sessions */}
        <Route 
          path="/" 
          element={
            isCitizen() ? <Navigate to="/CitizenDashboard" replace /> : 
            isAdmin() ? <Navigate to="/dashboard" replace /> : 
            <LoginPage />
          } 
        />

        {/* 2. Citizen Route: Protected from unauthorized access */}
        <Route 
          path="/CitizenDashboard" 
          element={isCitizen() ? <CitizenDashboard /> : <Navigate to="/" replace />} 
        />

        {/* 3. Admin Routes: Nested under DashboardLayout with Auth Guard */}
        <Route 
          path="/dashboard" 
          element={
            isAdmin() ? (
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Dashboard />} /> 
          <Route path="heatmap" element={<Heatmap />} />
          {/* Ensure your solved issues route is also here if needed */}
          <Route path="issues" element={<div>Solved Issues Content</div>} />
        </Route>

        {/* 4. Fallback: Catch-all redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;