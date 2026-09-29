import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowLeft, ShieldCheck, FileText, Send, Building, Clock, CheckCircle2 } from 'lucide-react';
import api from '../api/client';
import { Case, TimelineEvent, EvidenceItem } from '../types';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<{ case: Case; timeline: TimelineEvent[]; evidence: EvidenceItem[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get(`/cases/${id}`)
        .then((res) => setCaseData(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-4 text-xs font-mono text-[#8b949e]">Loading dossier...</div>;
  if (!caseData?.case) return <div className="p-4 text-xs font-mono text-red-400">Case file not found.</div>;

  const c = caseData.case;

  return (
    <div className="space-y-4">
      {/* Back button & title */}
      <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
        <button
          onClick={() => navigate('/cases')}
          className="text-[11px] font-mono text-[#8b949e] hover:text-white flex items-center space-x-1"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Case Registry</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
            STATUS: {c.status || 'ACTIVE'}
          </span>
        </div>
      </div>

      {/* Case Header Details */}
      <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-[#8b949e]">CASE IDENTIFIER: {c.case_number || c.case_id}</div>
            <h1 className="text-sm font-bold font-mono text-[#f0f6fc]">{c.title}</h1>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono text-[#6e7681]">TOTAL STOLEN EXPOSURE</div>
            <div className="text-sm font-bold font-mono text-[#f0f6fc]">$481,305.00 USD</div>
          </div>
        </div>

        <p className="text-[11px] text-[#8b949e] leading-relaxed border-t border-[#21262d] pt-2">
          {c.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#21262d] text-[10px] font-mono">
          <div>
            <span className="text-[#6e7681]">PRIMARY SUSPECT: </span>
            <span className="text-red-400 select-all">{c.primary_wallet}</span>
          </div>
          <div>
            <span className="text-[#6e7681]">FRAUD CATEGORY: </span>
            <span className="text-[#c9d1d9]">{c.fraud_type}</span>
          </div>
          <div>
            <span className="text-[#6e7681]">NETWORK: </span>
            <span className="text-[#c9d1d9]">Ethereum (ETH)</span>
          </div>
        </div>
      </div>

      {/* Two columns: Evidence Vault & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Evidence Vault */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-sm p-3 space-y-2">
          <div className="text-[10px] font-mono font-bold text-[#8b949e] uppercase border-b border-[#21262d] pb-1 flex items-center justify-between">
            <span>CHAIN-OF-CUSTODY EVIDENCE VAULT</span>
            <span>{caseData.evidence?.length || 0} ITEMS</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            {caseData.evidence?.map((ev) => (
              <div key={ev.id} className="p-2.5 bg-[#161b22] border border-[#21262d] rounded-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-sky-400">{ev.title}</span>
                  <span className="text-[9px] font-mono px-1 bg-slate-800 text-[#8b949e]">{ev.evidence_type}</span>
                </div>
                <p className="text-[10px] text-[#8b949e]">{ev.notes || 'Verified evidence entry'}</p>
                <div className="text-[9px] font-mono text-[#6e7681]">Added by: {ev.created_by}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-sm p-3 space-y-2">
          <div className="text-[10px] font-mono font-bold text-[#8b949e] uppercase border-b border-[#21262d] pb-1 flex items-center justify-between">
            <span>INVESTIGATION TIMELINE & AUDIT LOG</span>
            <Clock className="w-3 h-3 text-[#8b949e]" />
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            {caseData.timeline?.map((ev) => (
              <div key={ev.id} className="p-2.5 bg-[#161b22] border border-[#21262d] rounded-sm space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-emerald-400">{ev.action_type || 'ACTIVITY'}</span>
                  <span className="text-[#6e7681]">{ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : 'Recent'}</span>
                </div>
                <p className="text-[10px] text-[#8b949e]">{ev.description}</p>
                <div className="text-[9px] font-mono text-[#6e7681]">Officer: {ev.user_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
