import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import { adminAPI, problemAPI, projectAPI } from '../../services/api';
import {
  Compass,
  Lightbulb,
  GitBranch,
  Search,
  CheckCircle2,
  BookOpen,
  Cpu,
  MapPin,
  FileCheck2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  PlusCircle,
  Layers,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { activeProject, selectProject } = useProject();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    problemsDiscovered: 0,
    ideasGenerated: 0,
    ideasSaved: 0,
    ideasImproved: 0,
    latestProblems: [],
    savedProjects: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminAPI.getStudentDashboardStats();
        if (res.data.success) {
          setStats(res.data.stats);
          if (!activeProject && res.data.stats.latestProject) {
            selectProject(res.data.stats.latestProject);
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border-indigo-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 ambient-glow-purple -z-10 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Innovation Workbench</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || 'Researcher'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Domain focus: <span className="text-indigo-300 font-medium">{(user?.interests || []).join(', ') || 'Computer Science'}</span> • Target: <span className="text-purple-300 font-medium">{user?.preferredProjectType || 'Major Project'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/discover"
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Discover Problem
            </Link>
            <Link
              to="/analyzer"
              className="flex-1 md:flex-initial px-4 py-3 rounded-2xl glass-panel text-slate-200 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-medium border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-indigo-400" />
              Manual Analyzer
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <GlassCard className="p-5 border-indigo-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Problems Discovered</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.problemsDiscovered}</span>
            <p className="text-[11px] text-slate-500 mt-1">Analyzed through AI mentor</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-indigo-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ideas Saved</span>
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.ideasSaved}</span>
            <p className="text-[11px] text-slate-500 mt-1">Non-trivial project architectures</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-indigo-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ideas Improved</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.ideasImproved}</span>
            <p className="text-[11px] text-slate-500 mt-1">Versioned evolutions (v2+)</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border-indigo-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Capstone Readiness</span>
            <div className="w-8 h-8 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {activeProject?.isFinalized ? '100%' : activeProject ? '65%' : '0%'}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">Based on analysis pipeline</p>
          </div>
        </GlassCard>
      </div>

      {/* Active Project Highlight & Lifecycle Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Current Active Project
          </h2>
          <Link to="/library" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
            View All Saved Ideas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeProject ? (
          <GlassCard className="p-6 border-indigo-500/30">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="primary">{activeProject.domain || 'General'}</Badge>
                  <Badge variant="purple">Version {activeProject.currentVersion || 1}</Badge>
                  <Badge variant="cyan">{activeProject.difficultyLevel || 'Intermediate'}</Badge>
                  {activeProject.isFinalized && <Badge variant="success">Finalized Proposal</Badge>}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{activeProject.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  {activeProject.proposedSolution}
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch lg:self-auto">
                <Link
                  to="/evolve"
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-600/50 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  Evolve Idea
                </Link>
                <Link
                  to="/proposal"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Proposal
                </Link>
              </div>
            </div>

            {/* Quick Lifecycle Jump Links */}
            <div className="pt-5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Project Analysis & Engineering Modules:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link
                  to="/similarity"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-medium text-slate-200">Similarity</span>
                </Link>

                <Link
                  to="/feasibility"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-200">Feasibility</span>
                </Link>

                <Link
                  to="/research-gap"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-slate-200">Research Gap</span>
                </Link>

                <Link
                  to="/architecture"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-medium text-slate-200">Architecture</span>
                </Link>

                <Link
                  to="/roadmap"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-medium text-slate-200">10-Phase Roadmap</span>
                </Link>

                <Link
                  to="/proposal"
                  className="p-3 rounded-xl glass-panel-interactive text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <FileCheck2 className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-medium text-slate-200">Full Proposal</span>
                </Link>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-8 text-center border-dashed border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Active Project Selected</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Start by identifying a real-world problem or generate solution ideas from your domain interests.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                to="/discover"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-lg hover:bg-indigo-500 transition-colors"
              >
                Start Problem Discovery
              </Link>
              <Link
                to="/analyzer"
                className="px-5 py-2.5 rounded-xl glass-panel text-slate-300 text-xs font-semibold hover:text-white"
              >
                Analyze Existing Problem
              </Link>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Saved Projects & Recent Discoveries Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Projects */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            Saved Project Ideas
          </h3>
          <div className="space-y-3">
            {stats.savedProjects && stats.savedProjects.length > 0 ? (
              stats.savedProjects.map((proj) => (
                <GlassCard
                  key={proj._id}
                  interactive
                  onClick={() => {
                    selectProject(proj);
                    navigate('/evolve');
                  }}
                  className={`p-4 cursor-pointer ${
                    activeProject?._id === proj._id ? 'border-indigo-500/50 bg-indigo-950/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                    <Badge variant="primary">v{proj.currentVersion || 1}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {proj.proposedSolution}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
                    <span>{proj.domain || 'General'}</span>
                    <span className="text-indigo-400 font-medium">Click to select & evolve →</span>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="p-6 rounded-2xl glass-panel text-center text-xs text-slate-500">
                No ideas generated yet. Start with Problem Discovery!
              </div>
            )}
          </div>
        </div>

        {/* Recent Problem Statements */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            Recent Problem Discoveries
          </h3>
          <div className="space-y-3">
            {stats.latestProblems && stats.latestProblems.length > 0 ? (
              stats.latestProblems.map((prob) => (
                <GlassCard
                  key={prob._id}
                  interactive
                  onClick={() => navigate(`/generate?problemId=${prob._id}`)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{prob.title}</h4>
                    <Badge variant="purple">{prob.domain}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {prob.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
                    <span className="capitalize">{prob.source.replace('_', ' ')}</span>
                    <span className="text-purple-400 font-medium">Generate Solutions →</span>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="p-6 rounded-2xl glass-panel text-center text-xs text-slate-500">
                No problem reports generated yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
