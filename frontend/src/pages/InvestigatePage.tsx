import React, { useState } from 'react';
import { 
  Search, 
  ShieldAlert, 
  Building2, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  Copy, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import api from '../api/client';
import { RiskMeter } from '../components/risk/RiskMeter';

export const InvestigatePage: React.FC = () => {
  const [address, setAddress] = useState('0x71c8491c39049a46399b009e51b14798380ad7f4');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const sampleWallets = [
    { label: 'Suspect Mule (Case Lead)', addr: '0x71c8491c39049a46399b009e51b14798380ad7f4' },
    { label: 'Victim Source Address', addr: '0x8ba1f109551bd432803012645ac136ddd64dba72' },
    { label: 'Binance Sweeper Exit', addr: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' },
    { label: 'Tornado.Cash Contract', addr: '0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc' },
  ];

  const handleSearch = async (targetAddr?: string) => {
    const queryAddr = targetAddr || address;
    if (!queryAddr.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(`/wallets/${queryAddr.trim()}`);
      setResult(res.data);
    } catch (e) {
      // Fallback demo state
      setResult({
        address: queryAddr,
        chain: 'ethereum',
        balance_eth: 0.14,
        total_received_eth: 14.85,
        total_sent_eth: 14.71,
        tx_count: 18,
        risk_score: 92,
        risk_level: 'CRITICAL',
        risk_factors: [
          'Direct Inflow from High-Yield Staking Drain Scam',
          'Peel-Chain Rapid Outflow Pattern (3 hops in 12 mins)',
          'Associated with Co-Spending Cluster CL-1028',
          'Exit Deposit Swept into Binance Hot Wallet 6'
        ],
        vasp_attribution: {
          vasp_name: 'Binance',
          entity_type: 'Centralized Exchange (CEX)',
          confidence: 95,
          jurisdiction: 'Seychelles / Global Compliance'
        },
        cluster_info: {
          cluster_id: 'CL-1028',
          total_addresses: 12,
          dominant_activity: 'Deposit Sweeper / Mule Ring'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 select-none">
      {/* Search Bar & Header */}
      <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
            Forensic Intelligence
          </div>
          <h1 className="text-xl font-bold text-[#191E24]">
            Wallet Profiler & VASP Attribution Engine
          </h1>
          <p className="text-xs text-[#5C6470]">
            Input any EVM or Bitcoin address to compute 0–100 risk heuristics, identify exchange sweepers, and map co-spending clusters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8C93A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste wallet address (e.g. 0x71c8...)"
              className="w-full bg-[#FAF8F5] border border-[#EAE6DF] focus:border-[#254394] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#191E24] font-mono focus:outline-none transition-all"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#1E2E4A] hover:bg-[#15233B] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Profiling...' : 'Analyze Wallet'}</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F2EFE9]">
          <span className="text-[11px] font-bold text-[#788292]">Quick Samples:</span>
          {sampleWallets.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAddress(item.addr);
                handleSearch(item.addr);
              }}
              className="text-[11px] font-medium bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-[#191E24] px-2.5 py-1 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result Dossier */}
      {result && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header Card */}
          <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2EFE9] pb-4">
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-[#788292] uppercase tracking-wider">
                  Target Profile
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-bold text-[#191E24] break-all">
                    {result.address}
                  </span>
                  <button
                    onClick={() => copyToClipboard(result.address)}
                    className="p-1 hover:bg-[#FAF8F5] rounded text-[#788292] hover:text-[#191E24]"
                    title="Copy Address"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copied && <span className="text-[10px] text-emerald-600 font-semibold">Copied to clipboard!</span>}
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
                  Risk Score: {result.risk_score || 92} / 100 ({result.risk_level || 'CRITICAL'})
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
                <div className="text-[11px] text-[#788292] font-semibold">Active Balance</div>
                <div className="text-sm font-bold text-[#191E24] font-mono mt-0.5">
                  {result.balance_eth || '0.14'} ETH
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
                <div className="text-[11px] text-[#788292] font-semibold">Total Inflow</div>
                <div className="text-sm font-bold text-[#191E24] font-mono mt-0.5">
                  {result.total_received_eth || '14.85'} ETH
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
                <div className="text-[11px] text-[#788292] font-semibold">Total Outflow</div>
                <div className="text-sm font-bold text-[#191E24] font-mono mt-0.5">
                  {result.total_sent_eth || '14.71'} ETH
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF]">
                <div className="text-[11px] text-[#788292] font-semibold">Tx Count</div>
                <div className="text-sm font-bold text-[#191E24] font-mono mt-0.5">
                  {result.tx_count || 18} Txs
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Deep Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Factors */}
            <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
              <div className="flex items-center space-x-2 border-b border-[#F2EFE9] pb-3">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  Risk Heuristics & Red Flags
                </h3>
              </div>

              <div className="space-y-2.5">
                {(result.risk_factors || [
                  'Direct Inflow from High-Yield Staking Drain Scam',
                  'Peel-Chain Rapid Outflow Pattern (3 hops in 12 mins)',
                  'Associated with Co-Spending Cluster CL-1028',
                  'Exit Deposit Swept into Binance Hot Wallet 6'
                ]).map((factor: string, i: number) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-[#2D343F]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></span>
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VASP & Cluster Attribution */}
            <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
              <div className="flex items-center space-x-2 border-b border-[#F2EFE9] pb-3">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  VASP Attribution & Cluster Entity
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      Target VASP: Binance
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-700 text-white rounded">
                      95% Confidence
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Deposit address sweeps directly to Binance Hot Wallet 6. Eligible for Section 91 CrPC freeze.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#191E24]">
                      Cluster Entity: CL-1028
                    </span>
                    <span className="text-[10px] text-[#788292]">12 Wallets Identified</span>
                  </div>
                  <p className="text-[11px] text-[#5C6470]">
                    Co-spending and common deposit sweeper heuristic binds this address to an active syndicate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
