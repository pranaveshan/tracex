import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/client';

export const AnalystLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('analyst@tracex.demo');
  const [password, setPassword] = useState('Analyst@123');
  const [badgeNumber, setBadgeNumber] = useState('CFA-992');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.access_token);
      navigate('/graph');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('analyst@tracex.demo');
    setPassword('Analyst@123');
    setBadgeNumber('CFA-992');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between p-6 select-none">
      <div className="max-w-md w-full mx-auto pt-6">
        <button
          onClick={() => navigate('/login')}
          className="text-xs font-semibold text-[#5C6470] hover:text-[#191E24] flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Division Selector</span>
        </button>
      </div>

      <div className="max-w-md w-full mx-auto my-auto bg-white border border-[#EAE6DF] rounded-2xl p-7 sm:p-8 shadow-[0_1px_3px_rgba(32,28,24,0.03),0_8px_24px_rgba(32,28,24,0.02)] space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Forensics Lab</div>
            <h1 className="text-xl font-bold text-[#191E24]">Analyst Sign-In</h1>
          </div>
        </div>

        <p className="text-xs text-[#5C6470] leading-relaxed">
          Access the topology graph visualizer, multi-hop peel chain dissipation calculators, and cluster proof generators.
        </p>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5C6470]">Forensic Certification ID</label>
            <input
              type="text"
              value={badgeNumber}
              onChange={(e) => setBadgeNumber(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#EAE6DF] focus:border-amber-600 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-[#191E24] font-mono focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5C6470]">Lab Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#EAE6DF] focus:border-amber-600 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-[#191E24] focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#5C6470]">Security Passphrase</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#EAE6DF] focus:border-amber-600 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-[#191E24] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            {loading ? 'Authenticating...' : 'Authenticate & Enter Forensics Lab'}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F2EFE9] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs text-amber-700 hover:text-amber-800 font-bold"
          >
            Fill Demo Credentials
          </button>
          <span className="text-[11px] text-[#8C93A0]">Clearance Level 2</span>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto text-center text-[11px] text-[#788292] pb-4">
        Certified Blockchain Forensic Analyst Division
      </div>
    </div>
  );
};
