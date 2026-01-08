
import React from 'react';
import { MOCK_ACCOUNTS } from '../constants';

const Accounts: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-white tracking-tight">Linked Entities</h1>
        <p className="text-sm text-slate-400">Review health and balance metrics for all connected banking platforms</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_ACCOUNTS.map(acc => (
          <div key={acc.account_id} className="bg-slate-800/30 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all shadow-sm group">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700 text-xl shadow-inner group-hover:border-indigo-500/30 transition-all">
                  🏦
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{acc.account_name}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{acc.official_account_name}</p>
                </div>
              </div>
              <div className="text-right">
                 <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-bold uppercase tracking-widest">
                  Live Sync
                </span>
                <p className="text-[10px] text-slate-600 mt-2 font-mono">ID: {acc.account_id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Available</p>
                <p className="text-xl font-bold text-white tracking-tight">${acc.account_balance_available.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Current Ledger</p>
                <p className="text-xl font-bold text-slate-200 tracking-tight">${acc.account_balance_current.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
               <div className="flex gap-2">
                 <span className="text-[10px] text-slate-500 uppercase font-bold">Mask:</span>
                 <span className="text-[10px] text-slate-300 font-mono">**** {acc.account_mask}</span>
               </div>
               <div className="flex gap-4">
                 <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">History</button>
                 <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">Manage</button>
               </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-all cursor-pointer">
           <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-all shadow-inner">➕</div>
           <h4 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">Add Financial Entity</h4>
           <p className="text-xs text-slate-500 max-w-[200px] mt-2">Connect a new bank account or credit facility via Plaid.</p>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
