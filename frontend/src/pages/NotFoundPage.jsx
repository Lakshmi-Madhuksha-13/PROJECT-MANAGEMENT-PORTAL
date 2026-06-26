import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-[var(--text)] page-shell fade-in">
      <div className="glass-card w-full max-w-3xl rounded-[2rem] surface-panel p-10 text-center pop-in">
        <h1 className="text-6xl font-semibold">404</h1>
        <p className="mt-4 text-xl text-slate-300">Page not found. The route you tried does not exist.</p>
        <Link to="/" className="mt-8 inline-flex rounded-3xl bg-cyan-500/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">Back to home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
