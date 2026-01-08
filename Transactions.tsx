
import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';

const Transactions: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Financial Ledger</h1>
          <p className="text-sm text-slate-400">Complete transaction history across connected accounts</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search merchants..." 
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none w-64 transition-all"
          />
          <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all">Export CSV</button>
        </div>
      </header>

      <div className="bg-slate-800/20 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Merchant / Entity</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Account</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_TRANSACTIONS.map(t => (
              <tr key={t.transaction_id} className="hover:bg-slate-800/30 transition-all group">
                <td className="px-6 py-5 text-slate-400 font-mono text-xs">{t.transaction_date}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shadow-sm">
                      {t.category_icon || '💳'}
                    </div>
                    <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{t.merchant_name || t.transaction_name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded-md font-bold uppercase tracking-widest">
                    {t.category_primary}
                  </span>
                </td>
                <td className="px-6 py-5 text-slate-400 text-xs">{t.account_name}</td>
                <td className="px-6 py-5 text-right font-bold text-white">
                  <span className={t.transaction_amount < 0 ? 'text-emerald-400' : 'text-slate-100'}>
                    {t.transaction_amount < 0 ? '+' : '-'}${Math.abs(t.transaction_amount).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
