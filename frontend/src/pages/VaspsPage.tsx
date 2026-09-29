import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { VASP } from '../types';

export const VaspsPage: React.FC = () => {
  const [vasps, setVasps] = useState<VASP[]>([]);
  useEffect(() => {
    api.get('/vasps').then((res) => setVasps(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-white">VASP & EXCHANGE INTELLIGENCE REGISTRY</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vasps.map((v) => (
          <div key={v.id} className="p-5 rounded-xl bg-[#0b1120] border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400">{v.vasp_type}</span><h3 className="text-base font-bold text-white mt-1">{v.name}</h3></div>
              <span className="px-2 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 font-bold">{(v.confidence_rating * 100).toFixed(0)}% Score</span>
            </div>
            <p className="text-xs text-slate-400">{v.description}</p>
            <div className="text-xs font-mono text-slate-300">LE Email: {v.compliance_email || 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
