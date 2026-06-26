import { Link } from 'react-router-dom';

function HelpPage() {
  return (
    <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
      <div className="mb-6">
        <Link to="/" className="text-cyan-300 hover:text-cyan-200">← Back to Home</Link>
      </div>
      <h2 className="text-3xl font-semibold">Help Center</h2>
      <p className="mt-2 text-slate-400">Find guidance on using ProjectNest features.</p>
      <div className="mt-8 space-y-5">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold">Account access</h3>
          <p className="mt-2 text-slate-400">Login, registration and password support.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold">Project workflows</h3>
          <p className="mt-2 text-slate-400">Create projects, assign tasks, and track progress.</p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
