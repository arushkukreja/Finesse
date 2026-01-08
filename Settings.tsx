
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Account Intelligence</h1>
        <p className="text-sm text-slate-400">Manage your profile, security protocols, and subscription tier</p>
      </header>

      <div className="space-y-12 divide-y divide-slate-800">
        <section className="pt-0 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-bold text-white">Profile Details</h3>
             <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Update</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Organization Name</label>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 font-medium">Bob's Supplies LLC</div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Primary Security Officer</label>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 font-medium">Bob Smith</div>
            </div>
          </div>
        </section>

        <section className="pt-12 space-y-8">
           <h3 className="text-lg font-bold text-white">Subscription & Billing</h3>
           <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="space-y-1">
               <p className="text-xs text-indigo-400 font-black uppercase tracking-widest">Current Tier</p>
               <p className="text-3xl font-black text-white">Free Starter</p>
               <p className="text-xs text-slate-400">Next billing cycle: June 1, 2024</p>
             </div>
             <div className="flex gap-4 w-full md:w-auto">
               <button className="flex-1 md:flex-none px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all">Upgrade Plan</button>
               <button className="flex-1 md:flex-none px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all">View Invoices</button>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Available Credits</p>
                <p className="text-2xl font-bold text-white">2,450 <span className="text-xs font-medium text-slate-500">Tokens</span></p>
                <div className="mt-4 w-full bg-slate-900 h-1.5 rounded-full">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">API Key Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-slate-200">Active Production Key</p>
                </div>
              </div>
           </div>
        </section>

        <section className="pt-12 space-y-6">
          <h3 className="text-lg font-bold text-white">Security & Protocols</h3>
          <div className="space-y-4">
            <button className="w-full text-left bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex justify-between items-center group hover:border-slate-700 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-xl">🔑</span>
                <div>
                  <p className="text-sm font-bold text-slate-200">Reset System Password</p>
                  <p className="text-xs text-slate-500">Requires multi-factor confirmation</p>
                </div>
              </div>
              <span className="text-slate-600 group-hover:text-slate-400">➔</span>
            </button>
            <button className="w-full text-left bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex justify-between items-center group hover:border-slate-700 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-sm font-bold text-slate-200">MFA Settings</p>
                  <p className="text-xs text-slate-500">Current status: Authenticator App Enabled</p>
                </div>
              </div>
              <span className="text-slate-600 group-hover:text-slate-400">➔</span>
            </button>
          </div>
        </section>

        <section className="pt-12 pb-12">
           <button className="w-full py-4 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/5 transition-all text-sm uppercase tracking-widest">Sign Out of Session</button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
