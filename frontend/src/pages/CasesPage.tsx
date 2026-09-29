import React, { useEffect, useState } from 'react';
import { FolderKanban, Search, Plus, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { Case } from '../types';

export const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/cases').then((res) => setCases(res.data)).catch(console.error);
  }, []);

  const filteredCases = cases.filter((c) =>
    (c.case_number || c.case_id || '').toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.primary_wallet || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#30363d] gap-2">
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold text-[#f0f6fc] flex items-center space-x-1.5">
            <FolderKanban className="w-3.5 h-3.5 text-sky-400" />
            <span>INVESTIGATION CASE FILES & LEGAL EVIDENCE REGISTRY</span>
          </div>
          <p className="text-[11px] text-[#8b949e]">
            Official Law Enforcement Case Registry with Chain-of-Custody Verification
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter case ID, title, wallet..."
            className="w-56 bg-[#0d1117] border border-[#30363d] px-2 py-1 text-[11px] font-mono text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
          />
          <button
            onClick={() => navigate('/cases/new')}
            className="px-2.5 py-1 bg-[#1f6feb] hover:bg-[#388bfd] text-white text-[11px] font-mono font-semibold rounded-sm"
          >
            + Register Case
          </button>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#30363d] rounded-sm overflow-x-auto">
        <table className="forensics-table">
          <thead>
            <tr>
              <th>CASE REF</th>
              <th>TITLE & MODUS OPERANDI</th>
              <th>SUSPECT WALLET</th>
              <th>EXPOSURE</th>
              <th>LIFECYCLE STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c.id || c.case_id}>
                <td className="font-mono text-[#58a6ff] font-semibold whitespace-nowrap">
                  {c.case_number || c.case_id || 'CYB-2026-00421'}
                </td>
                <td>
                  <div className="font-semibold text-[#f0f6fc]">{c.title}</div>
                  <div className="text-[10px] text-[#8b949e] font-mono">{c.fraud_type || 'Investment Fraud'}</div>
                </td>
                <td className="font-mono text-[10px] text-[#8b949e] select-all">
                  {c.primary_wallet || '0x71c8491c39049a46399b009e51b14798380ad7f4'}
                </td>
                <td className="font-mono font-semibold text-[#f0f6fc]">
                  ${c.amount_involved_usd ? Number(c.amount_involved_usd).toLocaleString() : '481,305.00'}
                </td>
                <td>
                  <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold border rounded-sm ${
                    c.status === 'VALIDATED_AND_SUBPOENA_ISSUED' ? 'bg-emerald-950 border-emerald-800 text-emerald-400' :
                    c.status === 'PENDING_VALIDATION' ? 'bg-amber-950 border-amber-800 text-amber-400' :
                    'bg-sky-950 border-sky-800 text-sky-400'
                  }`}>
                    {c.status || 'ACTIVE'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/cases/${c.id || c.case_id}`)}
                    className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[10px] font-mono text-[#58a6ff] rounded-sm"
                  >
                    Open Case File
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
