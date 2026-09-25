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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Platform Telemetry & Governance
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1">
            Monitor platform usage, manage student permissions, inspect generated architectures, and configure problem categories.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-[#f3c5d3]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                : 'text-[#6b5560] hover:text-[#3a2630]'
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                : 'text-[#6b5560] hover:text-[#3a2630]'
            }`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                : 'text-[#6b5560] hover:text-[#3a2630]'
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-16 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs text-[#6b5560]">Loading system metrics...</p>
        </div>
      )}

      {/* Tab 1: Overview & Statistics */}
      {activeTab === 'overview' && stats && !loading && (
        <div className="space-y-8 animate-in fade-in">
          {/* Top Level Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <GlassCard className="p-5 border-[#f3c5d3] bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6b5560]">Total Users</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#3a2630] font-mono">{stats.stats.totalUsers}</span>
                <Users className="w-5 h-5 text-[#e91e63]" />
              </div>
              <p className="text-[11px] text-[#9d808d] mt-1">{stats.stats.totalStudents} Active Students</p>
            </GlassCard>

            <GlassCard className="p-5 border-[#f3c5d3] bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6b5560]">Problems Logged</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#3a2630] font-mono">{stats.stats.totalProblems}</span>
                <Compass className="w-5 h-5 text-[#d81b60]" />
              </div>
              <p className="text-[11px] text-[#9d808d] mt-1">Discovered or Analyzed</p>
            </GlassCard>

            <GlassCard className="p-5 border-[#f3c5d3] bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6b5560]">Ideas Generated</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#3a2630] font-mono">{stats.stats.totalIdeas}</span>
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-[11px] text-[#9d808d] mt-1">Non-trivial architectures</p>
            </GlassCard>

            <GlassCard className="p-5 border-[#f3c5d3] bg-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6b5560]">Idea Evolutions</span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#3a2630] font-mono">{stats.stats.totalVersions}</span>
                <GitBranch className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-[#9d808d] mt-1">Version snapshots stored</p>
            </GlassCard>
          </div>

          {/* Domain & Difficulty Distribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-[#f3c5d3] space-y-4 bg-white">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#e91e63]" />
                Project Distribution by Domain
              </h3>
              <div className="space-y-2.5">
                {(stats.stats.ideasByDomain || []).map((dom, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-[#6b5560] font-medium">{dom._id || 'General'}</span>
                    <span className="font-mono font-bold text-[#e91e63]">{dom.count} projects</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-[#f3c5d3] space-y-4 bg-white">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#d81b60]" />
                Project Distribution by Difficulty Level
              </h3>
              <div className="space-y-2.5">
                {(stats.stats.ideasByDifficulty || []).map((diff, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-[#6b5560] font-medium">{diff._id || 'Intermediate'}</span>
                    <span className="font-mono font-bold text-[#d81b60]">{diff.count} projects</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Tab 2: User Management Table */}
      {activeTab === 'users' && !loading && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#9d808d] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users by name, email, or college..."
                className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
              />
            </div>
            <span className="text-xs text-[#6b5560] font-mono">Showing {filteredUsers.length} users</span>
          </div>

          <GlassCard className="p-0 overflow-x-auto border-[#f3c5d3] bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#fce4ec] bg-[#fff8fa] text-[#6b5560] font-semibold uppercase text-[10px] tracking-wider">
                  <th className="p-4">User</th>
                  <th className="p-4">Department & College</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Registered</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#fce4ec] text-[#6b5560]">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-[#fff8fa] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#3a2630]">{u.name}</div>
                      <div className="text-[11px] text-[#6b5560]">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-[#3a2630] font-medium">{u.branch || 'Engineering'}</div>
                      <div className="text-[11px] text-[#9d808d]">{u.college || 'University'}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.role === 'admin' ? 'warning' : 'pink'}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={u.isActive ? 'success' : 'danger'}>
                        {u.isActive ? 'Active' : 'Disabled'}
                      </Badge>
                    </td>
                    <td className="p-4 text-[#9d808d] font-mono">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleUserRole(u._id, u.role)}
                        className="px-2.5 py-1 rounded-lg text-[10px] bg-white hover:bg-[#fff0f5] text-[#3a2630] border border-[#f3c5d3] transition-colors"
                      >
                        {u.role === 'admin' ? 'Demote to Student' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => handleToggleUserStatus(u._id, u.isActive)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] border transition-colors ${
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
        <div className="space-y-4 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <GlassCard key={cat._id} className="p-5 border-[#f3c5d3] space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3a2630]">{cat.name}</span>
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-xs text-[#6b5560] leading-relaxed">{cat.description}</p>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-[#fce4ec]">
                  {(cat.subcategories || []).map((sub, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3]">
                      {sub}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
