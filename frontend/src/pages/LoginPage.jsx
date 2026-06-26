import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text)] page-shell fade-in">
      <div className="mx-auto max-w-2xl surface-panel p-8 pop-in">
        <div className="mb-8 text-center">
          <div className="mb-4 text-sm text-cyan-300">
            <Link to="/" className="text-cyan-300 hover:text-cyan-200">Back to Home</Link>
          </div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Access your workspace</p>
          <h1 className="mt-4 text-4xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-slate-400">Login to continue managing projects, tasks and team workflows.</p>
        </div>
        {error && <div className="mb-5 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" value={credentials.email} onChange={handleChange} type="email" placeholder="Email" className="input-field" required />
          <div className="relative">
            <input name="password" value={credentials.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-field pr-20" required />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-white">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-cyan-400" />
              <label htmlFor="remember" className="text-slate-400">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm text-cyan-300 hover:text-cyan-200">Forgot password?</Link>
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">New to ProjectNest? <Link to="/register" className="text-cyan-300">Create an account</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
