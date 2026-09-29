import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, KeyRound, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/client';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);

    const loginEmail = customEmail || email;
    const loginPass = customPass || password;

    try {
      const res = await api.post('/auth/login', {
        email: loginEmail,
        password: loginPass,
      });

      login(res.data.user, res.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    handleLogin(undefined, roleEmail, rolePass);
  };

  return (
    <div className="w-full max-w-md bg-[#0b1120] border border-slate-800 rounded-lg p-6 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 mx-auto">
          <Shield className="w-5 h-5" />
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight font-mono">TRACE-X INTELLIGENCE</h1>
        <p className="text-xs text-slate-400">Cryptocurrency Fraud Attribution & Legal Intelligence System</p>
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-500/30 rounded text-xs text-red-400 font-mono">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 font-mono">OFFICIAL EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="investigator@tracex.demo"
            required
            className="w-full bg-[#070b14] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 font-mono">AUTHORIZATION KEY / PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full bg-[#070b14] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50"
        >
          {loading ? (
            <span>Authenticating Credentials...</span>
          ) : (
            <>
              <span>Authenticate & Enter Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono text-center">
          1-Click Role Login Selector
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => quickLogin('investigator@tracex.demo', 'Investigator@123')}
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-800 text-[11px] font-mono text-sky-300 text-center transition-colors"
          >
            <div className="font-bold">Investigator</div>
            <div className="text-[9px] text-slate-500">Case Lead</div>
          </button>
          <button
            onClick={() => quickLogin('admin@tracex.demo', 'Admin@123')}
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-800 text-[11px] font-mono text-emerald-300 text-center transition-colors"
          >
            <div className="font-bold">Admin</div>
            <div className="text-[9px] text-slate-500">Director</div>
          </button>
          <button
            onClick={() => quickLogin('analyst@tracex.demo', 'Analyst@123')}
            className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-slate-800 text-[11px] font-mono text-amber-300 text-center transition-colors"
          >
            <div className="font-bold">Analyst</div>
            <div className="text-[9px] text-slate-500">Forensics</div>
          </button>
        </div>
      </div>
    </div>
  );
};
