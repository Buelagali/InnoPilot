import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import {
  Sparkles,
  Compass,
  Lightbulb,
  FileText,
  User,
  LogOut,
  Shield,
  Menu,
  X,
  Layers,
  ChevronDown,
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
    { label: 'Dashboard', path: '/dashboard', icon: Layers },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Analyzer', path: '/analyzer', icon: Sparkles },
    { label: 'Project Library', path: '/library', icon: Lightbulb },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#f3c5d3]/70 shadow-xs px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e91e63] via-[#ec407a] to-[#f48fb1] flex items-center justify-center shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider font-heading uppercase bg-gradient-to-r from-[#e91e63] via-[#d81b60] to-[#ad1457] bg-clip-text text-transparent">
              INNOPILOT
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3]">
              AI Capstone
            </span>
          </div>
        </Link>

        {/* Active Project Pill on Desktop */}
        {isAuthenticated && activeProject && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs max-w-sm truncate bg-[#fff0f5] border border-[#f3c5d3] text-[#3a2630]">
            <span className="w-2 h-2 rounded-full bg-[#e91e63] animate-pulse"></span>
            <span className="text-[#6b5560]">Active:</span>
            <span className="font-medium truncate text-[#3a2630]">{activeProject.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3]">
              v{activeProject.currentVersion || 1}
            </span>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {isAuthenticated ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] shadow-xs'
                        : 'text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#e91e63]" />
                    {link.label}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3]'
                      : 'text-[#be123c] hover:text-[#9f1239] hover:bg-[#fff1f2]'
                  }`}
                >
                  <Shield className="w-4 h-4 text-[#e11d48]" />
                  Admin
                </Link>
              )}

              {/* Profile Menu Dropdown */}
              <div className="relative ml-3">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-transparent hover:bg-[#fff0f5] hover:border-[#f3c5d3] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e91e63] to-[#ec407a] flex items-center justify-center font-bold text-white text-xs shadow-md">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6b5560]" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl p-2 text-sm z-50 animate-in fade-in slide-in-from-top-2 bg-white/98 backdrop-blur-xl border border-[#f3c5d3] shadow-xl text-[#3a2630]"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-[#f3c5d3]/70 mb-1">
                      <p className="font-semibold truncate text-[#3a2630]">{user?.name}</p>
                      <p className="text-xs truncate text-[#6b5560]">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded border bg-[#fce4ec] text-[#e91e63] border-[#f3c5d3]">
                        {user?.branch || 'Student'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
                    >
                      <User className="w-4 h-4 text-[#e91e63]" />
                      Student Profile
                    </Link>

                    <Link
                      to="/assistant"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
                    >
                      <Sparkles className="w-4 h-4 text-[#ec407a]" />
                      AI Companion
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#e11d48] hover:text-[#be123c] hover:bg-[#fff1f2] transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#d81b60] text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/35 hover:scale-[1.02] transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-[#f3c5d3] mt-3 space-y-2 bg-white/98 rounded-xl p-3 shadow-md">
          {isAuthenticated ? (
            <>
              {activeProject && (
                <div className="px-3 py-2 rounded-lg bg-[#fff0f5] text-xs text-[#3a2630] border border-[#f3c5d3] mb-2">
                  <span className="text-[#6b5560]">Active Project:</span> {activeProject.title}
                </div>
              )}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
                  >
                    <Icon className="w-4 h-4 text-[#e91e63]" />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
              >
                <User className="w-4 h-4 text-[#e91e63]" />
                Student Profile
              </Link>
              <Link
                to="/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5]"
              >
                <Sparkles className="w-4 h-4 text-[#ec407a]" />
                AI Companion
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#e11d48] hover:bg-[#fff1f2]"
                >
                  <Shield className="w-4 h-4 text-[#e11d48]" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#e11d48] hover:bg-[#fff1f2]"
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
                className="text-center py-2.5 rounded-xl text-sm font-medium text-[#6b5560] bg-[#fff0f5] hover:bg-[#fce4ec]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#e91e63] to-[#ec407a] text-white shadow-md"
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
