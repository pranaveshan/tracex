import React, { useEffect, useState } from 'react';
import { Share2, ArrowRight } from 'lucide-react';
import api from '../api/client';

export const CrossChainPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    api.get('/cross-chain/0x71c8491c39049a46399b009e51b14798380ad7f4').then((res) => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold font-mono text-white">CROSS-CHAIN BRIDGE ANALYTICS</h1>
      {data && (
        <div className="p-6 rounded-2xl bg-[#0b1120] border border-blue-500/30 space-y-4">
          <div className="text-xs font-mono text-blue-400 font-bold uppercase">ETHEREUM → BNB SMART CHAIN TRANSPORT</div>
          <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 flex items-center justify-between font-mono text-xs">
            <div><div className="text-slate-400">ORIGIN</div><div className="text-cyan-400 font-bold">Ethereum Mainnet</div></div>
            <div className="text-center"><span className="text-blue-400">Stargate Finance Bridge</span><ArrowRight className="w-5 h-5 mx-auto text-blue-400" /><span className="text-emerald-400">24.5 ETH (~$80,850 USD)</span></div>
            <div><div className="text-slate-400">DESTINATION</div><div className="text-amber-400 font-bold">BNB Chain</div></div>
          </div>
        </div>
      )}
    </div>
  );
};
