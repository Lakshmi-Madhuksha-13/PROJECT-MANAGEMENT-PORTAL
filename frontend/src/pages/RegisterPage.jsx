import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const roles = ['Student','Working Professional','Freelancer','Team Leader','Faculty','Startup Founder','Admin'];

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', organization: '', role: 'Student' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text)] page-shell fade-in">
      <div className="mx-auto max-w-5xl surface-panel p-8 pop-in">
        <div className="mb-8 text-center">
          <div className="mb-4 text-sm text-cyan-300">
            <Link to="/" className="text-cyan-300 hover:text-cyan-200">Back to Home</Link>
          </div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Create your account</p>
          <h1 className="mt-4 text-4xl font-semibold">Join ProjectNest</h1>
          <p className="mt-3 text-slate-400">Secure project management for teams, freelancers, and students.</p>
        </div>
        {error && <div className="mb-5 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Username" className="input-field" required />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="input-field" required />
          <input name="organization" value={form.organization} onChange={handleChange} placeholder="College / Organization" className="input-field md:col-span-2" />
          <select name="role" value={form.role} onChange={handleChange} className="input-field md:col-span-2">
            {roles.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
          <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="input-field" required />
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" className="input-field" required />
          <button type="submit" className="btn-primary md:col-span-2">Create account</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="text-cyan-300">Login</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
