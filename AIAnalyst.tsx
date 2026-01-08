
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS, MOCK_ALERTS, TREND_DATA } from '../constants';
import { ChatMessage } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

const AIAnalyst: React.FC = () => {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thoughtTime, setThoughtTime] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    metrics: { label: string; value: string }[];
    charts: { type: 'bar' | 'pie' | 'line'; title: string; data: any[] }[];
  }>({
    metrics: [
      { label: 'Total Accounts', value: MOCK_ACCOUNTS.length.toString() },
      { label: 'Total Balance', value: `$${MOCK_ACCOUNTS.reduce((acc, c) => acc + c.account_balance_current, 0).toLocaleString()}` }
    ],
    charts: [
      { 
        type: 'bar', 
        title: 'Spending by Merchant (Top 5)', 
        data: MOCK_TRANSACTIONS.slice(0, 5).map(t => ({ name: t.merchant_name || t.transaction_name, value: t.transaction_amount }))
      }
    ]
  });

  const timerRef = useRef<number | null>(null);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    setIsThinking(true);
    setThoughtTime(0);
    setStatus(['Analyzing Data Schema...', 'Executing Fraud Logic Engine...']);
    
    timerRef.current = window.setInterval(() => {
      setThoughtTime(prev => prev + 1);
    }, 1000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are an expert business financial analyst. 
        Data provided:
        Accounts: ${JSON.stringify(MOCK_ACCOUNTS)}
        Transactions: ${JSON.stringify(MOCK_TRANSACTIONS)}
        Alerts: ${JSON.stringify(MOCK_ALERTS)}

        User asks: "${input}"

        Return a JSON response following this structure:
        {
          "summary": "Brief explanation of what you found",
          "metrics": [{"label": "string", "value": "string"}],
          "charts": [{"type": "bar" | "pie" | "line", "title": "string", "data": [{"name": "string", "value": number}]}]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [{ role: 'user', parts: [{ text: context }] }],
        config: { responseMimeType: 'application/json' }
      });

      const result = JSON.parse(response.text || '{}');
      
      setStatus(prev => [...prev, 'Generating Visualizations...', 'Deployment Complete.']);
      
      setTimeout(() => {
        setDashboardData({
          metrics: result.metrics || [],
          charts: result.charts || []
        });
        setIsThinking(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsThinking(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] text-slate-900 overflow-hidden font-sans">
      {/* Left Panel: Instructions & Thought Process */}
      <div className="w-[400px] flex flex-col border-r border-slate-200 bg-white shadow-xl z-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="text-lg">📊</span> Analyst Instruction
          </h2>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <span className="text-xl">◳</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Thinking Block */}
          {isThinking && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4">
                <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                Thought for {thoughtTime}s
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                I am analyzing your {MOCK_TRANSACTIONS.length} recent transactions to identify patterns that match your request. I will generate a dynamic dashboard with key performance indicators and comparative charts.
              </p>
              
              <ul className="space-y-3">
                {status.map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-medium text-slate-500">
                    <span className="text-emerald-500 font-bold">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!isThinking && dashboardData.metrics.length > 0 && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 font-medium">
              ✨ Analysis complete. Insights have been added to the dashboard.
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Instructions</h4>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 min-h-[120px] text-sm text-slate-700 leading-relaxed">
              {input || "Ask me to analyze spending trends, find anomalies, or summarize your accounts..."}
            </div>
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="p-6 border-t border-slate-100">
          <div className="relative group">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for data, dashboard or deep analysis..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-14 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm group-hover:border-slate-300"
            />
            <button 
              onClick={handleSend}
              disabled={isThinking}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all disabled:opacity-50 shadow-md active:scale-95"
            >
              <span className="text-xl leading-none">➔</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Dashboard Output */}
      <div className="flex-1 flex flex-col bg-[#F3F5F7] overflow-hidden">
        <header className="px-8 py-5 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600">✕</button>
            <h1 className="font-bold text-slate-800 tracking-tight">AI Generated Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg flex items-center gap-2">
              <span>➕</span> Add Widget
            </button>
            <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100 transition-all">
              Share Report
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 animate-in fade-in duration-700">
          <div className="max-w-6xl mx-auto space-y-8">
            <p className="text-slate-500 text-sm font-medium">
              A quick report synthesized from your real-time financial data 🚀
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.metrics.map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-300 hover:text-slate-500">🗑️</button>
                    <button className="text-slate-300 hover:text-slate-500">📝</button>
                  </div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{m.label}</h4>
                  <p className="text-3xl font-black text-slate-900">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {dashboardData.charts.map((chart, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col relative group hover:shadow-lg transition-all">
                  <div className="absolute top-4 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button className="text-slate-300 hover:text-slate-500">🗑️</button>
                    <button className="text-slate-300 hover:text-slate-500">📝</button>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 mb-8 text-lg">{chart.title} ({chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} Chart)</h3>
                  
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {chart.type === 'bar' ? (
                        <BarChart data={chart.data}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} interval={0} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      ) : chart.type === 'pie' ? (
                        <PieChart>
                          <Pie
                            data={chart.data}
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {chart.data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      ) : (
                        <LineChart data={chart.data}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1' }} />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
              
              {/* Empty placeholder if no charts */}
              {dashboardData.charts.length === 0 && !isThinking && (
                <div className="lg:col-span-2 py-32 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <p className="text-slate-400 font-medium">The analyst dashboard is empty. Try asking for a specific report!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyst;
