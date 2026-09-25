import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
  Shield,
  Users,
  Lightbulb,
  Compass,
  GitBranch,
  Search,
  AlertCircle,
  Layers,
  Sparkles,
  BarChart3,
  Tag,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'categories'

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');

    try {
      const [statsRes, usersRes, catRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllUsers(),
        adminAPI.getCategories(),
      ]);

      if (statsRes.data.success) setStats(statsRes.data);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      if (catRes.data.success) setCategories(catRes.data.categories);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin telemetry.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const res = await adminAPI.updateUserStatus(userId, { isActive: !currentStatus });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isActive: !currentStatus } : u))
        );
      }
    } catch (err) {
      alert('Failed to update user status.');
    }
  };

  const handleToggleUserRole = async (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'student' : 'admin';
    try {
      const res = await adminAPI.updateUserStatus(userId, { role: nextRole });
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: nextRole } : u))
        );
      }
    } catch (err) {
      alert('Failed to update user role.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.college && u.college.toLowerCase().includes(userSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FEF3C7] via-[#FED7AA] to-[#F9A8C8] border border-[#FDE68A] text-amber-900 text-xs font-bold mb-2 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">
            Platform Telemetry & Governance
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl leading-relaxed">
            Monitor platform usage, manage student permissions, inspect generated architectures, and configure problem categories.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 border border-[#F1E4EC] shadow-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-[#FDE68A] to-[#FED7AA] text-[#2D2530] shadow-xs'
                : 'text-[#5E5364] hover:text-[#2D2530]'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-[#BAE6FD] to-[#BBF7D0] text-[#2D2530] shadow-xs'
                : 'text-[#5E5364] hover:text-[#2D2530]'
            }`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-[#F9A8C8] to-[#FED7AA] text-[#2D2530] shadow-xs'
                : 'text-[#5E5364] hover:text-[#2D2530]'
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FEF3C7] to-[#FED7AA] border border-[#FDE68A] flex items-center justify-center mx-auto text-amber-700 animate-spin shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-xs text-[#5E5364] font-medium">Loading system metrics...</p>
        </div>
      )}

      {/* Tab 1: Overview & Statistics */}
      {activeTab === 'overview' && stats && !loading && (
        <div className="space-y-8 animate-fadeInUp">
          {/* Top Level Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <GlassCard variant="sky" className="p-5 border-[#BAE6FD]/60">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Total Users</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#2D2530] font-mono">{stats.stats.totalUsers}</span>
                <div className="w-8 h-8 rounded-xl bg-[#BAE6FD]/40 text-[#0284C7] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-[#5E5364] mt-1 font-medium">{stats.stats.totalStudents} Active Students</p>
            </GlassCard>

            <GlassCard variant="peach" className="p-5 border-[#FED7AA]/60">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Problems Logged</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#2D2530] font-mono">{stats.stats.totalProblems}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FED7AA]/40 text-[#EA580C] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-[#5E5364] mt-1 font-medium">Discovered or Analyzed</p>
            </GlassCard>

            <GlassCard variant="gold" className="p-5 border-[#FDE68A]/70">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Ideas Generated</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#2D2530] font-mono">{stats.stats.totalIdeas}</span>
                <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-amber-700 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-[#5E5364] mt-1 font-medium">Non-trivial architectures</p>
            </GlassCard>

            <GlassCard variant="mint" className="p-5 border-[#BBF7D0]/70">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Idea Evolutions</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#2D2530] font-mono">{stats.stats.totalVersions}</span>
                <div className="w-8 h-8 rounded-xl bg-[#BBF7D0]/40 text-emerald-700 flex items-center justify-center">
                  <GitBranch className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-[#5E5364] mt-1 font-medium">Version snapshots stored</p>
            </GlassCard>
          </div>

          {/* Domain & Difficulty Distribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="pink" className="p-6 border-[#FBCFE8] space-y-4">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#DB2777]" />
                <span>Project Distribution by Domain</span>
              </h3>
              <div className="space-y-2.5">
                {(stats.stats.ideasByDomain || []).map((dom, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/80 border border-[#F1E4EC]">
                    <span className="text-[#5E5364] font-medium">{dom._id || 'General'}</span>
                    <Badge variant="pink">{dom.count} projects</Badge>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="sky" className="p-6 border-[#BAE6FD]/60 space-y-4">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0284C7]" />
                <span>Project Distribution by Difficulty Level</span>
              </h3>
              <div className="space-y-2.5">
                {(stats.stats.ideasByDifficulty || []).map((diff, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/80 border border-[#F1E4EC]">
                    <span className="text-[#5E5364] font-medium">{diff._id || 'Intermediate'}</span>
                    <Badge variant="sky">{diff.count} projects</Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Tab 2: User Management Table */}
      {activeTab === 'users' && !loading && (
        <div className="space-y-4 animate-fadeInUp">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name, email, or college..."
                className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm bg-white/90 border-[#F1E4EC] focus:border-[#BAE6FD]"
              />
            </div>
            <span className="text-xs text-[#5E5364] font-semibold">Showing {filteredUsers.length} users</span>
          </div>

          <GlassCard className="p-0 overflow-x-auto border-[#F1E4EC] bg-white/95 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#F1E4EC] bg-gradient-to-r from-[#BAE6FD]/20 via-[#BBF7D0]/20 to-[#FED7AA]/20 text-[#2D2530] font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-4">User</th>
                  <th className="p-4">Department & College</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Registered</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1E4EC] text-[#5E5364]">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-[#FFFDFE] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#2D2530]">{u.name}</div>
                      <div className="text-[11px] text-[#5E5364]">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#2D2530] font-medium">{u.branch || 'Engineering'}</div>
                      <div className="text-[11px] text-[#8E8295]">{u.college || 'University'}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.role === 'admin' ? 'gold' : 'sky'}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.isActive ? 'mint' : 'danger'}>
                        {u.isActive ? 'Active' : 'Disabled'}
                      </Badge>
                    </td>
                    <td className="p-4 text-[#8E8295] font-mono">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleUserRole(u._id, u.role)}
                        className="px-3 py-1 rounded-xl text-[11px] font-semibold bg-white hover:bg-[#FED7AA]/20 text-[#2D2530] border border-[#FED7AA] transition-all shadow-xs"
                      >
                        {u.role === 'admin' ? 'Demote to Student' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => handleToggleUserStatus(u._id, u.isActive)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-semibold border transition-all shadow-xs ${
                          u.isActive
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {u.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      )}

      {/* Tab 3: Problem Categories */}
      {activeTab === 'categories' && !loading && (
        <div className="space-y-4 animate-fadeInUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => {
              const variants = ['pink', 'peach', 'sky', 'mint', 'gold'];
              const variant = variants[idx % variants.length];
              return (
                <GlassCard key={cat._id} variant={variant} className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D2530]">{cat.name}</span>
                    <Tag className="w-3.5 h-3.5 text-[#5E5364]" />
                  </div>
                  <p className="text-xs text-[#5E5364] leading-relaxed">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-[#F1E4EC]">
                    {(cat.subcategories || []).map((sub, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/80 text-[#2D2530] border border-[#F1E4EC] font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
