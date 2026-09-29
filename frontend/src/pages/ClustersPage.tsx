import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { WalletCluster } from '../types';

export const ClustersPage: React.FC = () => {
  const [clusters, setClusters] = useState<WalletCluster[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<any>(null);

  useEffect(() => {
    api.get('/clusters').then((res) => {
      setClusters(res.data);
      if (res.data.length > 0) setSelectedCluster(res.data[0]);
    }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-white">WALLET CLUSTERING INTELLIGENCE</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {clusters.map((c) => (
            <div key={c.cluster_id} onClick={() => setSelectedCluster(c)} className={`p-4 rounded-xl border cursor-pointer ${selectedCluster?.cluster_id === c.cluster_id ? 'bg-purple-950/20 border-purple-500' : 'bg-[#0b1120] border-slate-800'}`}>
              <div className="text-xs font-bold font-mono text-purple-400">{c.cluster_id}</div>
              <h3 className="text-sm font-bold text-white mt-1">{c.cluster_name}</h3>
              <div className="text-[11px] font-mono text-slate-400">{c.wallet_count} Wallets • ${c.total_volume_usd?.toLocaleString()} USD Vol</div>
            </div>
          ))}
        </div>
        {selectedCluster && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b1120] border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white">{selectedCluster.cluster_name} ({selectedCluster.cluster_id})</h2>
            <div className="text-xs font-mono text-cyan-400">Probable Service: {selectedCluster.probable_service}</div>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedCluster.evidence_factors?.map((ef: string, i: number) => (
                <li key={i} className="p-3 rounded-lg bg-[#070b14] border border-slate-800">{ef}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
