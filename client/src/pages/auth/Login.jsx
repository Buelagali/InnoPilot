import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        if (res.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#F9A8C8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#BAE6FD]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#FED7AA]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F9A8C8] via-[#FED7AA] to-[#BAE6FD] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#F9A8C8]/25 border border-white/80">
            <Sparkles className="w-7 h-7 text-[#2D2530]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">Welcome Back</h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 font-medium">
            Access your AI project portfolio and ongoing discoveries
          </p>
        </div>

        {/* Form Card */}
        <GlassCard variant="pink" className="p-6 sm:p-8 border-[#FBCFE8] shadow-xl shadow-[#F9A8C8]/10 bg-white/95">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50/90 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2D2530] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E8295]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#F9A8C8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D2530] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E8295]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#F9A8C8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] text-[#2D2530] font-bold text-sm shadow-md shadow-[#F9A8C8]/25 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#DB2777]" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-[#2D2530]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F1E4EC] text-center text-xs text-[#5E5364]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#DB2777] hover:text-[#9D174D] font-bold transition-colors">
              Create Student Profile
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
