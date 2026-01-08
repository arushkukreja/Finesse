
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', path: '/', icon: '◰' },
    { name: 'Risk Alerts', path: '/alerts', icon: '⚡' },
    { name: 'Accounts', path: '/accounts', icon: '🏦' },
    { name: 'Transactions', path: '/transactions', icon: '⧉' },
    { name: 'Rule Engine', path: '/rules', icon: '⚙️' },
    { name: 'Reporting', path: '/reporting', icon: '📊' },
    { name: 'Pricing', path: '/pricing', icon: '💎' },
  ];

  return (
    <div className="w-64 h-screen bg-[#111827] border-r border-[#1f2937] flex flex-col fixed left-0 top-0 z-50">
      <div className="px-6 py-8">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-500/20 font-black">S</div>
          Sentinella
        </h1>
      </div>
      
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="mb-4">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Platform</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium ${
                      isActive 
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="text-lg opacity-80 leading-none">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4">
        <Link to="/settings" className="block">
          <div className={`bg-slate-800/40 rounded-xl p-4 border transition-all hover:bg-slate-800/60 ${
            location.pathname === '/settings' ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-slate-700/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 ring-2 ring-slate-800">
                BS
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-100 truncate">Bob's Supplies</p>
                <p className="text-[10px] text-slate-500 font-medium">Settings & Billing</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
