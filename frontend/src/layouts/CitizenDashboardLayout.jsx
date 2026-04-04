import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  Map as MapIcon, 
  CheckCircle, 
  LogOut, 
  Leaf 
} from 'lucide-react';

const CitizenDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: PlusCircle, label: 'Report Issue', path: '/citizen/report' },
    { icon: MapIcon, label: 'Heatmap', path: '/citizen/heatmap' },
    { icon: CheckCircle, label: 'Issues Solved', path: '/citizen/solved' },
  ];

return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      
      {/* SIDEBAR: Hidden on mobile (hidden), shown on desktop (md:flex) */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-emerald-500 via-emerald-700 to-teal-900 text-white flex-col shadow-2xl">
        {/* ... (Your Sidebar Content) ... */}
      </aside>

      {/* MOBILE BOTTOM NAV: Shown only on mobile (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50">
        {menuItems.map((item) => (
          <button 
            key={item.label} 
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 text-emerald-600"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden pb-16 md:pb-0">
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center px-6 md:px-10">
          <h2 className="text-gray-800 font-extrabold text-lg md:text-xl tracking-tight">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Portal'}
          </h2>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CitizenDashboardLayout;