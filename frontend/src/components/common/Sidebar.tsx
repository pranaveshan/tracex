import React from 'react';
import { 
  Compass,
  Search, 
  GitFork, 
  FolderKanban, 
  Building2, 
  Boxes, 
  BellRing, 
  Shuffle, 
  Bot, 
  FileText, 
  ShieldAlert,
  CheckCircle2,
  FileBadge
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const operationalNav = [
    { label: 'Operations Desk', path: '/dashboard', icon: Compass },
    { label: 'Wallet Profiler', path: '/investigate', icon: Search },
    { label: 'Topology Visualizer', path: '/graph', icon: GitFork },
    { label: 'Investigation Cases', path: '/cases', icon: FolderKanban },
  ];

  const intelligenceNav = [
    { label: 'VASP Directory', path: '/vasps', icon: Building2 },
    { label: 'Cluster Entities', path: '/clusters', icon: Boxes },
    { label: 'Live Threat Stream', path: '/alerts', icon: BellRing },
    { label: 'Cross-Chain Bridges', path: '/cross-chain', icon: Shuffle },
    { label: 'Forensic Assistant', path: '/intelligence', icon: Bot },
  ];

  const complianceNav = [
    { label: 'Evidentiary Reports', path: '/reports', icon: FileText },
  ];

  if (isAdmin) {
    complianceNav.push({ label: 'System Audit Ledger', path: '/admin', icon: ShieldAlert });
  }

  return (
    <aside className="w-60 bg-[#FFFFFF] border-r border-[#EAE6DF] flex flex-col justify-between select-none shadow-[1px_0_4px_rgba(32,28,24,0.02)]">
      <div className="py-5 px-3 space-y-5 overflow-y-auto">
        {/* Section 1: Active Operations */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold text-[#8C93A0] uppercase tracking-wider">
            OPERATIONS
          </div>
          <div className="space-y-0.5">
            {operationalNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#1E2E4A] text-white shadow-sm'
                        : 'text-[#5C6470] hover:text-[#191E24] hover:bg-[#FAF8F5]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 opacity-90" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Section 2: Intelligence Engine */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold text-[#8C93A0] uppercase tracking-wider">
            INTELLIGENCE
          </div>
          <div className="space-y-0.5">
            {intelligenceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#1E2E4A] text-white shadow-sm'
                        : 'text-[#5C6470] hover:text-[#191E24] hover:bg-[#FAF8F5]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 opacity-90" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Section 3: Legal & Governance */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold text-[#8C93A0] uppercase tracking-wider">
            LEGAL & AUDIT
          </div>
          <div className="space-y-0.5">
            {complianceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#1E2E4A] text-white shadow-sm'
                        : 'text-[#5C6470] hover:text-[#191E24] hover:bg-[#FAF8F5]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0 opacity-90" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Compliance Badge */}
      <div className="p-4 border-t border-[#EAE6DF] bg-[#FAF8F5]">
        <div className="flex items-center space-x-2">
          <FileBadge className="w-4 h-4 text-emerald-600" />
          <div className="text-xs font-bold text-[#191E24]">Indian Legal Standard</div>
        </div>
        <p className="text-[11px] text-[#788292] mt-1 leading-normal">
          Sec 91 CrPC • Sec 65B Evidence Act cryptographic chain of custody.
        </p>
      </div>
    </aside>
  );
};
