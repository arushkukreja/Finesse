
import React, { useState } from 'react';
import { Alert, AlertSeverity, AlertStatus } from '../types';
import TransactionDetail from './TransactionDetail';

interface Props {
  alert: Alert;
  onAction: (id: string, status: AlertStatus) => void;
}

const AlertCard: React.FC<Props> = ({ alert, onAction }) => {
  const [showMetadata, setShowMetadata] = useState(false);
  const isCritical = alert.severity === AlertSeverity.CRITICAL;
  const isWarning = alert.severity === AlertSeverity.WARNING;

  return (
    <div className={`rounded-xl border transition-all ${
      isCritical ? 'bg-red-500/5 border-red-500/30 shadow-lg shadow-red-950/20' : 
      isWarning ? 'bg-amber-500/5 border-amber-500/30' : 
      'bg-slate-800/40 border-slate-700/50'
    } p-5 group`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isCritical ? 'bg-red-500/20 text-red-500' : 
            isWarning ? 'bg-amber-500/20 text-amber-500' : 
            'bg-blue-500/20 text-blue-500'
          }`}>
            {isCritical ? '🚨' : isWarning ? '⚠️' : 'ℹ️'}
          </div>
          <div>
            <h3 className="font-bold text-slate-100">{alert.type}</h3>
            <p className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleString()}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-100">${alert.transaction.transaction_amount.toFixed(2)}</p>
          <p className="text-xs text-slate-400 font-mono truncate max-w-[120px]">{alert.transaction.merchant_name}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-slate-600 pl-3">
          {alert.description}
        </p>
      </div>

      <div className="bg-slate-900/60 rounded-lg p-4 mb-4 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Digital Auditor Insight</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          {alert.aiExplanation}
        </p>
      </div>

      <button 
        onClick={() => setShowMetadata(!showMetadata)}
        className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 hover:text-slate-300 transition-colors flex items-center gap-1"
      >
        {showMetadata ? '▼ Hide Plaid Metadata' : '▶ View Plaid Metadata'}
      </button>

      {showMetadata && <TransactionDetail transaction={alert.transaction} />}

      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onAction(alert.id, AlertStatus.SAFE)}
          className="flex-1 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-sm font-bold transition-all border border-emerald-500/30"
        >
          Dismiss (Safe)
        </button>
        <button 
          onClick={() => onAction(alert.id, AlertStatus.FRAUD)}
          className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-lg shadow-red-900/20"
        >
          Flag Fraud
        </button>
      </div>
    </div>
  );
};

export default AlertCard;
