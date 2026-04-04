import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, Map as MapIcon, CheckCircle, LogOut, Leaf } from 'lucide-react';

const CitizenDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: PlusCircle, label: 'Report Issue', path: '/citizen/report' },
    { icon: MapIcon, label: 'Heatmap', path: '/citizen/heatmap' },
    { icon: CheckCircle, label: 'Issue Solved', path: '/citizen/solved' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden flex-col md:flex-row">
      
      {/* DESKTOP SIDEBAR (Visible only on md: screens and up) */}
      <aside className="hidden md:flex w-72 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-900 text-white flex-col shadow-2xl">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Citizen<span className="font-light opacity-80">Portal</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-white/20 shadow-lg border border-white/10' : 'hover:bg-white/5 opacity-70'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-500/20 text-emerald-100 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV (Visible only on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center py-3 z-50 shadow-lg">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label} 
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 shrink-0">
          <h2 className="text-gray-900 font-black text-lg md:text-xl truncate">
            {menuItems.find(i => i.path === location.pathname)?.label || 'Citizen Portal'}
          </h2>
          <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">M</div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-10 pb-24 md:pb-10 bg-slate-50/50">
          <div className="max-w-2xl mx-auto w-full">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CitizenDashboardLayout;