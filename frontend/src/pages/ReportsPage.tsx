import React, { useEffect, useState } from 'react';
import { FileText, Download, PlusCircle } from 'lucide-react';
import api from '../api/client';
import { ReportRecord } from '../types';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const fetchReports = () => api.get('/reports').then((res) => setReports(res.data)).catch(console.error);
  useEffect(() => { fetchReports(); }, []);

  const handleGen = async () => {
    const res = await api.post('/reports/generate', { case_id: 1, title: 'Forensic Intelligence Dossier: Operation Quantum Shield' });
    fetchReports();
    alert(`Report compiled: ${res.data.report_code}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold font-mono text-white">FORENSIC INTELLIGENCE REPORTS</h1>
        <button onClick={handleGen} className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition font-mono flex items-center space-x-1.5">
          <PlusCircle className="w-4 h-4" /><span>Compile New Report</span>
        </button>
      </div>
      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="p-5 rounded-xl bg-[#0b1120] border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold font-mono text-cyan-400">{r.report_code}</div>
              <h3 className="text-sm font-bold text-white mt-1">{r.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{r.executive_summary}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => {
                const blob = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = `${r.report_code}.json`; a.click();
              }} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 flex items-center space-x-1">
                <Download className="w-3.5 h-3.5" /><span>JSON</span>
              </button>
              <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs font-mono">
                Print / PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
