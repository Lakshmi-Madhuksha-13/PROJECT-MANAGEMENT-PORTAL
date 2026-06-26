import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      setLoading(true);
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'If an account exists, we sent reset instructions to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text)] page-shell fade-in">
      <div className="mx-auto max-w-2xl surface-panel p-8 pop-in">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Reset your access</p>
          <h1 className="mt-4 text-4xl font-semibold">Forgot Password?</h1>
          <p className="mt-3 text-slate-400">Enter your email and we will send instructions to reset your password.</p>
        </div>
        {message && <div className="mb-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{message}</div>}
        {error && <div className="mb-5 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Sending...' : 'Send reset instructions'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Remembered your password? <Link to="/login" className="text-cyan-300">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
