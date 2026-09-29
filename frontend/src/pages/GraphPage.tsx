import React, { useState } from 'react';
import { 
  GitFork, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldAlert, 
  Building2, 
  ArrowRight,
  Info,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GraphPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<any>({
    id: 'mule_1',
    label: '0x71c8...d7f4',
    name: 'Suspect Mule 1',
    role: 'Peel Chain Hop 1',
    amount: '14.85 ETH',
    risk: 92,
    status: 'Flagged by Inspector Rao'
  });

  const nodes = [
    { id: 'victim', label: 'Victim (Priya N.)', type: 'VICTIM', amount: '14.85 ETH', color: 'border-blue-300 bg-blue-50 text-blue-900' },
    { id: 'mule_1', label: 'Mule Wallet 1', type: 'MULE', amount: '14.85 ETH', color: 'border-rose-300 bg-rose-50 text-rose-900' },
    { id: 'peel_1', label: 'Peel Hop 2', type: 'PEEL', amount: '11.65 ETH', color: 'border-amber-300 bg-amber-50 text-amber-900' },
    { id: 'peel_2', label: 'Peel Hop 3', type: 'PEEL', amount: '8.45 ETH', color: 'border-amber-300 bg-amber-50 text-amber-900' },
    { id: 'binance', label: 'Binance Hot Wallet 6', type: 'VASP', amount: '3.20 ETH', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Header Bar */}
      <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            Forensics Analytics Lab
          </div>
          <h1 className="text-xl font-bold text-[#191E24]">
            Topology Graph Visualizer (Case CYB-2026-00421)
          </h1>
          <p className="text-xs text-[#5C6470]">
            Interactive node visualizer tracing transaction propagation, volume dissipation, and final VASP exit sweeps.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/cases/CYB-2026-00421')}
            className="px-4 py-2 bg-[#1E2E4A] hover:bg-[#15233B] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Attach Graph to Case Dossier
          </button>
        </div>
      </div>

      {/* Graph Visual Canvas & Node Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#EAE6DF] rounded-2xl p-6 shadow-[0_1px_3px_rgba(32,28,24,0.03)] relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F2EFE9] z-10">
            <div className="text-xs font-bold text-[#191E24] flex items-center space-x-2">
              <GitFork className="w-4 h-4 text-[#1E2E4A]" />
              <span>Multi-Hop Peeling Trail: 4 Hops Traced</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#FAF8F5] p-1 rounded-lg border border-[#EAE6DF]">
              <button className="p-1.5 hover:bg-white rounded text-[#5C6470]" title="Zoom In"><ZoomIn className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 hover:bg-white rounded text-[#5C6470]" title="Zoom Out"><ZoomOut className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 hover:bg-white rounded text-[#5C6470]" title="Reset View"><RotateCcw className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Handcrafted Visual Flow Chart */}
          <div className="my-auto py-8 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 relative">
            {nodes.map((n, i) => (
              <React.Fragment key={n.id}>
                <div
                  onClick={() => setSelectedNode(n)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${n.color} ${
                    selectedNode?.id === n.id ? 'ring-4 ring-indigo-100 scale-105 shadow-md' : 'hover:scale-102'
                  } text-center space-y-1 w-44 shadow-xs`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">{n.type}</div>
                  <div className="text-xs font-bold truncate">{n.label}</div>
                  <div className="text-xs font-mono font-semibold">{n.amount}</div>
                </div>

                {i < nodes.length - 1 && (
                  <div className="text-[#8C93A0] hidden md:flex items-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#5C6470]">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span>Victim Source</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span>Primary Mule</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span>Peel Chain</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span>VASP Sweeper</span></span>
            </div>
            <span>Heuristic Algorithm: Common Dep Sweeper (CDS-95)</span>
          </div>
        </div>

        {/* Node Inspector Drawer (1 col) */}
        <div className="bg-white border border-[#EAE6DF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#F2EFE9] pb-3">
            <Info className="w-4 h-4 text-[#1E2E4A]" />
            <h2 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
              Selected Node Inspector
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] space-y-1">
              <div className="text-[11px] text-[#788292] font-semibold">Entity Label</div>
              <div className="font-bold text-[#191E24]">{selectedNode.label}</div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] space-y-1">
              <div className="text-[11px] text-[#788292] font-semibold">Transaction Volume</div>
              <div className="font-bold font-mono text-[#191E24]">{selectedNode.amount}</div>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] space-y-1">
              <div className="text-[11px] text-[#788292] font-semibold">Cluster Assignment</div>
              <div className="font-bold text-[#191E24]">CL-1028 (Deposit Sweep Network)</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <div className="text-[11px] text-emerald-800 font-semibold">Attributed Destination</div>
              <div className="font-bold text-emerald-950">Binance Hot Wallet 6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
