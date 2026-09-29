import React from 'react';
import { Shield, Layers, GitGraph, Cpu, Database, Activity, FileText } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const stages = [
    { title: '1. Cybercrime Complaint Intake', desc: 'Case creation, victim statement reference, reported loss amount in USD / ETH', icon: Shield },
    { title: '2. Multi-Chain Blockchain Indexer', desc: 'Abstraction layer querying Ethereum, BSC, Polygon, and Bitcoin ledgers with Demo fallback', icon: Layers },
    { title: '3. Transaction Graph Traversal', desc: 'Breadth-first search tracing up to 5 hops forward/backward, calculating balance peeling', icon: GitGraph },
    { title: '4. Pattern Detection Engine', desc: 'Heuristics for Layering, Rapid Movement, Peel Chains, Fan-Out, and Mixer Interactivity', icon: Cpu },
    { title: '5. Cross-Chain Bridge Intelligence', desc: 'Bridge router monitoring (Stargate / LayerZero) correlating cross-ledger teleportation', icon: Layers },
    { title: '6. VASP Deposit Attribution', desc: 'Matching destination clusters against known exchange deposit proxies with confidence scoring', icon: Database },
    { title: '7. Multi-Factor Explainable Risk Engine', desc: 'Deterministic 0-100 scoring breakdown with itemized evidence attribution', icon: Activity },
    { title: '8. Grounded AI Intelligence Assistant', desc: 'Non-hallucinatory narrative generation and actionable legal subpoena step recommendations', icon: Activity },
    { title: '9. Judicial Evidence & Report Generator', desc: 'Comprehensive PDF, JSON, and CSV docket creation for legal prosecution', icon: FileText }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold font-mono text-white">TRACE-X ARCHITECTURE PIPELINE</h1>
      <div className="space-y-3">
        {stages.map((st, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 flex items-center space-x-4">
            <st.icon className="w-5 h-5 text-cyan-400 shrink-0" />
            <div><h3 className="text-sm font-bold font-mono text-white">{st.title}</h3><p className="text-xs text-slate-400">{st.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};
