import React, { useEffect, useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import api from '../api/client';
import { Alert } from '../types';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const fetchAlerts = () => api.get('/alerts').then((res) => setAlerts(res.data)).catch(console.error);
  useEffect(() => { fetchAlerts(); }, []);

  const handleAck = async (id: string | number) => {
    try {
      await api.put(`/alerts/${id}/status?status=RESOLVED`);
      fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-white">THREAT ALERT SURVEILLANCE FEED</h1>
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className={`p-4 rounded-xl border flex items-start justify-between ${a.severity === 'CRITICAL' ? 'bg-red-950/10 border-red-500/40' : 'bg-[#0b1120] border-slate-800'}`}>
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">{a.title} <span className="text-[10px] text-red-400 font-mono">[{a.severity}]</span></div>
                <p className="text-xs text-slate-300 mt-1">{a.description}</p>
              </div>
            </div>
            {!a.is_acknowledged && (
              <button onClick={() => handleAck(a.id)} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" /><span>Ack</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
