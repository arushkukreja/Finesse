
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RiskAlerts from './pages/RiskAlerts';
import RulesEngine from './pages/RulesEngine';
import Reporting from './pages/Reporting';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b0f1a] text-slate-200">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<RiskAlerts />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/rules" element={<RulesEngine />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
