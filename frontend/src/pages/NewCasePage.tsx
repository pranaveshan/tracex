import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderGit2, ArrowRight } from 'lucide-react';
import api from '../api/client';

export const NewCasePage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    case_id: `CYB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    complaint_id: `COMP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    title: '',
    description: '',
    fraud_type: 'Investment Scam',
    priority: 'HIGH',
    primary_wallet: '',
    network: 'Ethereum',
    amount_involved_usd: 50000,
    victim_reference: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/cases', form);
      navigate(`/cases/${res.data.case_id}`);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to create case');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#0b1120] border border-slate-800 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
        <FolderGit2 className="w-5 h-5 text-cyan-400" />
        <h1 className="text-lg font-bold font-mono text-white">REGISTER INVESTIGATION CASE</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">CASE ID</label>
          <input type="text" required value={form.case_id} onChange={(e) => setForm({ ...form, case_id: e.target.value })} className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">TITLE</label>
          <input type="text" required placeholder="Operation Quantum Shield" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">SUSPECT WALLET ADDRESS</label>
          <input type="text" required placeholder="0x..." value={form.primary_wallet} onChange={(e) => setForm({ ...form, primary_wallet: e.target.value })} className="w-full bg-[#070b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono" />
        </div>
        <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition font-mono flex items-center justify-center space-x-2">
          <span>INITIATE INVESTIGATION</span><ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
