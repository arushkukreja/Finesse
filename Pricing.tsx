
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Foundational surveillance for solopreneurs.',
      monthly: 0,
      yearly: 0,
      features: ['Up to 3 Linked Accounts', 'Daily Risk Scanning', 'Standard AI Insights', 'Email Alerts'],
      button: 'Current Plan',
      current: true
    },
    {
      name: 'Pro',
      description: 'Intelligence for growing small businesses.',
      monthly: 49,
      yearly: 39,
      features: ['Unlimited Linked Accounts', 'Real-time Push Alerts', 'Advanced AI Data Analyst', 'Custom Report Builder', 'Priority Support'],
      button: 'Upgrade to Pro',
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive risk suite for scale.',
      monthly: 199,
      yearly: 149,
      features: ['Dedicated Account Manager', 'Custom API Rules Engine', 'Multi-user Governance', 'White-glove Onboarding', 'SLA Guarantees'],
      button: 'Contact Sales'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
      <header className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Intelligence for every scale</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">Choose the surveillance tier that fits your business velocity. Secure your runway with automated auditing.</p>
        
        <div className="flex items-center justify-center gap-4 pt-6">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-slate-800 rounded-full relative p-1 transition-all"
          >
            <div className={`w-5 h-5 bg-indigo-500 rounded-full transition-all shadow-lg ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>Yearly <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 ml-1">SAVE 20%</span></span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(p => (
          <div key={p.name} className={`bg-slate-800/30 border rounded-3xl p-8 flex flex-col shadow-2xl relative transition-all hover:translate-y-[-4px] ${
            p.highlight ? 'border-indigo-500/50 bg-indigo-500/[0.03] scale-105 z-10' : 'border-slate-800'
          }`}>
            {p.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-8 h-8">{p.description}</p>
            
            <div className="mb-8">
              <span className="text-4xl font-black text-white">${billingCycle === 'monthly' ? p.monthly : p.yearly}</span>
              <span className="text-slate-500 text-sm ml-1">/mo</span>
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold text-sm mb-10 transition-all ${
              p.current 
              ? 'bg-slate-700 text-slate-400 cursor-default' 
              : p.highlight 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/20' 
              : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}>
              {p.button}
            </button>

            <ul className="space-y-4 flex-1">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-indigo-500 text-lg">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
