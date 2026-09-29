import React, { useState } from 'react';
import { Settings, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [mode, setMode] = useState('demo');
  const [ethRpc, setEthRpc] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#0b1120] border border-slate-800 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <Settings className="w-5 h-5 text-cyan-400" /><h1 className="text-lg font-bold font-mono text-white">SYSTEM SETTINGS & RPC</h1>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">BLOCKCHAIN PROVIDER MODE</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono">
            <option value="demo">Demo Synthetic Intelligence (High Fidelity Offline)</option>
            <option value="live">Live RPC Web3 Provider</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">ETHEREUM RPC URL (OPTIONAL)</label>
          <input type="text" placeholder="https://mainnet.infura.io/v3/..." value={ethRpc} onChange={(e) => setEthRpc(e.target.value)} className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono" />
        </div>
        <button type="submit" className="px-6 py-2.5 rounded-lg bg-cyan-500 text-black font-bold text-xs font-mono">
          {saved ? 'SETTINGS SAVED' : 'SAVE CONFIGURATION'}
        </button>
      </form>
    </div>
  );
};
