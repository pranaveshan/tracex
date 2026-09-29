import React from 'react';
import { Shield, ArrowRight, Cpu, Database, Award, CheckCircle2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 text-slate-800 flex flex-col justify-between select-none">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-200/80 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 text-base">TRACE-X</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
            SIH 2026 Edition
          </span>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm shadow-indigo-200 flex items-center space-x-1.5"
        >
          <span>Access Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 space-y-12 text-center">
        <div className="space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Smart India Hackathon 2026 • Cyber Crime Investigation Division</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Real-Time Cryptocurrency Fraud Attribution & Blockchain Intelligence
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            An intuitive multi-tier platform for Law Enforcement and Forensics: inspect transaction clues, prove peel-chain volume dissipation, and authorize statutory Section 91 CrPC asset freeze notices.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200 flex items-center space-x-2"
          >
            <span>Enter Three-Tier Investigation Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-8">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">1. Inspector Clue Desk</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Intakes victim complaints, links suspect wallet addresses, isolates the modus operandi, and dispatches cases for forensic analysis.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">2. Analyst Topology Lab</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Computes peel-chain volume dissipation, maps multi-hop transaction graphs, and identifies deposit-sweeper exchange clusters.
            </p>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">3. Directorate Validation</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verifies forensic proofs, attaches cryptographic digital seals (SHA-256), and officially authorizes Section 91 CrPC asset freeze orders.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-14 border-t border-slate-200 px-8 flex items-center justify-between text-xs text-slate-500 bg-white">
        <div>TRACE-X • Smart India Hackathon 2026 Initiative</div>
        <div>Strictly for Authorized Law Enforcement & Forensics Use</div>
      </footer>
    </div>
  );
};
