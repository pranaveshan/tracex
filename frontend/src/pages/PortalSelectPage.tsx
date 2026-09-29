import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, Cpu, Award, ArrowRight, CheckCircle2, Lock, FileBadge } from 'lucide-react';

export const PortalSelectPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1E2E4A] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Shield className="w-5 h-5 text-[#FDE047]" />
          </div>
          <div>
            <div className="font-bold text-base text-[#191E24] tracking-tight">TRACE-X</div>
            <div className="text-xs text-[#788292]">National Cybercrime Platform • SIH 2026</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Official Agency Gateway</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto py-10 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#788292] bg-[#F4F1EB] px-3 py-1 rounded-full border border-[#EAE6DF]">
            Operational Division Sign-In
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191E24] tracking-tight">
            Select Your Department Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6470] leading-relaxed">
            TRACE-X implements a three-tier institutional separation of duties. Choose your operational clearance level below to access your dedicated workspace.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Inspector */}
          <div 
            onClick={() => navigate('/login/investigator')}
            className="bg-white border border-[#EAE6DF] hover:border-blue-400 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(32,28,24,0.03)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Division 01</div>
                <h2 className="text-lg font-bold text-[#191E24] mt-0.5 group-hover:text-blue-700 transition-colors">
                  Field Inspector
                </h2>
                <p className="text-xs text-[#5C6470] mt-2 leading-relaxed">
                  Frontline cyber investigation. Log FIR complaints, isolate crime modus operandi, record Telegram/dApp evidence, and dispatch cases.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#F2EFE9]">
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Victim Complaint Onboarding</span>
                </div>
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Modus Operandi Tagging</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-blue-700 border-t border-[#F2EFE9]">
              <span>Enter Inspector Desk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Analyst */}
          <div 
            onClick={() => navigate('/login/analyst')}
            className="bg-white border border-[#EAE6DF] hover:border-amber-400 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(32,28,24,0.03)] hover:shadow-[0_8px_24px_rgba(217,119,6,0.08)] transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Division 02</div>
                <h2 className="text-lg font-bold text-[#191E24] mt-0.5 group-hover:text-amber-700 transition-colors">
                  Intelligence Analyst
                </h2>
                <p className="text-xs text-[#5C6470] mt-2 leading-relaxed">
                  Deep forensics lab. Trace multi-hop peeling chains, calculate volume decay, identify co-spending clusters (CL-1028), and attribute VASP deposits.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#F2EFE9]">
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Peel Chain Dissipation Math</span>
                </div>
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>VASP Deposit Attribution</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-700 border-t border-[#F2EFE9]">
              <span>Enter Forensics Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Admin */}
          <div 
            onClick={() => navigate('/login/admin')}
            className="bg-white border border-[#EAE6DF] hover:border-emerald-400 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(32,28,24,0.03)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Division 03</div>
                <h2 className="text-lg font-bold text-[#191E24] mt-0.5 group-hover:text-emerald-700 transition-colors">
                  Enforcement Admin
                </h2>
                <p className="text-xs text-[#5C6470] mt-2 leading-relaxed">
                  Supervisory directorate. Validate forensic findings, certify digital SHA-256 seal, and issue Section 91 CrPC asset freeze orders to exchanges.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#F2EFE9]">
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Section 91 CrPC Freeze Subpoenas</span>
                </div>
                <div className="text-[11px] text-[#788292] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Cryptographic Digital Seals</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-700 border-t border-[#F2EFE9]">
              <span>Enter Directorate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl w-full mx-auto text-center text-xs text-[#788292] border-t border-[#EAE6DF] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <FileBadge className="w-4 h-4 text-emerald-600" />
          <span>Compliant with Indian Evidence Act (Sec 65B) & CrPC (Sec 91)</span>
        </div>
        <div>
          <span>Smart India Hackathon 2026 • Government of India</span>
        </div>
      </div>
    </div>
  );
};
