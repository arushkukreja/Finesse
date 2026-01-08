
import React, { useState } from 'react';
import { MOCK_ALERTS } from '../constants';
import { Alert, AlertStatus, PlaidTransaction } from '../types';

const TransactionModal: React.FC<{ alert: Alert; onClose: () => void; onReview: (status: AlertStatus, comments: string) => void }> = ({ alert, onClose, onReview }) => {
  const [comment, setComment] = useState('');
  const t = alert.transaction;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#111827] border border-[#1f2937] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Review Transaction</h3>
            <p className="text-xs text-slate-400 mt-1">Transaction ID: {t.transaction_id}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Core Data</h4>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-sm text-slate-500">Merchant</span>
                  <span className="text-sm font-bold text-white">{t.merchant_name || t.transaction_name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-sm text-slate-500">Amount</span>
                  <span className="text-sm font-bold text-white">${t.transaction_amount.toFixed(2)} {t.currency}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-sm text-slate-500">Date</span>
                  <span className="text-sm font-bold text-white">{t.transaction_date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-sm text-slate-500">Account</span>
                  <span className="text-sm font-bold text-white">{t.account_name}</span>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Enrichment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Channel</p>
                  <p className="text-xs font-medium text-slate-200 capitalize">{t.payment_channel}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Confidence</p>
                  <p className="text-xs font-medium text-slate-200">{Math.round(t.category_confidence * 100)}%</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
             <section className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl">
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Auditor Rationale</h4>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{alert.aiExplanation}"
              </p>
            </section>

            <section>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Internal Comments</h4>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add audit notes here..."
                className="w-full h-32 bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none resize-none"
              />
            </section>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 flex gap-4 bg-slate-900/30">
          <button 
            onClick={() => onReview(AlertStatus.FRAUD, comment)}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all"
          >
            Mark as Fraud
          </button>
          <button 
            onClick={() => onReview(AlertStatus.SAFE, comment)}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
          >
            Mark as Safe
          </button>
        </div>
      </div>
    </div>
  );
};

const RiskAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const handleReview = (status: AlertStatus, comment: string) => {
    if (!selectedAlert) return;
    setAlerts(prev => prev.filter(a => a.id !== selectedAlert.id));
    setSelectedAlert(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-white">Risk Intelligence</h1>
        <p className="text-sm text-slate-400">Transactions requiring manual intervention based on active rule engine</p>
      </header>

      <div className="bg-slate-800/20 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-900/40 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-6 py-4">
          <div className="col-span-1">Severity</div>
          <div className="col-span-4">Entity / Transaction</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">Flag Type</div>
          <div className="col-span-2 text-right">Review</div>
        </div>
        
        <div className="divide-y divide-slate-800">
          {alerts.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <p className="text-4xl">✨</p>
              <h3 className="text-lg font-bold text-white">All Clear</h3>
              <p className="text-sm text-slate-500">No transactions currently flagged for review.</p>
              <button onClick={() => setAlerts(MOCK_ALERTS)} className="text-xs font-bold text-indigo-400 hover:underline mt-4">Reset Demo Data</button>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="grid grid-cols-12 px-6 py-5 items-center hover:bg-slate-800/30 transition-colors cursor-pointer group" onClick={() => setSelectedAlert(alert)}>
                <div className="col-span-1">
                  <div className={`w-2 h-2 rounded-full ${alert.severity === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-amber-500'}`}></div>
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs">
                    {alert.transaction.category_icon || '💳'}
                  </div>
                  <div className="truncate pr-4">
                    <p className="text-sm font-bold text-slate-100 truncate group-hover:text-indigo-400">{alert.transaction.merchant_name || alert.transaction.transaction_name}</p>
                    <p className="text-[10px] text-slate-500">{alert.transaction.account_name}</p>
                  </div>
                </div>
                <div className="col-span-2 text-sm font-mono font-bold text-white">
                  ${alert.transaction.transaction_amount.toFixed(2)}
                </div>
                <div className="col-span-3">
                  <span className="text-[10px] font-bold bg-slate-900 border border-slate-700 px-2 py-1 rounded-md text-slate-300">
                    {alert.type}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <button className="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-900/20">
                    Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedAlert && (
        <TransactionModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
          onReview={handleReview}
        />
      )}
    </div>
  );
};

export default RiskAlerts;
