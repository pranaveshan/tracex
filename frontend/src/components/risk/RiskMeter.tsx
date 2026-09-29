import React from 'react';

interface RiskMeterProps {
  score: number;
  level?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, level, size = 'md' }) => {
  const calculatedLevel = level || (score >= 80 ? 'CRITICAL' : score >= 60 ? 'HIGH' : score >= 35 ? 'MEDIUM' : 'LOW');
  
  const getBadgeStyle = () => {
    if (score >= 80) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (score >= 60) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (score >= 35) return 'text-sky-700 bg-sky-50 border-sky-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const getBarStyle = () => {
    if (score >= 80) return 'bg-rose-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 35) return 'bg-sky-500';
    return 'bg-emerald-500';
  };

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 border text-xs font-semibold rounded-md ${getBadgeStyle()}`}>
        <span>{score}/100</span>
        <span>•</span>
        <span>{calculatedLevel}</span>
      </span>
    );
  }

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-slate-600 font-semibold uppercase tracking-wider text-[11px]">Calculated Risk Index</span>
        <span className={`px-2 py-0.5 border text-xs font-semibold rounded-full ${getBadgeStyle()}`}>
          {calculatedLevel} RISK ({score}/100)
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getBarStyle()} transition-all duration-500`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-[11px] font-medium text-slate-400">
        <span>0 (Low Risk)</span>
        <span>50 (Moderate)</span>
        <span>100 (Critical Flag)</span>
      </div>
    </div>
  );
};
