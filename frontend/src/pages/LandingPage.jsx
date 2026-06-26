import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 text-white page-shell">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.3),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.3),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.12),transparent_35%,rgba(79,70,229,0.12))]" />
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 800 600\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'120\\' cy=\\'100\\' r=\\'30\\' fill=\\'rgba(56,189,248,0.12)\\'/%3E%3Ccircle cx=\\'680\\' cy=\\'320\\' r=\\'40\\' fill=\\'rgba(168,85,247,0.14)\\'/%3E%3C/svg%3E')" }} />
      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col items-center justify-center gap-10">
        <motion.div initial="hidden" animate="visible" variants={sectionVariants} transition={{ duration: 0.75, ease: 'easeOut' }} className="glass-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/50 p-10 shadow-glass backdrop-blur-xl pop-in">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_20%)]" />
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/60 px-4 py-2 text-sm text-slate-100 ring-1 ring-white/10 backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              ProjectNest • Premium project management
            </div>
            <div>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Build, manage, and scale with ProjectNest.</h1>
              <p className="mt-5 max-w-xl text-lg text-slate-300">A modern full-stack portfolio-ready SaaS project manager with immersive glassmorphism, animations, and secure JWT workflows.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20">
                Get Started
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mx-auto mt-16 max-w-6xl space-y-8">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card surface-panel rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glass">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Built for teams</p>
              <h2 className="mt-4 text-4xl font-semibold text-white">Organize your workflow from idea to launch.</h2>
            </div>
            <p className="max-w-2xl text-slate-400">Create projects, assign tasks, and track progress with a single dashboard designed to keep work visible and moving forward.</p>
          </div>
        </motion.section>
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} transition={{ duration: 0.6, delay: 0.2 }} className="grid gap-6 lg:grid-cols-3">
          {[
            { title: 'Real-time updates', description: 'See task status changes instantly across the app.', icon: '⚡' },
            { title: 'Deadline control', description: 'Extend deadlines and keep timelines flexible.', icon: '📅' },
            { title: 'Secure access', description: 'JWT auth and role-based access for every workspace.', icon: '🔒' }
          ].map((item) => (
            <div key={item.title} className="glass-card surface-panel rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-center pop-in">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 text-2xl shadow-xl">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.description}</p>
            </div>
          ))}
        </motion.section>
      </div>
    </div>
  );
}

export default LandingPage;
