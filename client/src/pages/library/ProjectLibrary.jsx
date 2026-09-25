import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { projectAPI } from '../../services/api';
import {
  FolderKanban,
  Search,
  ArrowRight,
  Copy,
  Trash2,
  Compass,
  Sparkles,
  Code,
  Layers,
  Calendar,
  Sparkle
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

const domainFilters = [
  'All',
  'Healthcare & Medicine',
  'Education & Accessibility',
  'Agriculture & Food Security',
  'Environment & Climate Tech',
  'Transportation & Logistics',
  'Cybersecurity & Privacy',
  'Software Systems & DevOps',
  'Smart Campus & Community',
];

const getDomainVariant = (domain) => {
  if (!domain) return 'pink';
  const d = domain.toLowerCase();
  if (d.includes('health') || d.includes('agri') || d.includes('enviro')) return 'mint';
  if (d.includes('edu') || d.includes('soft') || d.includes('cloud')) return 'sky';
  if (d.includes('cyber') || d.includes('trans')) return 'peach';
  return 'gold';
};

const ProjectLibrary = () => {
  const navigate = useNavigate();
  const { activeProject, selectProject } = useProject();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  useEffect(() => {
    fetchProjects();
  }, [selectedDomain, sortBy]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedDomain !== 'All') params.domain = selectedDomain;
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sort = sortBy;

      const res = await projectAPI.getProjects(params);
      if (res.data.success) {
        setProjects(res.data.projects);
      }
    } catch (err) {
      console.error('Failed to load project library', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleDuplicate = async (e, projectId) => {
    e.stopPropagation();
    try {
      const res = await projectAPI.duplicateProject(projectId);
      if (res.data.success) {
        fetchProjects();
      }
    } catch (err) {
      alert('Failed to duplicate project idea.');
    }
  };

  const handleDelete = async (e, projectId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this project idea and all its version history?')) return;
    try {
      const res = await projectAPI.deleteProject(projectId);
      if (res.data.success) {
        if (activeProject?._id === projectId) {
          selectProject(null);
        }
        fetchProjects();
      }
    } catch (err) {
      alert('Failed to delete project idea.');
    }
  };

  const handleSelectAndOpen = (proj) => {
    selectProject(proj);
    navigate('/evolve');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#BBF7D0]/30 via-[#BAE6FD]/30 to-[#FED7AA]/30 border border-[#BBF7D0]/60 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
            <FolderKanban className="w-3.5 h-3.5 text-emerald-700" />
            <span>Module 12 • Project Library & Version Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">
            Saved Project Ideas & Architectures
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl leading-relaxed">
            Manage, duplicate, search, and continue refining your capstone concepts across their full lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/discover')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FED7AA] via-[#F9A8C8] to-[#BAE6FD] text-[#2D2530] text-xs font-bold shadow-md shadow-[#FED7AA]/30 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-[#2D2530]" />
            <span>Discover New Problem</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard variant="mint" className="p-4 sm:p-5 border-[#BBF7D0]/60 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-[#8E8295] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, problem, features, or stack..."
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm bg-white/90 border-[#F1E4EC] focus:border-[#BBF7D0]"
            />
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5E5364] whitespace-nowrap font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs bg-white text-[#2D2530] border border-[#F1E4EC] focus:border-[#BAE6FD] outline-none shadow-xs font-medium"
            >
              <option value="updated">Recently Updated</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="version">Highest Version</option>
            </select>
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-[#8E8295] mr-2 flex-shrink-0 font-medium">Domain:</span>
          {domainFilters.map((df) => {
            const isSelected = selectedDomain === df;
            return (
              <button
                key={df}
                onClick={() => setSelectedDomain(df)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#BBF7D0] via-[#BAE6FD] to-[#FED7AA] text-[#2D2530] shadow-sm font-bold border border-[#BBF7D0]'
                    : 'bg-white text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FFFDFE] border border-[#F1E4EC]'
                }`}
              >
                {df}
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Projects Grid / Empty State */}
      {loading ? (
        <div className="p-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#BBF7D0]/30 to-[#BAE6FD]/30 border border-[#BBF7D0]/50 flex items-center justify-center mx-auto text-emerald-700 animate-spin shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-xs text-[#5E5364] font-medium">Loading your project library...</p>
        </div>
      ) : projects.length === 0 ? (
        <GlassCard variant="peach" className="p-12 text-center border-dashed border-[#FED7AA] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FED7AA]/40 to-[#FDE68A]/40 text-[#EA580C] border border-[#FED7AA] flex items-center justify-center mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2D2530]">No Projects Found</h3>
          <p className="text-xs text-[#5E5364] max-w-sm mx-auto leading-relaxed">
            {searchQuery || selectedDomain !== 'All'
              ? 'No projects match your active search filters.'
              : 'You haven’t generated or saved any project ideas yet.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/discover')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FED7AA] via-[#F9A8C8] to-[#BAE6FD] text-[#2D2530] text-xs font-bold shadow-md shadow-[#FED7AA]/30 hover:scale-105 transition-all"
            >
              Start Problem Discovery
            </button>
            <button
              onClick={() => navigate('/generate')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FED7AA]/15 text-[#2D2530] text-xs font-bold border border-[#FED7AA] transition-colors shadow-xs"
            >
              Direct Idea Generator
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => {
            const isActive = activeProject?._id === proj._id;
            const cardVariant = getDomainVariant(proj.domain);
            
            return (
              <GlassCard
                key={proj._id}
                variant={cardVariant}
                interactive
                onClick={() => handleSelectAndOpen(proj)}
                className={`p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-[#DB2777] ring-2 ring-[#F9A8C8]/40 bg-white/95 shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="space-y-3.5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={cardVariant}>{proj.domain || 'General'}</Badge>
                    <div className="flex items-center gap-1">
                      <Badge variant="gold">v{proj.currentVersion || 1}</Badge>
                      {isActive && <Badge variant="mint">Active</Badge>}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#2D2530] leading-snug hover:text-[#DB2777] transition-colors line-clamp-2">
                    {proj.title}
                  </h3>

                  {/* Problem & Solution */}
                  <p className="text-xs text-[#5E5364] line-clamp-3 leading-relaxed">
                    {proj.proposedSolution}
                  </p>

                  {/* Tech stack badge list */}
                  {proj.techStack && (
                    <div className="pt-2.5 border-t border-[#F1E4EC] flex items-center gap-1.5 flex-wrap text-[11px] text-[#5E5364]">
                      <Code className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span className="font-medium">
                        {[(proj.techStack.frontend || [])[0], (proj.techStack.backend || [])[0], (proj.techStack.aiMl || [])[0]].filter(Boolean).join(' • ') || 'Full Stack Architecture'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3 border-t border-[#F1E4EC] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#8E8295] font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(e, proj._id)}
                      className="p-1.5 rounded-lg text-[#5E5364] hover:text-[#EA580C] hover:bg-[#FED7AA]/20 transition-colors"
                      title="Duplicate Idea"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, proj._id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Delete Idea"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSelectAndOpen(proj)}
                      className="ml-1 px-3 py-1 rounded-xl bg-gradient-to-r from-[#F9A8C8]/25 via-[#FED7AA]/25 to-[#BBF7D0]/25 hover:from-[#F9A8C8]/40 hover:to-[#BBF7D0]/40 text-[#2D2530] text-xs font-bold flex items-center gap-1 transition-all border border-[#F1E4EC]"
                    >
                      <span>Evolve</span>
                      <ArrowRight className="w-3 h-3 text-[#DB2777]" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectLibrary;
