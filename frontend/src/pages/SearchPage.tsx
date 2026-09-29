import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/client';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (query) api.get(`/search?q=${encodeURIComponent(query)}`).then((res) => setResults(res.data)).catch(console.error);
  }, [query]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold font-mono text-white">SEARCH RESULTS: "{query}"</h1>
      {results?.cases?.map((c: any) => (
        <div key={c.id} onClick={() => navigate(`/cases/${c.case_id}`)} className="p-4 rounded-xl bg-[#0b1120] border border-slate-800 cursor-pointer">
          <div className="text-xs font-bold font-mono text-cyan-400">{c.case_id}</div>
          <div className="text-sm font-bold text-white">{c.title}</div>
        </div>
      ))}
    </div>
  );
};
