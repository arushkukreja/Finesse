
import React, { useState } from 'react';

const RecoveryHub: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {isFrozen && (
        <div className="fixed inset-0 z-[100] bg-red-950/95 flex items-center justify-center animate-in fade-in duration-500">
          <div className="text-center p-12 border-4 border-red-500 rounded-3xl animate-pulse">
            <h1 className="text-6xl font-black text-white mb-4">SYSTEM FROZEN</h1>
            <p className="text-xl text-red-200 mb-8 font-mono tracking-tighter">PLAID SYNC DISABLED | ACCOUNT ACCESS REVOKED</p>
            <button 
              onClick={() => setIsFrozen(false)}
              className="bg-white text-red-600 font-black px-12 py-4 rounded-xl text-xl hover:bg-red-50 transition-colors"
            >
              LIFT FREEZE (REQUIRES AUTH)
            </button>
          </div>
        </div>
      )}

      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-100">Recovery Hub</h2>
        <p className="text-slate-500">Operational procedures for active fraud containment.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-red-500/5 border border-red-500/30 rounded-3xl p-8 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl rotate-12 group-hover:rotate-0 transition-transform">🛑</div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Emergency Freeze</h3>
          <p className="text-sm text-slate-400 mb-6">Immediately kill all banking sessions and stop pending ACH/Wires across connected accounts.</p>
          <button 
            onClick={() => setIsFrozen(true)}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-xl shadow-red-900/40 uppercase tracking-widest text-xs"
          >
            Execute Kill Switch
          </button>
        </div>

        <div className="bg-indigo-500/5 border border-indigo-500/30 rounded-3xl p-8 group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl rotate-12 group-hover:rotate-0 transition-transform">📞</div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Secure Bank Liaison</h3>
          <p className="text-sm text-slate-400 mb-6">Authenticated communication channels to fraud departments.</p>
          <div className="space-y-3">
            <a href="tel:1-800-CHASE" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-700">
              Chase Security Hotline
            </a>
            <a href="tel:1-800-AMEX" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl flex items-center justify-center gap-2 border border-slate-700">
              Amex Fraud Response
            </a>
          </div>
        </div>
      </div>

      <section className="bg-slate-800/20 border border-slate-800 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-100">Post-Incident Checklist</h3>
          <span className="text-xs font-mono text-indigo-400 font-bold">
            {Object.values(checklist).filter(Boolean).length} / 4 COMPLETED
          </span>
        </div>
        <div className="space-y-4">
          {[
            "Download full transaction CSV for police report",
            "Update MFA on all primary business emails",
            "Reset API keys for integrated accounting software",
            "Notified vendors about potential invoice fraud spoofing"
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleCheck(idx)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                checklist[idx] ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                checklist[idx] ? 'bg-indigo-500 border-indigo-500' : 'border-slate-700'
              }`}>
                {checklist[idx] && <span className="text-white text-xs">✓</span>}
              </div>
              <span className={`text-sm font-medium ${checklist[idx] ? 'text-indigo-200 line-through' : 'text-slate-300'}`}>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecoveryHub;
