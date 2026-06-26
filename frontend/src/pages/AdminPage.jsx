function AdminPage() {
  return (
    <div className="glass-card rounded-[2rem] p-8">
      <h2 className="text-3xl font-semibold">Admin Panel</h2>
      <p className="mt-2 text-slate-400">Manage users, roles and workspace settings.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-xl font-semibold">User management</h3>
          <p className="mt-2 text-slate-400">View, update and control user accounts.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="text-xl font-semibold">Platform analytics</h3>
          <p className="mt-2 text-slate-400">See high-level adoption and performance metrics.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
