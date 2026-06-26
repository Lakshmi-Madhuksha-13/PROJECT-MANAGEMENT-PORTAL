import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

function ReportsPage() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    api.get('/reports').then((res) => setReport(res.data)).catch(() => setReport({ projects: [], tasks: [] }));
  }, []);

  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        <h2 className="text-3xl font-semibold">Reports</h2>
        <p className="mt-2 text-slate-400">Export data, view summaries, and monitor completion trends.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {['PDF','CSV','Excel'].map((type) => (
            <button key={type} className="rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-slate-800/80 pop-in">Download {type}</button>
          ))}
        </div>
      </div>
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        <h3 className="text-2xl font-semibold">Project summary</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 surface-panel pop-in">
            <p className="text-sm text-slate-400">Projects</p>
            <p className="mt-3 text-3xl font-semibold">{report?.projects.length ?? '--'}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 surface-panel pop-in">
            <p className="text-sm text-slate-400">Tasks</p>
            <p className="mt-3 text-3xl font-semibold">{report?.tasks.length ?? '--'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
