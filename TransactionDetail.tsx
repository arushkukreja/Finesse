
import React from 'react';
import { PlaidTransaction } from '../types';

interface Props {
  transaction: PlaidTransaction;
}

const TransactionDetail: React.FC<Props> = ({ transaction }) => {
  return (
    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/50 mt-4 overflow-hidden">
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
        Plaid Raw Metadata
      </h4>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Transaction ID</p>
          <p className="text-xs font-mono text-slate-300 truncate">{transaction.transaction_id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Auth Date</p>
          <p className="text-xs text-slate-300">{transaction.authorized_date}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Category Detailed</p>
          <p className="text-xs text-indigo-300 font-medium">{transaction.category_detailed}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Payment Channel</p>
          <p className="text-xs text-slate-300 capitalize">{transaction.payment_channel}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Account</p>
          <p className="text-xs text-slate-300">{transaction.account_name} ({transaction.account_official_name})</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase">Location</p>
          <p className="text-xs text-slate-300">{transaction.city}, {transaction.country}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
