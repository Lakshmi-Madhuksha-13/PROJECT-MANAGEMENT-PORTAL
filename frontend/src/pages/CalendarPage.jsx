function CalendarPage() {
  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        <h2 className="text-3xl font-semibold">Calendar</h2>
        <p className="mt-2 text-slate-400">View deadlines, project timelines and weekly plans.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 surface-panel pop-in">
            <h3 className="text-xl font-semibold">Monthly view</h3>
            <p className="mt-3 text-slate-400">A monthly overview of upcoming deadlines and events.</p>
            <div className="mt-6 h-72 rounded-[1.5rem] bg-slate-900/70" />
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 surface-panel pop-in">
            <h3 className="text-xl font-semibold">Weekly timeline</h3>
            <p className="mt-3 text-slate-400">Track weekly pace for tasks and project milestones.</p>
            <div className="mt-6 h-72 rounded-[1.5rem] bg-slate-900/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
