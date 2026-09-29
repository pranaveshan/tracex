import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { IntelligenceAssistantCard } from '../components/ai/IntelligenceAssistantCard';
import { AIIntelligenceBrief } from '../types';

export const IntelligencePage: React.FC = () => {
  const [brief, setBrief] = useState<AIIntelligenceBrief | null>(null);
  useEffect(() => {
    api.post('/intelligence/summarize', { address: '0x71c8491c39049a46399b009e51b14798380ad7f4', case_id: 'CYB-2026-00421' })
      .then((res) => setBrief(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold font-mono text-white">AI INVESTIGATION ASSISTANT</h1>
      {brief && <IntelligenceAssistantCard data={brief} />}
    </div>
  );
};
