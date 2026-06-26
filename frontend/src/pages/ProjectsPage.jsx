import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', status: 'Planning', priority: 'Medium', deadline: '', startDate: '', endDate: '', tags: '', teamMembers: '', estimatedHours: '', progress: 0, notes: '' });
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectEditor, setProjectEditor] = useState({ status: 'Planning', deadline: '', startDate: '', endDate: '' });

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data.projects);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', form);
      setProjects((prev) => [res.data.project, ...prev]);
      setForm({ name: '', description: '', category: '', status: 'Planning', priority: 'Medium', deadline: '', startDate: '', endDate: '', tags: '', teamMembers: '', estimatedHours: '', progress: 0, notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create project');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((project) => project.id !== id));
    if (selectedProject?.id === id) setSelectedProject(null);
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setProjectEditor({
      status: project.status || 'Planning',
      deadline: project.deadline ? project.deadline.split('T')[0] : '',
      startDate: project.startDate ? project.startDate.split('T')[0] : '',
      endDate: project.endDate ? project.endDate.split('T')[0] : ''
    });
  };

  const handleProjectSave = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;
    const res = await api.put(`/projects/${selectedProject.id}`, projectEditor);
    setProjects((prev) => prev.map((project) => (project.id === selectedProject.id ? res.data.project : project)));
    setSelectedProject(res.data.project);
  };

  const handleCompleteProject = async () => {
    if (!selectedProject) return;
    await api.put(`/projects/${selectedProject.id}`, { status: 'Completed' });
    setProjects((prev) => prev.map((project) => (project.id === selectedProject.id ? { ...project, status: 'Completed' } : project)));
    setSelectedProject((prev) => prev ? { ...prev, status: 'Completed' } : null);
    setProjectEditor((prev) => ({ ...prev, status: 'Completed' }));
  };

  const extendProjectDeadline = () => {
    const currentDate = projectEditor.deadline ? new Date(projectEditor.deadline) : new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    setProjectEditor((prev) => ({ ...prev, deadline: currentDate.toISOString().slice(0, 10) }));
  };

  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 pop-in">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Projects</h2>
            <p className="mt-2 text-slate-400">Manage your projects and keep progress visible.</p>
          </div>
        </div>
        {error && <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project Name" className="input-field" required />
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" className="input-field" />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
            {['Planning','Active','On Hold','Completed','Cancelled','Archived'].map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="input-field">
            {['Low','Medium','High','Critical'].map((priority) => <option key={priority} value={priority}>{priority}</option>)}
          </select>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Deadline</span>
            <input value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} type="date" className="input-field" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">Start Date</span>
            <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} type="date" className="input-field" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-300">End Date</span>
            <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} type="date" className="input-field" />
          </label>
          <input value={form.teamMembers} onChange={(e) => setForm({ ...form, teamMembers: e.target.value })} placeholder="Team Members" className="input-field" />
          <input value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })} type="number" placeholder="Estimated Hours" className="input-field" />
          <input value={form.progress} onChange={(e) => setForm({ ...form, progress: e.target.value })} type="number" min="0" max="100" placeholder="Progress %" className="input-field" />
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags" className="input-field" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" placeholder="Description" className="input-field md:col-span-2" />
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="4" placeholder="Notes" className="input-field md:col-span-2" />
          <button type="submit" className="btn-primary md:col-span-2">Create Project</button>
        </form>
      </div>
      <div className="glass-card rounded-[2rem] p-8">
        <h3 className="text-2xl font-semibold">Project list</h3>
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
          {projects.length ? (
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="border-b border-white/10 bg-slate-900/70 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 even:bg-slate-950/60">
                    <td className="px-4 py-4">{project.name}</td>
                    <td className="px-4 py-4">{project.status}</td>
                    <td className="px-4 py-4">{project.priority}</td>
                    <td className="px-4 py-4">{project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-4 space-x-2">
                      <button onClick={() => openProject(project)} className="rounded-2xl bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">Open</button>
                      <button onClick={() => handleDelete(project.id)} className="rounded-2xl bg-red-500/10 px-3 py-2 text-sm text-red-200">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p className="p-6 text-slate-400">No projects available. Create one to get started.</p>}
        </div>
      </div>
      {selectedProject && (
        <div className="glass-card rounded-[2rem] p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Project details</h3>
              <p className="mt-1 text-slate-400">Open a project to update its deadline, status, and completion state.</p>
            </div>
            <button onClick={() => setSelectedProject(null)} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">
              Close
            </button>
          </div>
          <form onSubmit={handleProjectSave} className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1 space-y-2">
              <p className="text-sm font-medium text-slate-300">Status</p>
              <select value={projectEditor.status} onChange={(e) => setProjectEditor({ ...projectEditor, status: e.target.value })} className="input-field w-full">
                {['Planning','Active','In Progress','Completed','On Hold','Cancelled','Archived'].map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="md:col-span-1 space-y-2">
              <p className="text-sm font-medium text-slate-300">Deadline</p>
              <input value={projectEditor.deadline} onChange={(e) => setProjectEditor({ ...projectEditor, deadline: e.target.value })} type="date" className="input-field w-full" />
            </div>
            <div className="md:col-span-1 space-y-2">
              <p className="text-sm font-medium text-slate-300">Start Date</p>
              <input value={projectEditor.startDate} onChange={(e) => setProjectEditor({ ...projectEditor, startDate: e.target.value })} type="date" className="input-field w-full" />
            </div>
            <div className="md:col-span-1 space-y-2">
              <p className="text-sm font-medium text-slate-300">End Date</p>
              <input value={projectEditor.endDate} onChange={(e) => setProjectEditor({ ...projectEditor, endDate: e.target.value })} type="date" className="input-field w-full" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">Save changes</button>
              <button type="button" onClick={handleCompleteProject} className="rounded-3xl bg-emerald-500/10 px-5 py-3 text-sm text-emerald-200 hover:bg-emerald-500/20">Mark Completed</button>
              <button type="button" onClick={extendProjectDeadline} className="rounded-3xl bg-sky-500/10 px-5 py-3 text-sm text-sky-200 hover:bg-sky-500/20">Extend deadline +7d</button>
            </div>
          </form>
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-slate-300">
            <p className="text-sm font-medium text-slate-100">Open project</p>
            <p className="mt-2 text-slate-400">Project: {selectedProject.name}</p>
            <p className="mt-1 text-sm text-slate-400">Current status: {selectedProject.status}</p>
            <p className="text-sm text-slate-400">Current deadline: {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Not set'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
