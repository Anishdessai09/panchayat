import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Map as MapIcon, CheckCircle, LogOut, Leaf, LayoutDashboard } from 'lucide-react';

const CitizenDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Removed "Report Issue" from this array to clean up the UI
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/citizen/dashboard' },
    { icon: MapIcon, label: 'Heatmap', path: '/citizen/heatmap' },
    { icon: CheckCircle, label: 'Issue Solved', path: '/citizen/solved' },
  ];

  return (
    <div className="flex h-screen items-center bg-slate-50 font-sans overflow-hidden flex-col md:flex-row">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-80 h-[97vh] ml-4 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-900 text-white flex-col shadow-2xl rounded-3xl">
        <div className="p-8 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">CITIZEN<span className="font-light opacity-80 uppercase">portal</span></span>
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
                <span className="font-bold text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-500/20 text-emerald-100 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm tracking-widest uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-2 left-2 right-2 border-gray-100 backdrop-blur-xl rounded-2xl flex justify-around items-center py-3 z-50 shadow-xl">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={item.label} 
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-600' : 'text-black-400'}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 top-2 md:h-20 bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 shrink-0 mt-5 rounded-2xl">
          <h2 className="text-gray-900 font-black text-lg md:text-xl truncate">
            {menuItems.find(i => i.path === location.pathname)?.label || 'REPORT ISSUE'}
          </h2>
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm overflow-hidden">
            <img 
              src="https://t3.ftcdn.net/jpg/00/65/75/68/360_F_65756860_GUZwzOKNMUU3HldFoIA44qss7ZIrCG8I.jpg" 
              className="object-cover w-full h-full border-2 border-emerald-500 rounded-full shadow-inner"
              alt="User"
            />
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-4 md:p-10 pb-24 md:pb-10 bg-slate-50/50">
          <div className="max-w-3xl mx-auto w-full">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CitizenDashboardLayout;