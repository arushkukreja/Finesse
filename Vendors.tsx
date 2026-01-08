
import React, { useState } from 'react';
import { MOCK_VENDORS } from '../constants';
import { Vendor } from '../types';

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);

  const toggleVerification = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, verified: !v.verified } : v));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Vendor Trust List</h2>
          <p className="text-slate-500">Management of whitelisted payment destinations.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20">
          + Add New Trusted Vendor
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-3xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Verified Partners</p>
          <p className="text-2xl font-bold text-emerald-400">{vendors.filter(v => v.verified).length}</p>
        </div>
        <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-3xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Untrusted Entities</p>
          <p className="text-2xl font-bold text-red-400">{vendors.filter(v => !v.verified).length}</p>
        </div>
        <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-3xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Risk Coverage</p>
          <p className="text-2xl font-bold text-slate-200">92.4%</p>
        </div>
        <div className="bg-slate-800/20 border border-slate-800 p-6 rounded-3xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Blocked Leaks</p>
          <p className="text-2xl font-bold text-indigo-400">14</p>
        </div>
      </div>

      <div className="bg-slate-800/20 border border-slate-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800/40 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Vendor Identity</th>
              <th className="px-6 py-4">Security Status</th>
              <th className="px-6 py-4">Sentiment Score</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4">Total Outbound</th>
              <th className="px-6 py-4 text-right">Operational Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {vendors.map(vendor => (
              <tr key={vendor.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400">
                      {vendor.name[0]}
                    </div>
                    <span className="font-bold text-slate-200">{vendor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                    vendor.verified ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'
                  }`}>
                    {vendor.verified ? 'Verified' : 'Review Required'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${vendor.trustScore > 80 ? 'bg-emerald-500' : vendor.trustScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
                        style={{ width: `${vendor.trustScore}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{vendor.trustScore}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-xs text-slate-400">{vendor.lastPaymentDate}</td>
                <td className="px-6 py-5 text-sm font-mono text-slate-200">${vendor.totalVolume.toLocaleString()}</td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => toggleVerification(vendor.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      vendor.verified 
                        ? 'text-red-400 border-red-500/30 hover:bg-red-500/10' 
                        : 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
                    }`}
                  >
                    {vendor.verified ? 'Revoke Trust' : 'Approve Vendor'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
