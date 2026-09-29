import React, { useEffect, useState } from 'react';
import api from '../api/client';

export const AdminPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/admin/stats').then((res) => setStats(res.data)).catch(console.error);
    api.get('/admin/audit-logs').then((res) => setLogs(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-white">ADMINISTRATION & AUDIT TRAIL</h1>
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800"><div className="text-xs text-slate-400 font-mono">OFFICERS</div><div className="text-2xl font-bold font-mono text-white">{stats.total_users}</div></div>
          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800"><div className="text-xs text-slate-400 font-mono">CASES</div><div className="text-2xl font-bold font-mono text-cyan-400">{stats.total_cases}</div></div>
          <div className="p-4 rounded-xl bg-[#0b1120] border border-slate-800"><div className="text-xs text-slate-400 font-mono">AUDIT LOGS</div><div className="text-2xl font-bold font-mono text-purple-400">{stats.audit_events_count}</div></div>
        </div>
      )}
      <div className="p-5 rounded-2xl bg-[#0b1120] border border-slate-800 space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">AUDIT LOG TRAIL</h3>
        <div className="space-y-2 text-xs font-mono">
          {logs.map((l) => (
            <div key={l.id} className="p-2 rounded bg-[#070b14] border border-slate-800 flex justify-between">
              <span className="text-cyan-400">{l.user_email}</span>
              <span className="font-bold text-slate-200">{l.action}</span>
              <span className="text-slate-500">{new Date(l.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
