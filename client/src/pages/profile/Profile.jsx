import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { User, School, Code, Cpu, Shield, KeyRound, Check, Sparkles, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

const domainOptions = [
  'Healthcare & Medicine',
  'Education & Accessibility',
  'Agriculture & Food Security',
  'Environment & Climate Tech',
  'Transportation & Logistics',
  'Cybersecurity & Privacy',
  'Software Engineering & DevOps',
  'Smart Campus & Student Life',
];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    branch: '',
    skills: '',
    programmingLanguages: '',
    aimlKnowledge: 'Beginner',
    webDevKnowledge: 'Intermediate',
    interests: [],
    experienceLevel: '3rd Year',
    preferredProjectType: 'Major Project',
    preferredDuration: '3 - 6 Months',
    teamSize: 2,
    hardwareAvailability: 'Standard Laptop',
    budget: 'Zero Budget (Open Source Only)',
    isResearchOriented: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        college: user.college || '',
        branch: user.branch || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
        programmingLanguages: Array.isArray(user.programmingLanguages) ? user.programmingLanguages.join(', ') : '',
        aimlKnowledge: user.aimlKnowledge || 'Beginner',
        webDevKnowledge: user.webDevKnowledge || 'Intermediate',
        interests: user.interests || [],
        experienceLevel: user.experienceLevel || '3rd Year',
        preferredProjectType: user.preferredProjectType || 'Major Project',
        preferredDuration: user.preferredDuration || '3 - 6 Months',
        teamSize: user.teamSize || 2,
        hardwareAvailability: user.hardwareAvailability || 'Standard Laptop',
        budget: user.budget || 'Zero Budget (Open Source Only)',
        isResearchOriented: user.isResearchOriented !== undefined ? user.isResearchOriented : true,
      });
    }
  }, [user]);

  const handleInterestToggle = (domain) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(domain);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((d) => d !== domain) : [...prev.interests, domain],
      };
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setSavingProfile(true);

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        programmingLanguages: formData.programmingLanguages.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const res = await authAPI.updateProfile(payload);
      if (res.data.success) {
        updateUser(res.data.user);
        setProfileMsg({ type: 'success', text: 'Profile updated successfully! AI mentor prompts updated.' });
      }
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });
    setSavingPassword(true);

    try {
      const res = await authAPI.changePassword(passwordData);
      if (res.data.success) {
        setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '' });
      }
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.response?.data?.message || 'Failed to change password.' });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Header Card */}
      <GlassCard className="p-6 sm:p-8 border-indigo-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-2xl shadow-xl shadow-indigo-600/30">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user?.name}</h1>
              <Badge variant="primary">{user?.role === 'admin' ? 'Administrator' : 'Student Researcher'}</Badge>
              <Badge variant="purple">{user?.branch || 'Engineering'}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {user?.email} • {user?.college || 'University Capstone Program'}
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 sm:p-8 border-indigo-500/20">
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Student Innovation Profile & Preferences
            </h2>

            {profileMsg.text && (
              <div
                className={`mb-6 p-3.5 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {profileMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">College / University</label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department / Branch</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Year</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year / Final Year">4th Year / Final Year</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>

              {/* Technical Capabilities */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Technical Skills (Frameworks, Libraries)
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, Express, MongoDB, Tailwind, PyTorch"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Programming Languages</label>
                  <input
                    type="text"
                    value={formData.programmingLanguages}
                    onChange={(e) => setFormData({ ...formData, programmingLanguages: e.target.value })}
                    placeholder="JavaScript, Python, C++, SQL"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">AI / ML Level</label>
                    <select
                      value={formData.aimlKnowledge}
                      onChange={(e) => setFormData({ ...formData, aimlKnowledge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                    >
                      <option value="None">None</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Web Dev Knowledge</label>
                    <select
                      value={formData.webDevKnowledge}
                      onChange={(e) => setFormData({ ...formData, webDevKnowledge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Domain Interests */}
              <div className="pt-4 border-t border-white/5">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Domain Interests</label>
                <div className="flex flex-wrap gap-2">
                  {domainOptions.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => handleInterestToggle(d)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        formData.interests.includes(d)
                          ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500'
                          : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware & Scope */}
              <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hardware Availability</label>
                  <select
                    value={formData.hardwareAvailability}
                    onChange={(e) => setFormData({ ...formData, hardwareAvailability: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="Standard Laptop">Standard Laptop</option>
                    <option value="GPU / High-end PC">GPU / High-end PC</option>
                    <option value="Cloud / Colab">Cloud Free Tier / Colab</option>
                    <option value="IoT / Microcontrollers">IoT / Microcontrollers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Project Type</label>
                  <select
                    value={formData.preferredProjectType}
                    onChange={(e) => setFormData({ ...formData, preferredProjectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="Major Project">Major Project</option>
                    <option value="Minor Project">Minor Project</option>
                    <option value="Research Paper">Research Paper</option>
                    <option value="Hackathon MVP">Hackathon MVP</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {savingProfile ? <Sparkles className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Innovation Profile
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Password & Security Card */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-indigo-500/20">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-purple-400" />
              Change Password
            </h2>

            {passwordMsg.text && (
              <div
                className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {passwordMsg.type === 'success' ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Min. 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={savingPassword}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs border border-white/10 transition-colors"
              >
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </GlassCard>

          <GlassCard className="p-6 border-indigo-500/10 bg-slate-900/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">AI Context Awareness</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whenever you evolve an idea, evaluate feasibility, or generate roadmaps, the backend AI service injects your profile constraints to ensure every recommendation is achievable.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
