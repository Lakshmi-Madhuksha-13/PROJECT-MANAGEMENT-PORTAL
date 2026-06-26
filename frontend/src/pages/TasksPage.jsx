import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', projectId: '', category: '', status: 'Pending', priority: 'Medium', deadline: '', assignedUserId: '', estimatedHours: '', tags: '', notes: '' });
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data.tasks);
  };

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data.projects);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', form);
      setTasks((prev) => [res.data.task, ...prev]);
      setForm({ title: '', description: '', projectId: '', category: '', status: 'Pending', priority: 'Medium', deadline: '', assignedUserId: '', estimatedHours: '', tags: '', notes: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create task');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleStatusUpdate = async (id, status) => {
    const res = await api.patch(`/tasks/${id}/status`, { status });
    setTasks((prev) => prev.map((task) => (task.id === id ? res.data.task : task)));
  };

  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 pop-in">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Tasks</h2>
            <p className="mt-2 text-slate-400">Add and manage tasks for your projects.</p>
          </div>
        </div>
        {error && <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task Title" className="input-field" required />
          <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} className="input-field" required>
            <option value="">Select Project</option>
            {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="input-field" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
            {['Pending','In Progress','Completed','On Hold','Cancelled'].map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="input-field">
            {['Low','Medium','High','Critical'].map((priority) => <option key={priority} value={priority}>{priority}</option>)}
          </select>
          <input value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} type="date" className="input-field" />
          <input value={form.assignedUserId} onChange={(e) => setForm({ ...form, assignedUserId: e.target.value })} placeholder="Assigned User ID" className="input-field" />
          <input value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })} type="number" placeholder="Estimated Hours" className="input-field" />
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags" className="input-field" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" placeholder="Description" className="input-field md:col-span-2" />
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="4" placeholder="Notes" className="input-field md:col-span-2" />
          <button type="submit" className="btn-primary md:col-span-2">Create Task</button>
        </form>
      </div>
      <div className="glass-card rounded-[2rem] p-8">
        <h3 className="text-2xl font-semibold">Task list</h3>
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
          {tasks.length ? (
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="border-b border-white/10 bg-slate-900/70 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-white/5 even:bg-slate-950/60">
                    <td className="px-4 py-4">{task.title}</td>
                    <td className="px-4 py-4">{task.status}</td>
                    <td className="px-4 py-4">{task.priority}</td>
                    <td className="px-4 py-4">{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 flex flex-wrap gap-2">
                      <button onClick={() => handleStatusUpdate(task.id, 'In Progress')} className="rounded-2xl bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">Start</button>
                      <button onClick={() => handleStatusUpdate(task.id, 'Completed')} className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">Complete</button>
                      <button onClick={() => handleDelete(task.id)} className="rounded-2xl bg-red-500/10 px-3 py-2 text-sm text-red-200">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="p-6 text-slate-400">No tasks created yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
