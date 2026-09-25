import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, User, School, Code, BookOpen, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto px-4 py-10 text-[#2D2530] relative">
      {/* Soft Ambient Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#F9A8C8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#BAE6FD]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F9A8C8] via-[#FED7AA] to-[#BAE6FD] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#F9A8C8]/25 border border-white/80">
          <Sparkles className="w-7 h-7 text-[#2D2530]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">Create Student Profile</h1>
        <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-xl mx-auto font-medium">
          Set up your academic and technical profile so our AI mentor can tailor project recommendations to your exact skills and constraints.
        </p>
      </div>

      <GlassCard variant="peach" className="p-6 sm:p-8 border-[#FED7AA]/60 shadow-xl shadow-[#FED7AA]/10 bg-white/95 relative z-10">
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50/90 border border-rose-200 flex items-start gap-3 text-rose-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Account Info */}
          <div>
            <h3 className="text-sm font-bold text-[#EA580C] uppercase tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#EA580C]" />
              <span>Account Credentials</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#FED7AA]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#FED7AA]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#FED7AA]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Academic Background */}
          <div className="pt-4 border-t border-[#F1E4EC]">
            <h3 className="text-sm font-bold text-[#0284C7] uppercase tracking-wider mb-3 flex items-center gap-2">
              <School className="w-4 h-4 text-[#0284C7]" />
              <span>Academic Affiliation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="Institute of Technology"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#BAE6FD]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Department / Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="Computer Science & Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#BAE6FD]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Current Year / Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#BAE6FD] outline-none shadow-xs font-medium"
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
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Preferred Project Scope</label>
                <select
                  value={formData.preferredProjectType}
                  onChange={(e) => setFormData({ ...formData, preferredProjectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#BAE6FD] outline-none shadow-xs font-medium"
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
          <div className="pt-4 border-t border-[#F1E4EC]">
            <h3 className="text-sm font-bold text-[#DB2777] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-[#DB2777]" />
              <span>Technical Proficiency</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Key Technical Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Node.js, Python, MongoDB"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#F9A8C8]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Programming Languages</label>
                <input
                  type="text"
                  value={formData.programmingLanguages}
                  onChange={(e) => setFormData({ ...formData, programmingLanguages: e.target.value })}
                  placeholder="JavaScript, Python, C++, Java"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#F9A8C8]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">AI / ML Familiarity</label>
                <select
                  value={formData.aimlKnowledge}
                  onChange={(e) => setFormData({ ...formData, aimlKnowledge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#F9A8C8] outline-none shadow-xs font-medium"
                >
                  <option value="None">None (Pure Full-Stack / Systems)</option>
                  <option value="Beginner">Beginner (Basic APIs, prompt engineering)</option>
                  <option value="Intermediate">Intermediate (PyTorch, fine-tuning, embeddings)</option>
                  <option value="Advanced">Advanced (Custom architectures, transformers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#2D2530] font-bold mb-1">Web Development Knowledge</label>
                <select
                  value={formData.webDevKnowledge}
                  onChange={(e) => setFormData({ ...formData, webDevKnowledge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#F9A8C8] outline-none shadow-xs font-medium"
                >
                  <option value="Beginner">Beginner (HTML, CSS, basic JS)</option>
                  <option value="Intermediate">Intermediate (React, REST APIs, Node.js)</option>
                  <option value="Advanced">Advanced (Microservices, WebSockets, SSR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Domain Interests */}
          <div className="pt-4 border-t border-[#F1E4EC]">
            <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Domain Interests</span>
            </h3>
            <p className="text-xs text-[#5E5364] mb-3 font-medium">Select the domains you are most passionate about exploring:</p>
            <div className="flex flex-wrap gap-2">
              {domainOptions.map((domain) => {
                const isSelected = formData.interests.includes(domain);
                return (
                  <button
                    type="button"
                    key={domain}
                    onClick={() => handleInterestToggle(domain)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FED7AA]/40 to-[#FDE68A]/40 text-[#2D2530] border-[#FED7AA] shadow-xs font-bold'
                        : 'bg-white text-[#5E5364] border-[#F1E4EC] hover:bg-[#FFFDFE]'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Constraints & Research Interest */}
          <div className="pt-4 border-t border-[#F1E4EC] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#2D2530] font-bold mb-1">Hardware Availability</label>
              <select
                value={formData.hardwareAvailability}
                onChange={(e) => setFormData({ ...formData, hardwareAvailability: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#BBF7D0] outline-none shadow-xs font-medium"
              >
                <option value="Standard Laptop">Standard Laptop (CPU Only)</option>
                <option value="GPU / High-end PC">GPU / High-end PC (Nvidia CUDA)</option>
                <option value="Cloud / Colab">Cloud Free Tier / Google Colab</option>
                <option value="IoT / Microcontrollers">IoT / Microcontrollers (Arduino/Raspberry Pi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#2D2530] font-bold mb-1">Team Size</label>
              <input
                type="number"
                min={1}
                max={6}
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white/90 border-[#F1E4EC] focus:border-[#BBF7D0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] text-[#2D2530] font-bold text-sm shadow-lg shadow-[#F9A8C8]/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-[#DB2777]" />
                <span>Creating Student Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Registration & Open Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#2D2530]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#F1E4EC] text-center text-xs text-[#5E5364]">
          Already registered?{' '}
          <Link to="/login" className="text-[#DB2777] hover:text-[#9D174D] font-bold transition-colors">
            Sign In to Account
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default Register;
