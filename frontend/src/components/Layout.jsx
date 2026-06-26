import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useState } from 'react';
import { BellIcon, HomeIcon, FolderIcon, ClipboardDocumentListIcon, CalendarDaysIcon, ChartBarIcon, UserCircleIcon, Cog6ToothIcon, ShieldCheckIcon, QuestionMarkCircleIcon, InformationCircleIcon, ArrowLeftOnRectangleIcon, Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const links = [
  { label: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { label: 'Projects', path: '/projects', icon: FolderIcon },
  { label: 'Tasks', path: '/tasks', icon: ClipboardDocumentListIcon },
  { label: 'Calendar', path: '/calendar', icon: CalendarDaysIcon },
  { label: 'Reports', path: '/reports', icon: ChartBarIcon },
  { label: 'Notifications', path: '/notifications', icon: BellIcon },
  { label: 'Profile', path: '/profile', icon: UserCircleIcon },
  { label: 'Settings', path: '/settings', icon: Cog6ToothIcon },
  { label: 'Help', path: '/help', icon: QuestionMarkCircleIcon },
  { label: 'About', path: '/about', icon: InformationCircleIcon }
];

function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_18%)]" />
      <div className="relative flex min-h-screen">
        <div className="md:hidden border-b border-white/10 bg-slate-950/95 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="text-lg font-semibold text-white">ProjectNest</Link>
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-2xl bg-slate-900/80 p-2 text-slate-100 hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mobileOpen && <button onClick={() => setMobileOpen(false)} className="fixed inset-0 z-20 bg-slate-950/70 md:hidden" aria-label="Close menu" />}
        <aside className={`glass-card z-30 flex flex-col transition-all duration-300 md:relative fixed top-0 left-0 h-full md:h-screen ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${collapsed ? 'md:w-20' : 'md:w-72'} w-72 p-4 bg-slate-950/95`}> 
          <div className="flex items-center justify-between gap-2 mb-8">
            <div className="space-y-2">
              <div className="text-xl font-semibold tracking-tight">ProjectNest</div>
              {!collapsed && <p className="text-xs text-slate-400">Your workspace hub</p>}
              {!collapsed && (
                <Link to="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-800/90 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700">
                  <HomeIcon className="h-4 w-4" /> Home
                </Link>
              )}
            </div>
            <button className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800" onClick={() => setCollapsed(!collapsed)}>
              <Bars3Icon className="h-6 w-6 text-slate-200" />
            </button>
          </div>
          <nav className="flex-1 space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3 rounded-3xl px-3 py-3 transition ${active ? 'bg-slate-700/80 text-white shadow-glass' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'}`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 p-4 rounded-3xl bg-slate-900/70 border border-slate-700/70">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400" />
              {!collapsed && (
                <div>
                  <p className="font-semibold">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-400">{user?.role || 'Member'}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="mt-4 grid gap-3">
                <button onClick={toggleTheme} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800/95 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700">
                  {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />} Toggle {theme === 'dark' ? 'light' : 'dark'} mode
                </button>
                <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800/95 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700">
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-8 lg:p-10 md:ml-0 page-shell fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
