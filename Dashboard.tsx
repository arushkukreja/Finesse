
import React, { useState } from 'react';
import { MOCK_ACCOUNTS, MOCK_ALERTS, MOCK_RULES, MOCK_TRANSACTIONS, TREND_DATA } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const totalBalance = MOCK_ACCOUNTS.reduce((acc, curr) => acc + curr.account_balance_current, 0);
  const unreviewedAlerts = MOCK_ALERTS.length;
  const activeRules = MOCK_RULES.filter(r => r.enabled).length;

  const categoryData = [
    { name: 'Software', value: 4500, color: '#6366f1' },
    { name: 'Travel', value: 1200, color: '#10b981' },
    { name: 'Supplies', value: 3800, color: '#f59e0b' },
    { name: 'Rent', value: 8500, color: '#ec4899' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Financial Overview</h1>
          <p className="text-sm text-slate-400">Aggregated intelligence across all business entities</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-600/10">
            Refresh
          </button>
        </div>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Net Worth</p>
          <p className="text-2xl font-bold text-white">${totalBalance.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-400 font-medium mt-1">+2.4% from last month</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl border-l-red-500/50 border-l-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Open Risk Alerts</p>
          <p className="text-2xl font-bold text-white">{unreviewedAlerts}</p>
          <p className="text-[10px] text-red-400 font-medium mt-1">Requires urgent review</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Rules</p>
          <p className="text-2xl font-bold text-white">{activeRules}</p>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Watching 14 event types</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-800 p-6 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Connected Accounts</p>
          <p className="text-2xl font-bold text-white">{MOCK_ACCOUNTS.length}</p>
          <p className="text-[10px] text-slate-500 font-medium mt-1">Via Plaid Sync</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Trend Graph */}
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-200">Income vs Spending Trends</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Expenses</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="month" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ padding: '2px 0' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-200 mb-6">Spending Category Breakdown</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={80} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-slate-200">Latest Pulse</h3>
                <button className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest hover:underline">Full Feed</button>
              </div>
              <div className="space-y-4">
                {MOCK_TRANSACTIONS.map(t => (
                  <div key={t.transaction_id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-lg">
                        {t.category_icon || '💳'}
                      </div>
                      <div className="max-w-[120px]">
                        <p className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-400 transition-colors">{t.merchant_name || t.transaction_name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-mono">{t.transaction_date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-100">-${t.transaction_amount.toFixed(2)}</p>
                      <p className="text-[9px] text-slate-500 font-medium truncate max-w-[80px]">{t.account_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-200 mb-6 flex justify-between">
              Accounts
              <span className="text-[10px] text-indigo-400 font-black">ACTIVE SYNC</span>
            </h3>
            <div className="space-y-4">
              {MOCK_ACCOUNTS.map(acc => (
                <div key={acc.account_id} className="p-4 bg-slate-900/40 border border-slate-700/30 rounded-xl hover:border-slate-600 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-slate-200">{acc.account_name}</p>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-mono">...{acc.account_mask}</span>
                  </div>
                  <p className="text-xl font-bold text-white tracking-tight">${acc.account_balance_current.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-3/4 bg-slate-800 h-1 rounded-full">
                      <div className="bg-indigo-500 h-1 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold">L: 32%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 border border-dashed border-slate-700 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 hover:border-slate-500 hover:bg-slate-800/20 transition-all">
              + Connect Entity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
