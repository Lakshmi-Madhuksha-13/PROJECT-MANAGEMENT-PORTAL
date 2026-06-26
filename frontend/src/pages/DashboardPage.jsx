import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { motion } from 'framer-motion';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => {
      setStats(res.data.stats);
      setRecentProjects(res.data.recentProjects);
      setRecentTasks(res.data.recentTasks);
    }).catch(() => {
      setStats({ totalProjects: 0, activeProjects: 0, completedProjects: 0, totalTasks: 0, pendingTasks: 0, inProgressTasks: 0, completedTasks: 0, highPriorityTasks: 0, overdueTasks: 0 });
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats?.totalProjects ?? '--' },
    { label: 'Active Projects', value: stats?.activeProjects ?? '--' },
    { label: 'Completed Projects', value: stats?.completedProjects ?? '--' },
    { label: 'Total Tasks', value: stats?.totalTasks ?? '--' },
    { label: 'Pending Tasks', value: stats?.pendingTasks ?? '--' },
    { label: 'In Progress', value: stats?.inProgressTasks ?? '--' },
    { label: 'Completed Tasks', value: stats?.completedTasks ?? '--' },
    { label: 'High Priority', value: stats?.highPriorityTasks ?? '--' },
    { label: 'Overdue Tasks', value: stats?.overdueTasks ?? '--' }
  ];

  return (
    <div className="space-y-8 slide-up">
      <div className="grid gap-6 md:grid-cols-[1.8fr_1fr]">
        <div className="glass-card rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Welcome back</p>
          <h2 className="mt-4 text-3xl font-semibold">ProjectNest dashboard</h2>
          <p className="mt-2 text-slate-400">Track your work, deadlines and progress in one place.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Current time</p>
              <p className="mt-3 text-3xl font-semibold">{new Date().toLocaleTimeString()}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Today</p>
              <p className="mt-3 text-3xl font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Productivity score</p>
          <div className="mt-8 flex items-end gap-4">
            <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-4 text-white shadow-xl shadow-cyan-500/20">
              <p className="text-5xl font-semibold">92</p>
              <p className="text-sm text-slate-100/80">/100</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Collaboration at peak</p>
              <p className="mt-2 text-slate-400">Keep moving with quick actions and deadlines in view.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <motion.div key={card.label} className="glass-card rounded-[2rem] p-6" whileHover={{ y: -4 }}>
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold">{card.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Recent Projects</h3>
              <p className="mt-1 text-sm text-slate-400">Latest active project snapshots.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-slate-400">Loading projects...</p>
            ) : recentProjects.length ? recentProjects.map((project) => (
              <div key={project.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-slate-400">{project.status} • {project.priority}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">{project.progress}%</span>
                </div>
              </div>
            )) : (
              <div className="rounded-3xl border border-dashed border-slate-700/70 bg-slate-950/70 p-8 text-center text-slate-400">
                <p className="text-lg font-semibold text-slate-100">No projects yet</p>
                <p className="mt-2">Create a project and it will appear here immediately.</p>
              </div>
            )}
          </div>
        </div>
        <div className="glass-card rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Recent Activity</h3>
              <p className="mt-1 text-sm text-slate-400">Task updates and notifications.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-slate-400">Loading tasks...</p>
            ) : recentTasks.length ? recentTasks.map((task) => (
              <div key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold">{task.title}</p>
                <p className="mt-1 text-sm text-slate-400">Status: {task.status} • Priority: {task.priority}</p>
              </div>
            )) : (
              <div className="rounded-3xl border border-dashed border-slate-700/70 bg-slate-950/70 p-8 text-center text-slate-400">
                <p className="text-lg font-semibold text-slate-100">No tasks yet</p>
                <p className="mt-2">Create a task and the activity feed will update automatically.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
