import { useState } from 'react';
import { Mail, Lock, Shield } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    setLoading(true);

    // Simple validation
    const isValid = email.includes('@') && password.length >= 4;
    setTimeout(() => {
      setLoading(false);
      if (!isValid) {
        setShowError(true);
        return;
      }

      onLogin({ email, password });
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-slate-950/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/30 flex items-center justify-center">
          <Shield className="h-5 w-5 text-indigo-300" />
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold leading-tight">Sign in</h2>
          <p className="text-slate-400 text-sm">Use admin credentials to continue</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm text-slate-300 mb-1">Email</span>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@admin.com"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-white/10 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              autoComplete="email"
              required
            />
          </div>
        </label>

        <label className="block">
          <span className="block text-sm text-slate-300 mb-1">Password</span>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-900/60 text-white placeholder-slate-500 border border-white/10 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              autoComplete="current-password"
              required
              minLength={4}
            />
          </div>
        </label>

        {showError && (
          <p className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
            Please enter a valid email and password (4+ characters).
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-4 py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-xs text-slate-400 text-center">
          Tip: use an email ending with <span className="text-indigo-300">@admin.com</span> or password <span className="text-indigo-300">admin</span> for admin access.
        </p>
      </div>
    </form>
  );
}
