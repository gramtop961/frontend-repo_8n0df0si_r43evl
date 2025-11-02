import { useMemo, useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AnalyticsCards from './components/AnalyticsCards.jsx';
import ActivityChart from './components/ActivityChart.jsx';

function App() {
  const [user, setUser] = useState(null);
  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const handleLogin = (credentials) => {
    // Simple demo auth: treat any email/password as valid
    // Mark as admin if email ends with "@admin.com" or password equals "admin"
    const isAdmin =
      (credentials.email || '').toLowerCase().endsWith('@admin.com') ||
      (credentials.password || '') === 'admin';

    if (isAdmin) {
      setUser({
        name: credentials.name || 'Admin',
        email: credentials.email,
        role: 'admin',
      });
    } else {
      // Non-admins still "log in" but won't have access to admin analytics
      setUser({
        name: credentials.name || 'User',
        email: credentials.email,
        role: 'user',
      });
    }
  };

  const handleLogout = () => setUser(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-600/20 ring-1 ring-indigo-500/30 mb-4">
              <span className="text-2xl font-bold text-indigo-400">A</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-slate-400">Sign in to access your admin analytics</p>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminLayout user={user} onLogout={handleLogout} restricted={!isAdmin}>
        {!isAdmin ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Restricted Area</h2>
            <p className="text-slate-500 mb-6">
              You are signed in as a non-admin user. Please sign in with an admin
              account to view analytics.
            </p>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition"
            >
              Switch Account
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <AnalyticsCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ActivityChart />
              </div>
              <div className="xl:col-span-1">
                <div className="rounded-xl border border-slate-200 bg-white p-6 h-full">
                  <h3 className="text-base font-semibold text-slate-800 mb-4">Notes</h3>
                  <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
                    <li>Daily active users trend shows steady growth this week.</li>
                    <li>Conversion rate peaked on Wednesday after campaign launch.</li>
                    <li>Keep monitoring acquisition channels for optimization.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </div>
  );
}

export default App;
