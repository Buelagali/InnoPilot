import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import {
  Sparkles,
  Compass,
  Lightbulb,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  Layers,
  ChevronDown,
  LayoutDashboard,
  Search,
  Activity,
  BookMarked
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { activeProject } = useProject();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, activeColor: 'bg-gradient-to-r from-aiViolet-100 to-aiSky-100 text-aiViolet-700 border-aiViolet-200/80 shadow-sm', iconColor: 'text-aiViolet-600' },
    { label: 'Discover', path: '/discover', icon: Search, activeColor: 'bg-gradient-to-r from-aiPeach-100 to-aiPink-100 text-amber-900 border-aiPeach-200/80 shadow-sm', iconColor: 'text-amber-600' },
    { label: 'Analyzer', path: '/analyzer', icon: Activity, activeColor: 'bg-gradient-to-r from-aiSky-100 to-aiCyan-100 text-aiCyan-700 border-aiCyan-200/80 shadow-sm', iconColor: 'text-aiCyan-600' },
    { label: 'Project Library', path: '/library', icon: BookMarked, activeColor: 'bg-gradient-to-r from-aiMint-100 to-aiSky-100 text-emerald-800 border-aiMint-200/80 shadow-sm', iconColor: 'text-emerald-600' },
  ];

  return (
    <header className="sticky top-2 z-50 w-full px-4 sm:px-6 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-lg shadow-indigo-950/5 px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo & Pill */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
          {/* Futuristic Gradient Star Icon */}
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-aiViolet-600 via-aiCyan-400 to-aiPink-400 flex items-center justify-center shadow-md shadow-aiViolet-500/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-extrabold tracking-wider font-heading uppercase bg-gradient-to-r from-textDark via-aiViolet-900 to-textDark bg-clip-text text-transparent">
              INNOPILOT
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-aiViolet-50 text-aiViolet-700 border border-aiViolet-200/60 shadow-2xs">
              AI CAPSTONE
            </span>
          </div>
        </Link>

        {/* Active Project Pill on Desktop */}
        {isAuthenticated && activeProject && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs max-w-xs truncate bg-aiSky-50/80 border border-aiSky-200/70 text-aiSky-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-aiSky-500 animate-pulse"></span>
            <span className="text-textMuted font-medium text-[11px]">Active:</span>
            <span className="font-semibold truncate text-textDark text-[11px]">{activeProject.title}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-white text-aiSky-700 border border-aiSky-200">
              v{activeProject.currentVersion || 1}
            </span>
          </div>
        )}

        {/* Desktop Navigation Link Pills */}
        <nav className="hidden md:flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? `${link.activeColor} font-bold`
                        : 'text-textBody hover:text-textDark hover:bg-slate-100/60 border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? link.iconColor : 'text-textMuted'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-aiGold-100 text-amber-900 border-aiGold-300 font-bold'
                      : 'text-amber-800 hover:bg-amber-50 border-transparent'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Profile Menu Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-full border border-aiViolet-200/70 bg-gradient-to-r from-aiViolet-50 to-white hover:border-aiViolet-300 transition-all shadow-2xs group"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-aiPink-500 via-aiViolet-500 to-aiSky-400 flex items-center justify-center font-bold text-white text-xs shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'B'}
                  </div>
                  <ChevronDown className="w-3 h-3 text-textMuted group-hover:text-textDark transition-colors" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl p-2 text-sm z-50 animate-in fade-in slide-in-from-top-2 bg-white/95 backdrop-blur-2xl border border-white/90 shadow-xl shadow-aiViolet-500/10 text-textDark"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="font-bold truncate text-textDark">{user?.name || 'Researcher'}</p>
                      <p className="text-xs truncate text-textMuted">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border bg-aiViolet-50 text-aiViolet-700 border-aiViolet-200">
                        {user?.branch || 'Student Researcher'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-textBody hover:text-textDark hover:bg-aiViolet-50/70 font-medium text-xs"
                    >
                      <User className="w-4 h-4 text-aiViolet-600" />
                      Student Profile
                    </Link>

                    <Link
                      to="/assistant"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-textBody hover:text-textDark hover:bg-aiSky-50/70 font-medium text-xs"
                    >
                      <Sparkles className="w-4 h-4 text-aiSky-600" />
                      AI Companion
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors mt-1 font-medium text-xs text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-colors text-textBody hover:text-textDark hover:bg-slate-100"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white shadow-md shadow-aiViolet-500/25 hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full transition-colors text-textBody hover:text-textDark hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-xl p-4 space-y-2 text-textDark animate-fadeInUp">
          {isAuthenticated ? (
            <>
              {activeProject && (
                <div className="px-3 py-2 rounded-2xl bg-aiSky-50 text-xs text-aiSky-700 border border-aiSky-200 mb-2 font-medium">
                  <span className="text-textMuted">Active Project:</span> {activeProject.title}
                </div>
              )}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-textBody hover:text-textDark hover:bg-slate-50"
                  >
                    <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-textBody hover:text-textDark hover:bg-aiViolet-50"
              >
                <User className="w-4 h-4 text-aiViolet-600" />
                Student Profile
              </Link>
              <Link
                to="/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-textBody hover:text-textDark hover:bg-aiSky-50"
              >
                <Sparkles className="w-4 h-4 text-aiSky-600" />
                AI Companion
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-amber-800 hover:bg-amber-50"
                >
                  <Shield className="w-4 h-4 text-amber-600" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-textDark bg-slate-100 rounded-2xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 rounded-2xl shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
