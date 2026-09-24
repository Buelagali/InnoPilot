import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, User, Mail, Lock, School, Code, Cpu, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';

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

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: 'Computer Science & Engineering',
    skills: 'React, Node.js, Python, Tailwind',
    programmingLanguages: 'JavaScript, Python, C++',
    aimlKnowledge: 'Beginner',
    webDevKnowledge: 'Intermediate',
    interests: ['Healthcare & Medicine'],
    experienceLevel: '3rd Year',
    preferredProjectType: 'Major Project',
    preferredDuration: '3 - 6 Months',
    teamSize: 2,
    hardwareAvailability: 'Standard Laptop',
    budget: 'Zero Budget (Open Source Only)',
    isResearchOriented: true,
  });

  const handleInterestToggle = (domain) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(domain);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((d) => d !== domain) : [...prev.interests, domain],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message || 'Registration failed. Please check your inputs.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-indigo-600/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Create Student Profile</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Set up your academic and technical profile so our AI mentor can tailor project recommendations to your exact skills and constraints.
        </p>
      </div>

      <GlassCard className="p-6 sm:p-8 border-indigo-500/20">
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Account Info */}
          <div>
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> Account Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-300 font-medium mb-1">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Academic Background */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <School className="w-4 h-4" /> Academic Affiliation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="Institute of Technology"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Department / Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Current Year / Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year / Final Year">4th Year / Final Year</option>
                  <option value="Postgraduate">Postgraduate (M.Tech / MS)</option>
                  <option value="Self-Taught">Self-Taught / Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Preferred Project Scope</label>
                <select
                  value={formData.preferredProjectType}
                  onChange={(e) => setFormData({ ...formData, preferredProjectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                >
                  <option value="Major Project">Major Project (Final Year Capstone)</option>
                  <option value="Minor Project">Minor Project (Pre-Final Semester)</option>
                  <option value="Research Paper">Research Paper / Thesis</option>
                  <option value="Hackathon MVP">Hackathon MVP</option>
                  <option value="Industry Prototype">Industry Prototype</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Skills */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" /> Technical Proficiency
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Key Technical Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Node.js, Python, MongoDB"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Programming Languages</label>
                <input
                  type="text"
                  value={formData.programmingLanguages}
                  onChange={(e) => setFormData({ ...formData, programmingLanguages: e.target.value })}
                  placeholder="JavaScript, Python, C++, Java"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">AI / ML Familiarity</label>
                <select
                  value={formData.aimlKnowledge}
                  onChange={(e) => setFormData({ ...formData, aimlKnowledge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                >
                  <option value="None">None (Pure Full-Stack / Systems)</option>
                  <option value="Beginner">Beginner (Basic APIs, prompt engineering)</option>
                  <option value="Intermediate">Intermediate (PyTorch, fine-tuning, embeddings)</option>
                  <option value="Advanced">Advanced (Custom architectures, transformers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Web Development Knowledge</label>
                <select
                  value={formData.webDevKnowledge}
                  onChange={(e) => setFormData({ ...formData, webDevKnowledge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                >
                  <option value="Beginner">Beginner (HTML, CSS, basic JS)</option>
                  <option value="Intermediate">Intermediate (React, REST APIs, Node.js)</option>
                  <option value="Advanced">Advanced (Microservices, WebSockets, SSR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Domain Interests */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Domain Interests
            </h3>
            <p className="text-xs text-slate-400 mb-3">Select the domains you are most passionate about exploring:</p>
            <div className="flex flex-wrap gap-2">
              {domainOptions.map((domain) => {
                const isSelected = formData.interests.includes(domain);
                return (
                  <button
                    type="button"
                    key={domain}
                    onClick={() => handleInterestToggle(domain)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Constraints & Research Interest */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Hardware Availability</label>
              <select
                value={formData.hardwareAvailability}
                onChange={(e) => setFormData({ ...formData, hardwareAvailability: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
              >
                <option value="Standard Laptop">Standard Laptop (CPU Only)</option>
                <option value="GPU / High-end PC">GPU / High-end PC (Nvidia CUDA)</option>
                <option value="Cloud / Colab">Cloud Free Tier / Google Colab</option>
                <option value="IoT / Microcontrollers">IoT / Microcontrollers (Arduino/Raspberry Pi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Team Size</label>
              <input
                type="number"
                min={1}
                max={6}
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Creating Student Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Registration & Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
            Sign In to Account
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
