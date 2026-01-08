
import React, { useState } from 'react';
import { MOCK_RULES } from '../constants';
import { Rule, AlertSeverity } from '../types';

const PLAID_ATTRIBUTES = [
  { id: 'transaction_amount', label: 'Transaction Amount', type: 'number' },
  { id: 'merchant_name', label: 'Merchant Name', type: 'string' },
  { id: 'category_detailed', label: 'Detailed Category', type: 'string' },
  { id: 'payment_channel', label: 'Payment Channel', type: 'select', options: ['online', 'in store', 'other'] },
  { id: 'authorized_date', label: 'Authorized Date/Time', type: 'date' },
];

const OPERATORS: Record<string, { label: string; value: string }[]> = {
  number: [
    { label: 'is greater than', value: 'gt' },
    { label: 'is less than', value: 'lt' },
    { label: 'is exactly', value: 'eq' },
    { label: 'increased by more than %', value: 'pct_inc' },
  ],
  string: [
    { label: 'contains', value: 'contains' },
    { label: 'is exactly', value: 'eq' },
    { label: 'starts with', value: 'starts' },
    { label: 'is a new merchant', value: 'new' },
  ],
  select: [
    { label: 'is', value: 'is' },
    { label: 'is not', value: 'is_not' },
  ],
  date: [
    { label: 'is after hours (11pm-5am)', value: 'after_hours' },
    { label: 'is on a weekend', value: 'weekend' },
    { label: 'is before', value: 'before' },
    { label: 'is after', value: 'after' },
  ]
};

interface RuleCondition {
  id: string;
  attribute: string;
  operator: string;
  value: string;
  logic: 'AND' | 'OR';
}

const RuleModal: React.FC<{ rule?: Rule; onClose: () => void; onSave: (rule: Partial<Rule>) => void }> = ({ rule, onClose, onSave }) => {
  const isEditing = !!rule;
  const [creationMode, setCreationMode] = useState<'ai' | 'manual' | null>(isEditing ? 'manual' : null);
  
  const [formData, setFormData] = useState<Partial<Rule>>(rule || {
    name: '',
    description: '',
    severity: AlertSeverity.INFO,
    enabled: true
  });

  const [alertChannel, setAlertChannel] = useState<'email' | 'sms'>('email');
  const [naturalLanguage, setNaturalLanguage] = useState('');
  
  const [conditions, setConditions] = useState<RuleCondition[]>([
    { id: '1', attribute: 'transaction_amount', operator: 'gt', value: '', logic: 'AND' }
  ]);

  const addCondition = () => {
    setConditions([...conditions, { 
      id: Date.now().toString(), 
      attribute: 'transaction_amount', 
      operator: 'gt', 
      value: '', 
      logic: 'AND' 
    }]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  const updateCondition = (id: string, updates: Partial<RuleCondition>) => {
    setConditions(conditions.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-[#1f2937] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-200 max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Rule Configuration' : 'Forge Intelligence Rule'}</h3>
            {!isEditing && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-black tracking-widest uppercase border border-indigo-500/30">Preview</span>}
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Top Section: Alias, Severity, Alert Channel */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <div className="md:col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Rule Alias</label>
              <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500 transition-all"
                placeholder="e.g. High SaaS Charge"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Severity Impact</label>
              <select 
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value as AlertSeverity})}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500 transition-all"
              >
                <option value={AlertSeverity.INFO}>Info</option>
                <option value={AlertSeverity.WARNING}>Warning</option>
                <option value={AlertSeverity.CRITICAL}>Critical</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Alert Method</label>
              <select 
                value={alertChannel}
                onChange={(e) => setAlertChannel(e.target.value as 'email' | 'sms')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-indigo-500 transition-all"
              >
                <option value="email">Email Notification</option>
                <option value="sms">SMS Alert</option>
              </select>
            </div>
          </section>

          {/* Creation Mode Selection */}
          {!isEditing && !creationMode && (
            <div className="grid grid-cols-2 gap-6 pt-4">
              <button 
                onClick={() => setCreationMode('ai')}
                className="p-8 border-2 border-dashed border-indigo-500/30 bg-indigo-500/[0.02] rounded-3xl flex flex-col items-center justify-center text-center group hover:border-indigo-500 transition-all"
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🪄</span>
                <p className="text-sm font-bold text-white">Describe in Plain English</p>
                <p className="text-[10px] text-slate-500 mt-2">Use AI to generate logic patterns</p>
              </button>
              <button 
                onClick={() => setCreationMode('manual')}
                className="p-8 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-all"
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚙️</span>
                <p className="text-sm font-bold text-white">Manually Add Criteria</p>
                <p className="text-[10px] text-slate-500 mt-2">Forge complex modular conditions</p>
              </button>
            </div>
          )}

          {/* AI Synthesis Section (Only if creationMode is AI and NOT editing) */}
          {!isEditing && creationMode === 'ai' && (
            <section className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Synthesis</label>
                <span className="text-[10px] text-indigo-400 font-bold">Powered by Gemini Logic Engine</span>
              </div>
              <div className="relative">
                <textarea 
                  value={naturalLanguage}
                  onChange={(e) => setNaturalLanguage(e.target.value)}
                  placeholder="Describe an alert in plain English (e.g., 'Alert me if any SaaS bill increases by 10%')"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 pr-12 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all min-h-[100px] resize-none"
                />
                <button className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white shadow-lg transition-all active:scale-95">
                  <span>🪄</span>
                </button>
              </div>
              <button 
                onClick={() => setCreationMode('manual')}
                className="text-[10px] font-bold text-slate-500 uppercase hover:text-slate-300 transition-colors"
              >
                Switch to Manual Builder
              </button>
            </section>
          )}

          {/* Modular Manual Builder */}
          {creationMode === 'manual' && (
            <section className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rule Logic Engine</h4>
                <button 
                  onClick={addCondition}
                  className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <span>+</span> Add Condition
                </button>
              </div>
              
              <div className="space-y-4">
                {conditions.map((condition, idx) => {
                  const currentAttr = PLAID_ATTRIBUTES.find(a => a.id === condition.attribute) || PLAID_ATTRIBUTES[0];
                  return (
                    <div key={condition.id} className="relative space-y-3 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl group">
                      {idx > 0 && (
                        <div className="absolute -top-3 left-6 z-10">
                           <select 
                            value={condition.logic}
                            onChange={(e) => updateCondition(condition.id, { logic: e.target.value as 'AND' | 'OR' })}
                            className="bg-indigo-600 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md outline-none cursor-pointer shadow-lg border-none"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Condition {idx + 1}</span>
                        {conditions.length > 1 && (
                          <button onClick={() => removeCondition(condition.id)} className="text-slate-600 hover:text-red-400 text-sm transition-colors">&times;</button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 mb-1 block">Attribute</label>
                          <select 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                            value={condition.attribute}
                            onChange={(e) => {
                              const attr = PLAID_ATTRIBUTES.find(a => a.id === e.target.value)!;
                              updateCondition(condition.id, { attribute: attr.id, operator: OPERATORS[attr.type][0].value });
                            }}
                          >
                            {PLAID_ATTRIBUTES.map(attr => (
                              <option key={attr.id} value={attr.id}>{attr.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 mb-1 block">Operator</label>
                          <select 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                            value={condition.operator}
                            onChange={(e) => updateCondition(condition.id, { operator: e.target.value })}
                          >
                            {OPERATORS[currentAttr.type].map(op => (
                              <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 mb-1 block">Value</label>
                          <input 
                            type={currentAttr.type === 'number' ? 'number' : 'text'}
                            value={condition.value}
                            onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
                            placeholder="Threshold..."
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-800 bg-slate-900/30 flex items-center justify-between">
          <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-white transition-colors">Cancel</button>
          <button 
            disabled={!creationMode}
            onClick={() => onSave(formData)}
            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 text-sm active:scale-95"
          >
            Deploy Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

const RulesEngine: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const toggleRule = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleSave = (updatedRule: Partial<Rule>) => {
    if (editingRule) {
      setRules(prev => prev.map(r => r.id === editingRule.id ? { ...r, ...updatedRule } : r));
    } else {
      const newRule: Rule = {
        id: `r_${Date.now()}`,
        name: updatedRule.name || 'New Rule',
        description: updatedRule.description || 'Custom surveillance logic',
        enabled: true,
        severity: updatedRule.severity || AlertSeverity.INFO,
      } as Rule;
      setRules(prev => [...prev, newRule]);
    }
    setEditingRule(null);
    setIsCreating(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Rule Architecture</h1>
          <p className="text-sm text-slate-400">Configure real-time automated surveillance patterns via Plaid webhooks</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> New Intelligence Rule
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map(rule => (
          <div 
            key={rule.id} 
            onClick={() => setEditingRule(rule)}
            className={`p-6 rounded-3xl border cursor-pointer transition-all hover:border-slate-600 shadow-sm hover:shadow-md relative overflow-hidden group ${
              rule.enabled ? 'bg-slate-800/30 border-slate-700/50' : 'bg-slate-900/20 border-slate-800 opacity-60'
            }`}
          >
            {rule.enabled && <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50"></div>}
            
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{rule.name}</h3>
                <div className="flex gap-2 items-center">
                   <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                    rule.severity === AlertSeverity.CRITICAL ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                    rule.severity === AlertSeverity.WARNING ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                    'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    {rule.severity}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono text-[8px]">ID: {rule.id.toUpperCase()}</span>
                </div>
              </div>
              {/* Corrected toggle switch: ON = Right, OFF = Left */}
              <div 
                onClick={(e) => toggleRule(rule.id, e)}
                className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${rule.enabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${rule.enabled ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 min-h-[32px] mb-6">
              {rule.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
              <div className="flex -space-x-1.5">
                {[1, 2].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] text-slate-500 font-bold">
                    A{i}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] text-indigo-400 font-bold">+</div>
              </div>
              <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Configure Intelligence</button>
            </div>
          </div>
        ))}
      </div>

      {(editingRule || isCreating) && (
        <RuleModal 
          rule={editingRule || undefined} 
          onClose={() => { setEditingRule(null); setIsCreating(false); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default RulesEngine;
