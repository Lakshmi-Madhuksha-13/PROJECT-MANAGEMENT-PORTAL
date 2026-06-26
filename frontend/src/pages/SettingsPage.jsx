import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in slide-up">
      <h2 className="text-3xl font-semibold">Settings</h2>
      <p className="mt-2 text-slate-400">Customize your theme and preferences.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 surface-panel pop-in">
          <h3 className="text-xl font-semibold">Dark mode</h3>
          <p className="mt-2 text-slate-400">Auto theme switching will follow your system preferences.</p>
          <button onClick={toggleTheme} className="mt-6 rounded-3xl bg-slate-900/70 px-5 py-3 text-white hover:bg-slate-800">
            Toggle theme ({theme})
          </button>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 surface-panel pop-in">
          <h3 className="text-xl font-semibold">Notifications</h3>
          <p className="mt-2 text-slate-400">Manage alerts for deadlines and task updates.</p>
          <button onClick={() => setNotificationsEnabled((prev) => !prev)} className="mt-6 rounded-3xl bg-slate-900/70 px-5 py-3 text-white hover:bg-slate-800">
            {notificationsEnabled ? 'Disable' : 'Enable'} notifications
          </button>
          <p className="mt-4 text-sm text-slate-400">Notifications are currently <span className="font-semibold text-white">{notificationsEnabled ? 'enabled' : 'disabled'}</span>.</p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
