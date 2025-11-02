import { BarChart3, LogOut, PanelsTopLeft, Shield, User } from 'lucide-react';

export default function AdminLayout({ user, onLogout, children, restricted = false }) {
  const initials = (user?.name || user?.email || 'U')
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col gap-4 border-r border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">A</div>
          <div>
            <div className="text-sm font-semibold leading-tight">Admin Console</div>
            <div className="text-xs text-slate-500">Analytics & insights</div>
          </div>
        </div>
        <nav className="mt-4 space-y-1">
          <a className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium bg-slate-900 text-white">
            <BarChart3 className="h-4 w-4" /> Dashboard
          </a>
          <a className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100">
            <PanelsTopLeft className="h-4 w-4" /> Users
          </a>
          <a className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-100">
            <Shield className="h-4 w-4" /> Access
          </a>
        </nav>
        <div className="mt-auto p-2 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-500">
            {restricted
              ? 'You are signed in without admin privileges.'
              : 'You have full admin access.'}
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200">
                <PanelsTopLeft className="h-5 w-5 text-slate-700" />
              </button>
              <h1 className="text-sm font-semibold text-slate-800">Admin Analytics</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 rounded-lg border border-slate-200">
                <User className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-700">{user?.email}</span>
                <span className="ml-2 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {user?.role || 'user'}
                </span>
              </div>
              <div className="h-9 w-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-semibold">
                {initials}
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="mx-auto max-w-7xl p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
