import React from 'react';
import { Bot, Shield } from 'lucide-react';
import { AIIntelligenceBrief } from '../../types';

interface Props {
  data: AIIntelligenceBrief;
}

export const IntelligenceAssistantCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-xl bg-[#0b1120] border border-cyan-500/30 p-5 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <span>TRACE-X Intelligence Assistant</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Grounded ML Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Non-hallucinatory evidence-grounded summary & recommendations</p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Case: {data.case_id}
        </div>
      </div>

      <div className="my-4 p-4 rounded-lg bg-[#070b14] border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
        {data.executive_summary}
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Actionable Subpoena & Investigative Next Steps</span>
        </h4>
        <div className="space-y-2">
          {data.recommended_steps?.map((rec) => (
            <div key={rec.step} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400 shrink-0 mt-0.5">
                {rec.step}
              </span>
              <div>
                <div className="text-xs font-semibold text-slate-200">{rec.action}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{rec.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
        <div>Referenced Evidence: {data.evidence_references?.join(', ')}</div>
        <div className="text-amber-400/90 font-medium">⚠️ Requires Official Law Enforcement Subpoena Verification</div>
      </div>
    </div>
  );
};
