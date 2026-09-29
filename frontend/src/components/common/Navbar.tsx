import React, { useState } from 'react';
import { Shield, Search, Bell, LogOut, ChevronDown, Check, User, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/client';

export const Navbar: React.FC = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const switchRole = async (targetRole: string) => {
    setShowRoleMenu(false);
    let email = 'investigator@tracex.demo';
    let pass = 'Investigator@123';
    if (targetRole === 'ADMIN') { email = 'admin@tracex.demo'; pass = 'Admin@123'; }
    if (targetRole === 'ANALYST') { email = 'analyst@tracex.demo'; pass = 'Analyst@123'; }

    try {
      const res = await api.post('/auth/login', { email, password: pass });
      login(res.data.user, res.data.access_token);
      if (targetRole === 'ADMIN') navigate('/admin');
      else if (targetRole === 'ANALYST') navigate('/graph');
      else navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  const roleName = user?.role === 'ADMIN' ? 'Command Director' :
                   user?.role === 'ANALYST' ? 'Forensic Analyst' : 'Field Inspector';

  const roleBadgeStyle = user?.role === 'ADMIN' 
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
    : user?.role === 'ANALYST' 
    ? 'bg-amber-50 text-amber-800 border-amber-200' 
    : 'bg-blue-50 text-blue-800 border-blue-200';

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#EAE6DF] px-6 flex items-center justify-between sticky top-0 z-40 select-none shadow-[0_1px_4px_rgba(32,28,24,0.02)]">
      {/* Brand & Division Indicator */}
      <div className="flex items-center space-x-5">
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 bg-[#1E2E4A] group-hover:bg-[#15233B] transition-colors rounded-xl flex items-center justify-center text-white shadow-sm shadow-[#1E2E4A]/10">
            <Shield className="w-4 h-4 text-[#FDE047]" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#191E24] tracking-tight flex items-center space-x-1.5">
              <span>TRACE-X</span>
              <span className="text-[10px] font-semibold bg-[#F4F1EB] text-[#5C6470] px-1.5 py-0.2 rounded border border-[#EAE6DF]">
                v1.0
              </span>
            </div>
            <div className="text-[11px] text-[#788292] font-medium">Digital Forensics Platform</div>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-[#EAE6DF] hidden sm:block"></div>

        {/* Division Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${roleBadgeStyle}`}
          >
            <span className={`w-2 h-2 rounded-full ${
              user?.role === 'ADMIN' ? 'bg-emerald-500' :
              user?.role === 'ANALYST' ? 'bg-amber-500' : 'bg-blue-600'
            }`}></span>
            <span>{roleName} Desk</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[#EAE6DF] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 py-2 text-[11px] font-bold text-[#8C93A0] uppercase tracking-wider border-b border-[#F2EFE9]">
                Switch Active Department
              </div>

              <button
                onClick={() => switchRole('INVESTIGATOR')}
                className="w-full text-left px-4 py-3 hover:bg-[#FAF8F5] flex items-center justify-between transition-colors group"
              >
                <div>
                  <div className="font-semibold text-xs text-[#191E24] group-hover:text-blue-700">1. Field Inspector</div>
                  <div className="text-[11px] text-[#788292]">Document crime modus operandi & clues</div>
                </div>
                {user?.role === 'INVESTIGATOR' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => switchRole('ANALYST')}
                className="w-full text-left px-4 py-3 hover:bg-[#FAF8F5] flex items-center justify-between transition-colors group"
              >
                <div>
                  <div className="font-semibold text-xs text-[#191E24] group-hover:text-amber-700">2. Intelligence Analyst</div>
                  <div className="text-[11px] text-[#788292]">Peel-chain math & cluster proof (CL-1028)</div>
                </div>
                {user?.role === 'ANALYST' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              <button
                onClick={() => switchRole('ADMIN')}
                className="w-full text-left px-4 py-3 hover:bg-[#FAF8F5] flex items-center justify-between transition-colors group"
              >
                <div>
                  <div className="font-semibold text-xs text-[#191E24] group-hover:text-emerald-700">3. Enforcement Admin</div>
                  <div className="text-[11px] text-[#788292]">Digital SHA-256 seal & Section 91 CrPC</div>
                </div>
                {user?.role === 'ADMIN' && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center Search Input */}
      <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-6 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C93A0] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search address (0x71c...), TX hash, or case file..."
            className="w-full bg-[#FAF8F5] border border-[#EAE6DF] focus:border-[#254394] focus:bg-white rounded-xl pl-9 pr-12 py-2 text-xs text-[#191E24] placeholder-[#8C93A0] focus:outline-none focus:ring-2 focus:ring-[#254394]/10 transition-all font-mono"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#8C93A0] bg-[#EAE6DF] px-1.5 py-0.5 rounded">
            ⌘K
          </div>
        </div>
      </form>

      {/* User Actions & Clearance Status */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate('/alerts')}
          className="p-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EAE6DF] text-[#5C6470] hover:text-[#191E24] transition-colors relative"
          title="Threat Radar"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
        </button>

        <div className="flex items-center space-x-3 pl-3 border-l border-[#EAE6DF]">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-[#191E24]">{user?.full_name || 'Inspector Rao'}</div>
            <div className="text-[11px] text-[#788292] font-mono">{user?.badge_number || 'CYB-LE-4091'}</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#1E2E4A] border border-[#1E2E4A] flex items-center justify-center text-white font-bold text-xs shadow-xs">
            {user?.full_name?.charAt(0) || 'R'}
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl text-[#8C93A0] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
