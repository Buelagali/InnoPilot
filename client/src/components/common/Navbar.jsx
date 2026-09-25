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
    { label: 'Dashboard', path: '/dashboard', icon: Layers, activeColor: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]', iconColor: 'text-[#E91E63]' },
    { label: 'Discover', path: '/discover', icon: Compass, activeColor: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]', iconColor: 'text-[#F97316]' },
    { label: 'Analyzer', path: '/analyzer', icon: Sparkles, activeColor: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]', iconColor: 'text-[#0EA5E9]' },
    { label: 'Project Library', path: '/library', icon: Lightbulb, activeColor: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]', iconColor: 'text-[#10B981]' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/92 backdrop-blur-xl border-b border-[#F1E4EC] shadow-sm px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E91E63] via-[#FB923C] to-[#FBBF24] flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider font-heading uppercase bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#D97706] bg-clip-text text-transparent">
              INNOPILOT
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF1F6] text-[#E91E63] border border-[#FBCFE8]">
              AI Capstone
            </span>
          </div>
        </Link>

        {/* Active Project Pill on Desktop */}
        {isAuthenticated && activeProject && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs max-w-sm truncate bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[#5E5364] font-medium">Active:</span>
            <span className="font-semibold truncate text-[#2D2530]">{activeProject.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-white text-[#15803D] border border-[#BBF7D0]">
              v{activeProject.currentVersion || 1}
            </span>
          </div>
        )}

        {/* Desktop Navigation */}
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
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? `${link.activeColor} shadow-xs font-bold`
                        : 'text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FAFAFB] border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    {link.label}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                      : 'text-[#B45309] hover:bg-[#FFFBEB] border-transparent'
                  }`}
                >
                  <Shield className="w-4 h-4 text-[#F59E0B]" />
                  Admin
                </Link>
              )}

              {/* Profile Menu Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-[#F1E4EC] bg-white hover:bg-[#FFF1F6] hover:border-[#FBCFE8] transition-all shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#E91E63] via-[#FB923C] to-[#FBBF24] flex items-center justify-center font-bold text-white text-xs shadow-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#5E5364]" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl p-2 text-sm z-50 animate-in fade-in slide-in-from-top-2 bg-white/98 backdrop-blur-xl border border-[#F1E4EC] shadow-xl text-[#2D2530]"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-[#F1E4EC] mb-1">
                      <p className="font-semibold truncate text-[#2D2530]">{user?.name}</p>
                      <p className="text-xs truncate text-[#5E5364]">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded border bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]">
                        {user?.branch || 'Student'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FFF1F6]"
                    >
                      <User className="w-4 h-4 text-[#E91E63]" />
                      Student Profile
                    </Link>

                    <Link
                      to="/assistant"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FFF7ED]"
                    >
                      <Sparkles className="w-4 h-4 text-[#F97316]" />
                      AI Companion
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#BE123C] hover:bg-[#FFF1F2] transition-colors mt-1"
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
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FAFAFB]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white shadow-md shadow-pink-500/20 hover:shadow-pink-500/35 hover:scale-[1.02] transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FAFAFB]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 border-t border-[#F1E4EC] mt-3 space-y-2 bg-white/98 rounded-xl p-3 shadow-md">
          {isAuthenticated ? (
            <>
              {activeProject && (
                <div className="px-3 py-2 rounded-lg bg-[#F0FDF4] text-xs text-[#15803D] border border-[#BBF7D0] mb-2">
                  <span className="text-[#5E5364]">Active Project:</span> {activeProject.title}
                </div>
              )}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FAFAFB]"
                  >
                    <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FFF1F6]"
              >
                <User className="w-4 h-4 text-[#E91E63]" />
                Student Profile
              </Link>
              <Link
                to="/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FFF7ED]"
              >
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                AI Companion
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#B45309] hover:bg-[#FFFBEB]"
                >
                  <Shield className="w-4 h-4 text-[#F59E0B]" />
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#BE123C] hover:bg-[#FFF1F2]"
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
                className="text-center py-2.5 rounded-xl text-sm font-medium text-[#5E5364] bg-[#FAFAFB] hover:bg-[#FFF1F6]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white shadow-md"
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
