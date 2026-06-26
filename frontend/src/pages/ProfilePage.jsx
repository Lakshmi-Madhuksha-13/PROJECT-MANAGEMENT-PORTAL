import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', profession: '', organization: '', skills: '', experience: '', profilePicture: '', bio: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/auth/profile').then((res) => {
      setProfile(res.data.user);
      setForm({ ...res.data.user });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/auth/profile', form);
    setMessage('Profile updated successfully');
  };

  return (
    <div className="space-y-8 slide-up">
      <div className="glass-card rounded-[2rem] p-8 surface-panel pop-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Profile</h2>
            <p className="mt-2 text-slate-400">Update your personal details and bio.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 surface-panel pop-in">Role: {profile?.role}</div>
        </div>
        {message && <div className="mt-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Name" />
          <input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="Phone" />
          <input name="profession" value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} className="input-field" placeholder="Profession" />
          <input name="organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="input-field" placeholder="Organization" />
          <input name="skills" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="input-field" placeholder="Skills" />
          <input name="experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="input-field" placeholder="Experience" />
          <input name="profilePicture" value={form.profilePicture} onChange={(e) => setForm({ ...form, profilePicture: e.target.value })} className="input-field md:col-span-2" placeholder="Profile Picture URL" />
          <textarea name="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows="4" className="input-field md:col-span-2" placeholder="Bio" />
          <button type="submit" className="btn-primary md:col-span-2">Save Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
