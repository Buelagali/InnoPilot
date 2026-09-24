import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { projectAPI } from '../../services/api';
import {
  Lightbulb,
  Search,
  Filter,
  ArrowRight,
  Copy,
  Trash2,
  GitBranch,
  CheckCircle,
  PlusCircle,
  Compass,
  Layers,
  Sparkles,
  Clock,
  Code,
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

const difficultyFilters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Research Grade'];

const ProjectLibrary = () => {
  const navigate = useNavigate();
  const { activeProject, selectProject } = useProject();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('updated');

  useEffect(() => {
    fetchProjects();
  }, [selectedDomain, selectedDifficulty, sortBy]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedDomain !== 'All') params.domain = selectedDomain;
      if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Module 12 • Project Library & Version Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Saved Project Ideas & Architectures
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Manage, duplicate, search, and continue refining your capstone concepts across their full lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/discover')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Discover New Problem</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 sm:p-5 border-indigo-500/20 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, problem, features, or stack..."
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
            />
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
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
          <span className="text-xs text-slate-500 mr-2 flex-shrink-0">Domain:</span>
          {domainFilters.map((df) => (
            <button
              key={df}
              onClick={() => setSelectedDomain(df)}
              className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedDomain === df
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {df}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Projects Grid / Empty State */}
      {loading ? (
        <div className="p-16 text-center space-y-3">
          <Sparkles className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading your project library...</p>
        </div>
      ) : projects.length === 0 ? (
        <GlassCard className="p-12 text-center border-dashed border-white/10 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Projects Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || selectedDomain !== 'All'
              ? 'No projects match your active search filters.'
              : 'You haven’t generated or saved any project ideas yet.'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/discover')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Start Problem Discovery
            </button>
            <button
              onClick={() => navigate('/generate')}
              className="px-5 py-2.5 rounded-xl glass-panel text-slate-300 text-xs font-semibold"
            >
              Direct Idea Generator
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const isActive = activeProject?._id === proj._id;
            return (
              <GlassCard
                key={proj._id}
                interactive
                onClick={() => handleSelectAndOpen(proj)}
                className={`p-6 flex flex-col justify-between cursor-pointer transition-all ${
                  isActive ? 'border-indigo-500/80 ring-1 ring-indigo-500/50 bg-indigo-950/20' : 'border-white/10'
                }`}
              >
                <div className="space-y-3.5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="primary">{proj.domain || 'General'}</Badge>
                    <div className="flex items-center gap-1">
                      <Badge variant="purple">v{proj.currentVersion || 1}</Badge>
                      {isActive && <Badge variant="success">Active</Badge>}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white leading-snug hover:text-indigo-300 transition-colors">
                    {proj.title}
                  </h3>

                  {/* Problem & Solution */}
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {proj.proposedSolution}
                  </p>

                  {/* Tech stack badge list */}
                  {proj.techStack && (
                    <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 flex-wrap text-[10px] text-slate-400">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{[(proj.techStack.frontend || [])[0], (proj.techStack.backend || [])[0], (proj.techStack.aiMl || [])[0]].filter(Boolean).join(' • ')}</span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {new Date(proj.updatedAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleDuplicate(e, proj._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Duplicate Idea"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, proj._id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                      title="Delete Idea"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSelectAndOpen(proj)}
                      className="ml-1 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-medium flex items-center gap-1"
                    >
                      <span>Evolve</span>
                      <ArrowRight className="w-3 h-3" />
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
