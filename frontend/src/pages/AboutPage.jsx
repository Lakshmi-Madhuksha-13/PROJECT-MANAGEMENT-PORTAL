import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
      <div className="mb-6">
        <Link to="/" className="text-cyan-300 hover:text-cyan-200">← Back to Home</Link>
      </div>
      <h2 className="text-3xl font-semibold">About ProjectNest</h2>
      <p className="mt-2 text-slate-400">ProjectNest is a modern full-stack portal for planning, tracking, and completing work across teams.</p>
      <div className="mt-8 space-y-4 text-slate-300">
        <p>Use the app to create projects, assign tasks, monitor progress, and update status in real time.</p>
        <p>ProjectNest makes it simple to complete work, extend deadlines, and keep everyone aligned from anywhere.</p>
      </div>
      <div className="mt-8 rounded-3xl bg-slate-900/70 p-6 border border-white/10 text-slate-300">
        <p className="font-semibold text-slate-100">Contact</p>
        <p className="mt-2">Email: <a href="mailto:support@projectnest.app" className="text-cyan-300 hover:text-cyan-200">support@projectnest.app</a></p>
      </div>
      <p className="mt-6 text-sm text-slate-500">© 2026 ProjectNest. All rights reserved.</p>
    </div>
  );
}

export default AboutPage;
