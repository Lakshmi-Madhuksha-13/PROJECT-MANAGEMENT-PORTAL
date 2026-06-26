import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get('/notifications').then((res) => setNotifications(res.data.notifications)).catch(() => setNotifications([]));
  }, []);

  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        <h2 className="text-3xl font-semibold">Notifications</h2>
        <p className="mt-2 text-slate-400">Stay informed with updates around your projects.</p>
      </div>
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        {notifications.length ? notifications.map((note) => (
          <div key={note.id} className="mb-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 surface-panel pop-in">
            <p className="text-lg font-semibold">{note.title}</p>
            <p className="mt-2 text-slate-400">{note.message}</p>
          </div>
        )) : <p className="text-slate-400">No notifications yet.</p>}
      </div>
    </div>
  );
}

export default NotificationsPage;
