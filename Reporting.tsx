
import React, { useState } from 'react';
import { MOCK_REPORTS } from '../constants';
import { ReportSchedule } from '../types';

const Reporting: React.FC = () => {
  const [schedules, setSchedules] = useState<ReportSchedule[]>(MOCK_REPORTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSchedule = (id: string) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Report Automation</h1>
          <p className="text-sm text-slate-400">Schedule intelligence delivery to your stakeholders</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/10"
        >
          + New Schedule
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map(s => (
          <div key={s.id} className="bg-slate-800/40 border border-slate-800 rounded-3xl p-6 flex flex-col shadow-sm group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-700/50 group-hover:border-indigo-500/30 transition-all">
                <span className="text-2xl">{s.format === 'pdf' ? '📄' : '📊'}</span>
              </div>
              {/* Corrected toggle switch: ON = Right, OFF = Left */}
              <div 
                onClick={() => toggleSchedule(s.id)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${s.active ? 'bg-indigo-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${s.active ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
            <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-4">{s.frequency} delivery</p>
            
            <div className="flex-1 space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="opacity-60">To:</span>
                <span className="text-indigo-300 font-medium truncate">{s.recipients[0]}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="opacity-60">Includes:</span>
                <span className="text-slate-300">Spending, Alerts, Risks</span>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors">Edit</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-indigo-900/40 hover:text-indigo-300 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors">Test</button>
            </div>
          </div>
        ))}

        <div className="bg-slate-800/10 border border-slate-800 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-800/20 transition-all group">
           <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">➕</div>
           <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200">Custom Ad-hoc Report</p>
           <p className="text-[10px] text-slate-600 mt-2">Generate a one-time export in CSV or PDF format.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#111827] border border-[#1f2937] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">New Report Schedule</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Report Title</label>
                  <input className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Monthly Risk Summary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Frequency</label>
                    <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Format</label>
                    <select className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all">
                      <option>PDF (Document)</option>
                      <option>CSV (Spreadsheet)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Delivery Recipient</label>
                  <input className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all" placeholder="email@company.com" />
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-slate-800 bg-slate-900/30 flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95">Create Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reporting;
