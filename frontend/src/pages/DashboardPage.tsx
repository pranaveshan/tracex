import React, { useEffect, useState } from 'react';
import { 
  FolderKanban, 
  AlertTriangle, 
  Building2, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu,
  Search,
  FileCheck,
  Award,
  ChevronRight,
  TrendingUp,
  Send,
  GitFork,
  Shield,
  Layers,
  Sparkles,
  FileText,
  UserCheck,
  Lock,
  ExternalLink,
  Copy,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { Case, Alert, VASP } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [vasps, setVasps] = useState<VASP[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const [selectedCaseId, setSelectedCaseId] = useState<string>('CYB-2026-00421');
  
  // Inspector Form State
  const [clueTitle, setClueTitle] = useState('Telegram chat logs linking victim deposit to mule wallet 0x71c8...d7f4');
  const [clueWallet, setClueWallet] = useState('0x71c8491c39049a46399b009e51b14798380ad7f4');
  const [clueModus, setClueModus] = useState('Pig Butchering / High-Yield Staking Smart Contract Drain');
  
  // Analyst Form State
  const [analystCluster, setAnalystCluster] = useState('CL-1028 (Deposit Sweep Network)');
  const [analystVasp, setAnalystVasp] = useState('Binance Hot Wallet 6');
  const [analystDecay, setAnalystDecay] = useState('14.2% peel reduction across 4 hops');

  // Admin Form State
  const [adminVaspTarget, setAdminVaspTarget] = useState('Binance Compliance & Investigations Unit');
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchAllData = () => {
    Promise.all([
      api.get('/cases').catch(() => ({ data: [] })),
      api.get('/alerts').catch(() => ({ data: [] })),
      api.get('/vasps').catch(() => ({ data: [] })),
    ]).then(([casesRes, alertsRes, vaspsRes]) => {
      setCases(casesRes.data || []);
      setAlerts(alertsRes.data || []);
      setVasps(vaspsRes.data || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleCopyWallet = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInspectorSubmitClue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/cases/${selectedCaseId}/inspect-clue`, {
        title: clueTitle,
        description: `Inspector documented clue: ${clueTitle}. Associated wallet: ${clueWallet}`,
        discovered_wallet: clueWallet,
        modus_operandi: clueModus,
      });
      setActionSuccess(`Clue linked to case ${selectedCaseId} and dispatched to Forensic Analyst Lab!`);
      fetchAllData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || 'Failed to submit clue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnalystSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/cases/${selectedCaseId}/submit-analysis`, {
        title: `Topology & Cluster Analysis (${analystCluster})`,
        peel_chain_volume_decay: analystDecay,
        identified_cluster: analystCluster,
        vasp_exit_point: analystVasp,
        confidence_score: 95,
      });
      setActionSuccess(`Mathematical Proof generated for ${selectedCaseId} and submitted to Directorate Admin!`);
      fetchAllData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || 'Failed to submit proof');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post(`/cases/${selectedCaseId}/validate`, {
        decision: 'APPROVED',
        target_vasp: adminVaspTarget,
        freeze_amount_usd: 481305.0,
      });
      setActionSuccess(`Validation Certified! Digital Seal SHA-256 generated. Section 91 CrPC Freeze Order Dispatched to ${adminVaspTarget}!`);
      fetchAllData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || 'Failed to validate case');
    } finally {
      setSubmitting(false);
    }
  };

  const isInvestigator = user?.role === 'INVESTIGATOR';
  const isAnalyst = user?.role === 'ANALYST';
  const isAdmin = user?.role === 'ADMIN';

  const primaryCase = cases.find(c => (c.case_number || c.case_id) === 'CYB-2026-00421') || cases[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Warm Officer Greeting & Workbench Header */}
      <div className="bg-white border border-[#EAE6DF] rounded-2xl p-6 md:p-7 shadow-[0_1px_3px_rgba(32,28,24,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#788292]">
              National Cyber Crime Reporting Portal • SIH 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-semibold text-emerald-700">Mainnet Synced</span>
          </div>
          <h1 className="text-2xl font-bold text-[#191E24] tracking-tight">
            {isInvestigator && `Welcome, Inspector ${user?.full_name || 'Rao'}`}
            {isAnalyst && `Welcome, Analyst ${user?.full_name || 'Dr. Roy'}`}
            {isAdmin && `Welcome, Director ${user?.full_name || 'Verma'}`}
          </h1>
          <p className="text-xs text-[#5C6470] max-w-2xl leading-relaxed">
            {isInvestigator && 'Your role: Inspect raw field clues, classify fraud modus operandi, and advance cases to the forensic lab.'}
            {isAnalyst && 'Your role: Trace multi-hop transaction topologies, calculate peeling chain volume decay, and build cluster proofs.'}
            {isAdmin && 'Your role: Review evidentiary proof, certify digital SHA-256 seals, and issue Section 91 CrPC asset freeze orders.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/investigate')}
            className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-[#191E24] text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#5C6470]" />
            <span>Profile Wallet</span>
          </button>
          
          <button
            onClick={() => navigate('/graph')}
            className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-[#191E24] text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all shadow-xs"
          >
            <GitFork className="w-3.5 h-3.5 text-[#5C6470]" />
            <span>Topology Graph</span>
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="px-4 py-2.5 bg-[#1E2E4A] hover:bg-[#15233B] text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Evidentiary Vault</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start space-x-3 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5">
            <div className="font-bold text-emerald-900">Operation Recorded</div>
            <div className="text-emerald-800">{actionSuccess}</div>
          </div>
        </div>
      )}

      {/* 2. Lead Active Case Dossier Spotlight */}
      <div className="bg-[#FFFFFF] border border-[#EAE6DF] rounded-2xl p-6 md:p-7 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F2EFE9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-[#1E2E4A]">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-[#1E2E4A]">CYB-2026-00421</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  primaryCase?.status === 'VALIDATED_AND_SUBPOENA_ISSUED' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : primaryCase?.status === 'PENDING_VALIDATION'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : primaryCase?.status === 'UNDER_ANALYSIS'
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-stone-50 text-stone-800 border-stone-200'
                }`}>
                  {primaryCase?.status || 'UNDER_ANALYSIS'}
                </span>
                <span className="text-[11px] text-[#788292] font-medium hidden sm:inline">
                  • FIR No. 409/2026 (Cyber Crime PS Bengaluru)
                </span>
              </div>
              <div className="text-sm font-bold text-[#191E24] mt-0.5">
                {primaryCase?.title || 'Operation Crystal Peel: Fake Staking dApp Syndicate'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopyWallet('0x71c8491c39049a46399b009e51b14798380ad7f4')}
              className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] rounded-lg text-xs font-mono text-[#5C6470] flex items-center space-x-1.5"
              title="Copy Target Wallet Address"
            >
              <span className="truncate max-w-[140px]">0x71c8491c39049...</span>
              <Copy className="w-3 h-3 text-[#788292]" />
            </button>
            <button
              onClick={() => navigate(`/cases/${primaryCase?.id || primaryCase?.case_id || 'CYB-2026-00421'}`)}
              className="px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-xs font-bold text-[#191E24] rounded-lg flex items-center space-x-1"
            >
              <span>Inspect Full Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3-Stage Investigation Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Stage 1 */}
          <div className={`p-4 rounded-xl border transition-all ${
            isInvestigator 
              ? 'bg-[#EFF6FF] border-[#BFDBFE] ring-2 ring-blue-100' 
              : 'bg-[#FAF8F5] border-[#EAE6DF]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                1. Field Clues & Vector
              </span>
              {isInvestigator && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-700 text-white rounded-md">
                  YOUR TURN
                </span>
              )}
            </div>
            <div className="font-bold text-xs text-[#191E24] mt-1.5">Pig Butchering & Telegram Mule</div>
            <p className="text-[11px] text-[#5C6470] mt-1">
              Documented by Inspector Rao • 14.85 ETH stolen via malicious approval.
            </p>
          </div>

          {/* Stage 2 */}
          <div className={`p-4 rounded-xl border transition-all ${
            isAnalyst 
              ? 'bg-[#FEF3C7]/60 border-[#FDE68A] ring-2 ring-amber-100' 
              : 'bg-[#FAF8F5] border-[#EAE6DF]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                2. Forensic Topology Math
              </span>
              {isAnalyst && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-700 text-white rounded-md">
                  YOUR TURN
                </span>
              )}
            </div>
            <div className="font-bold text-xs text-[#191E24] mt-1.5">Cluster CL-1028 & Peeling Chain</div>
            <p className="text-[11px] text-[#5C6470] mt-1">
              Attributed to Binance Hot Wallet 6 with 95% mathematical confidence.
            </p>
          </div>

          {/* Stage 3 */}
          <div className={`p-4 rounded-xl border transition-all ${
            isAdmin 
              ? 'bg-[#DCFCE7]/60 border-[#BBF7D0] ring-2 ring-emerald-100' 
              : 'bg-[#FAF8F5] border-[#EAE6DF]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                3. Judicial Validation & Freeze
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-700 text-white rounded-md">
                  YOUR TURN
                </span>
              )}
            </div>
            <div className="font-bold text-xs text-[#191E24] mt-1.5">Section 91 CrPC Subpoena</div>
            <p className="text-[11px] text-[#5C6470] mt-1">
              Cryptographic SHA-256 seal issued for emergency exchange asset freeze.
            </p>
          </div>
        </div>

        {/* Dynamic Contextual Action Card */}
        {isInvestigator && (
          <div className="bg-[#FAF8F5] border border-[#BFDBFE] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-700" />
                <h3 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  Field Inspector Workspace: Log Modus Operandi & Dispatch Case
                </h3>
              </div>
              <span className="text-[11px] text-blue-800 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Action Required
              </span>
            </div>

            <form onSubmit={handleInspectorSubmitClue} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Case ID</label>
                  <input
                    type="text"
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Suspect Wallet Address</label>
                  <input
                    type="text"
                    value={clueWallet}
                    onChange={(e) => setClueWallet(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Crime Vector / Modus Operandi</label>
                  <input
                    type="text"
                    value={clueModus}
                    onChange={(e) => setClueModus(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Field Clue & Incident Discovery</label>
                <input
                  type="text"
                  value={clueTitle}
                  onChange={(e) => setClueTitle(e.target.value)}
                  className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Registering...' : 'Register Clue & Dispatch to Forensics Lab'}</span>
              </button>
            </form>
          </div>
        )}

        {isAnalyst && (
          <div className="bg-[#FAF8F5] border border-[#FDE68A] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-amber-700" />
                <h3 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  Intelligence Analyst Workspace: Submit Peeling Chain & Cluster Proof
                </h3>
              </div>
              <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Mathematical Verification
              </span>
            </div>

            <form onSubmit={handleAnalystSubmitProof} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Case Target</label>
                  <input
                    type="text"
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] font-mono focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Identified Cluster Entity</label>
                  <input
                    type="text"
                    value={analystCluster}
                    onChange={(e) => setAnalystCluster(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] font-mono focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Attributed VASP Exit</label>
                  <input
                    type="text"
                    value={analystVasp}
                    onChange={(e) => setAnalystVasp(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Peel-Chain Mathematical Heuristic</label>
                <input
                  type="text"
                  value={analystDecay}
                  onChange={(e) => setAnalystDecay(e.target.value)}
                  className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] focus:outline-none focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Mathematical Proof to Directorate Admin'}</span>
              </button>
            </form>
          </div>
        )}

        {isAdmin && (
          <div className="bg-[#FAF8F5] border border-[#BBF7D0] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-700" />
                <h3 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  Enforcement Admin Workspace: Review Evidence & Authorize Section 91 CrPC Notice
                </h3>
              </div>
              <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Judicial Authorization
              </span>
            </div>

            <form onSubmit={handleAdminValidate} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Target Case to Certify</label>
                  <input
                    type="text"
                    value={selectedCaseId}
                    onChange={(e) => setSelectedCaseId(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] font-mono focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#5C6470] block mb-1">Target Exchange for Asset Freeze</label>
                  <input
                    type="text"
                    value={adminVaspTarget}
                    onChange={(e) => setAdminVaspTarget(e.target.value)}
                    className="w-full bg-white border border-[#EAE6DF] rounded-lg px-3 py-1.5 text-xs text-[#191E24] focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
              >
                <Award className="w-3.5 h-3.5" />
                <span>{submitting ? 'Certifying...' : 'Sign Digital SHA-256 Seal & Issue Freeze Order'}</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. Two-Column Asymmetric Dossier & Intelligence Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Active Cases Registry (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#EAE6DF] rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(32,28,24,0.03)] flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-[#F2EFE9] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <FolderKanban className="w-4 h-4 text-[#1E2E4A]" />
                <h2 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                  Active Investigation Docket
                </h2>
              </div>
              <button
                onClick={() => navigate('/cases')}
                className="text-xs text-[#254394] hover:text-[#1E2E4A] font-bold flex items-center space-x-1"
              >
                <span>View All Cases</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="soft-table">
                <thead>
                  <tr>
                    <th>Case Docket</th>
                    <th>Investigation Title</th>
                    <th>Suspect Target</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c) => (
                    <tr key={c.id || c.case_id}>
                      <td className="font-mono font-bold text-xs text-[#1E2E4A]">
                        {c.case_number || c.case_id || 'CYB-2026-00421'}
                      </td>
                      <td>
                        <div className="font-semibold text-xs text-[#191E24]">{c.title}</div>
                        <div className="text-[11px] text-[#788292]">{c.fraud_type || 'Crypto Scam'}</div>
                      </td>
                      <td>
                        <div className="font-mono text-xs text-[#5C6470] truncate max-w-[150px]">
                          {c.primary_wallet || '0x71c8491c39049a46399b009e51b14798380ad7f4'}
                        </div>
                      </td>
                      <td>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          c.status === 'VALIDATED_AND_SUBPOENA_ISSUED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          c.status === 'PENDING_VALIDATION' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          c.status === 'UNDER_ANALYSIS' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-stone-50 text-stone-800 border-stone-200'
                        }`}>
                          {c.status || 'OPEN_INVESTIGATION'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/cases/${c.id || c.case_id}`)}
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-xs font-bold text-[#191E24] rounded-lg transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE6DF] text-xs text-[#5C6470] flex items-center justify-between">
            <span>Showing {cases.length} active multi-jurisdictional matters</span>
            <span className="font-semibold text-[#191E24]">Indian Cybercrime Coordination Centre (I4C) Compliant</span>
          </div>
        </div>

        {/* Column 2: Live Threat & Attribution Intelligence (1 col) */}
        <div className="bg-white border border-[#EAE6DF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(32,28,24,0.03)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F2EFE9] pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-bold text-[#191E24] uppercase tracking-wide">
                Live Intelligence Radar
              </h2>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              High Severity
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#191E24]">VASP Deposit Sweeper Alert</span>
                <span className="text-[10px] text-[#788292]">2 mins ago</span>
              </div>
              <p className="text-xs text-[#5C6470]">
                Binance Hot Wallet 6 received <span className="font-semibold text-[#191E24]">3.2 ETH</span> from peel chain hop 4.
              </p>
              <div className="text-[11px] font-mono text-blue-700 truncate">
                0xd8da6bf26964af9d7eed9e03e53415d37aa96045
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#191E24]">Cross-Chain Bridge Swap</span>
                <span className="text-[10px] text-[#788292]">14 mins ago</span>
              </div>
              <p className="text-xs text-[#5C6470]">
                Thorchain Bridge transfer: 1.5 ETH converted to BTC taproot address.
              </p>
              <div className="text-[11px] font-mono text-blue-700 truncate">
                bc1p5d7rjq7g6rd2ee00yfnc...
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#191E24]">Tornado.Cash Cashout Pattern</span>
                <span className="text-[10px] text-[#788292]">1 hr ago</span>
              </div>
              <p className="text-xs text-[#5C6470]">
                100 ETH mixer note split into 10 discrete unlinked addresses.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/alerts')}
            className="w-full py-2 bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-xs font-bold text-[#191E24] rounded-xl transition-colors text-center block"
          >
            Open Live Threat Stream
          </button>
        </div>
      </div>
    </div>
  );
};
