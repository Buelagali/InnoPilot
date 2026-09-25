import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import { adminAPI } from '../../services/api';
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
  Layers,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#2D2530]">
      {/* Welcome Banner in Multi-Color Pastel Style */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border-[#F1E4EC] shadow-sm bg-gradient-to-r from-white via-[#FFFDFE] to-[#FFF7ED]">
        <div className="absolute top-0 right-0 w-96 h-96 ambient-glow-peach -z-10 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F6] text-[#E91E63] text-xs font-semibold mb-3 border border-[#FBCFE8]">
              <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Innovation Workbench</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2D2530] tracking-tight font-heading">
              Welcome back, {user?.name || 'Researcher'}
            </h1>
            <p className="text-xs sm:text-sm text-[#5E5364] mt-2 max-w-2xl leading-relaxed font-normal">
              Domain focus: <span className="text-[#C2410C] font-semibold">{(user?.interests || []).join(', ') || 'Computer Science'}</span> • Target: <span className="text-[#0284C7] font-semibold">{user?.preferredProjectType || 'Major Project'}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/discover"
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white font-semibold text-xs sm:text-sm shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Discover Problem
            </Link>
            <Link
              to="/analyzer"
              className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-white hover:bg-[#F0F9FF] text-[#2D2530] hover:text-[#0284C7] text-xs sm:text-sm font-semibold border border-[#BAE6FD] transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Search className="w-4 h-4 text-[#0EA5E9]" />
              Manual Analyzer
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Multi-Color Pastel Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Problems Discovered — Light Sky Blue */}
        <div className="pastel-glass-sky p-5 rounded-2xl border border-[#BAE6FD] flex flex-col justify-between shadow-xs transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0369A1] uppercase tracking-wider">Problems Discovered</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-[#2D2530] font-mono">{stats.problemsDiscovered}</span>
            <p className="text-[11px] text-[#5E5364] mt-1">Analyzed through AI mentor</p>
          </div>
        </div>

        {/* Metric 2: Ideas Saved — Light Peach / Orange */}
        <div className="pastel-glass-peach p-5 rounded-2xl border border-[#FED7AA] flex flex-col justify-between shadow-xs transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider">Ideas Saved</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-[#2D2530] font-mono">{stats.ideasSaved}</span>
            <p className="text-[11px] text-[#5E5364] mt-1">Non-trivial project architectures</p>
          </div>
        </div>

        {/* Metric 3: Ideas Improved — Soft Gold / Yellow */}
        <div className="pastel-glass-gold p-5 rounded-2xl border border-[#FDE68A] flex flex-col justify-between shadow-xs transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider">Ideas Improved</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-[#2D2530] font-mono">{stats.ideasImproved}</span>
            <p className="text-[11px] text-[#5E5364] mt-1">Versioned evolutions (v2+)</p>
          </div>
        </div>

        {/* Metric 4: Capstone Readiness — Soft Mint Green */}
        <div className="pastel-glass-mint p-5 rounded-2xl border border-[#BBF7D0] flex flex-col justify-between shadow-xs transition-all hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#15803D] uppercase tracking-wider">Capstone Readiness</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-bold text-[#2D2530] font-mono">
              {activeProject?.isFinalized ? '100%' : activeProject ? '65%' : '0%'}
            </span>
            <p className="text-[11px] text-[#5E5364] mt-1">Based on analysis pipeline</p>
          </div>
        </div>
      </div>

      {/* Active Project Highlight & Lifecycle Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#2D2530] flex items-center gap-2 font-heading">
            <Layers className="w-5 h-5 text-[#E91E63]" />
            Current Active Project
          </h2>
          <Link to="/library" className="text-xs text-[#0284C7] hover:text-[#0369A1] font-semibold flex items-center gap-1">
            View All Saved Ideas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeProject ? (
          <GlassCard className="p-6 border-[#F1E4EC] shadow-sm bg-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#F1E4EC]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="peach">{activeProject.domain || 'General'}</Badge>
                  <Badge variant="gold">Version {activeProject.currentVersion || 1}</Badge>
                  <Badge variant="sky">{activeProject.difficultyLevel || 'Intermediate'}</Badge>
                  {activeProject.isFinalized && <Badge variant="success">Finalized Proposal</Badge>}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D2530] font-heading">{activeProject.title}</h3>
                <p className="text-xs sm:text-sm text-[#5E5364] mt-2 max-w-3xl leading-relaxed font-normal">
                  {activeProject.proposedSolution}
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch lg:self-auto">
                <Link
                  to="/evolve"
                  className="px-4 py-2 rounded-xl bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] hover:bg-[#FFEDD5] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#F97316]" />
                  Evolve Idea
                </Link>
                <Link
                  to="/proposal"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white text-xs font-semibold shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Proposal
                </Link>
              </div>
            </div>

            {/* Quick Lifecycle Jump Links with Multi-Color Pastel Accents */}
            <div className="pt-5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#5E5364] mb-3">
                Project Analysis & Engineering Modules:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link
                  to="/similarity"
                  className="p-3 rounded-xl bg-white hover:bg-[#F0F9FF] border border-[#BAE6FD] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <Search className="w-4 h-4 text-[#0EA5E9] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">Similarity</span>
                </Link>

                <Link
                  to="/feasibility"
                  className="p-3 rounded-xl bg-white hover:bg-[#F0FDF4] border border-[#BBF7D0] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">Feasibility</span>
                </Link>

                <Link
                  to="/research-gap"
                  className="p-3 rounded-xl bg-white hover:bg-[#FFFBEB] border border-[#FDE68A] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <BookOpen className="w-4 h-4 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">Research Gap</span>
                </Link>

                <Link
                  to="/architecture"
                  className="p-3 rounded-xl bg-white hover:bg-[#F0F9FF] border border-[#BAE6FD] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <Cpu className="w-4 h-4 text-[#0284C7] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">Architecture</span>
                </Link>

                <Link
                  to="/roadmap"
                  className="p-3 rounded-xl bg-white hover:bg-[#F0FDF4] border border-[#BBF7D0] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <MapPin className="w-4 h-4 text-[#15803D] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">10-Phase Roadmap</span>
                </Link>

                <Link
                  to="/proposal"
                  className="p-3 rounded-xl bg-white hover:bg-[#FFF1F6] border border-[#FBCFE8] text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-all group"
                >
                  <FileCheck2 className="w-4 h-4 text-[#E91E63] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-[#2D2530]">Full Proposal</span>
                </Link>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-8 text-center border-dashed border-[#FED7AA] bg-[#FFFDFE]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#2D2530]">No Active Project Selected</h3>
            <p className="text-xs text-[#5E5364] mt-1 max-w-md mx-auto font-normal">
              Start by identifying a real-world problem or generate solution ideas from your domain interests.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                to="/discover"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white text-xs font-semibold shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all"
              >
                Start Problem Discovery
              </Link>
              <Link
                to="/analyzer"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F0F9FF] text-[#0284C7] text-xs font-semibold border border-[#BAE6FD]"
              >
                Analyze Existing Problem
              </Link>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Saved Projects & Recent Discoveries Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Saved Projects — Mint & Sky Theme */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#2D2530] flex items-center gap-2 font-heading">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
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
                  className={`p-4 cursor-pointer border-[#F1E4EC] hover:border-[#BBF7D0] ${
                    activeProject?._id === proj._id ? 'border-[#10B981] bg-[#F0FDF4]' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#2D2530] truncate font-heading">{proj.title}</h4>
                    <Badge variant="mint">v{proj.currentVersion || 1}</Badge>
                  </div>
                  <p className="text-xs text-[#5E5364] mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {proj.proposedSolution}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-[#5E5364]">
                    <span className="font-medium text-[#0284C7]">{proj.domain || 'General'}</span>
                    <span className="text-[#059669] font-semibold">Click to select & evolve →</span>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="p-6 rounded-2xl glass-panel text-center text-xs text-[#5E5364]">
                No ideas generated yet. Start with Problem Discovery!
              </div>
            )}
          </div>
        </div>

        {/* Recent Problem Statements — Peach & Sky Theme */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#2D2530] flex items-center gap-2 font-heading">
            <Compass className="w-4 h-4 text-[#FB923C]" />
            Recent Problem Discoveries
          </h3>
          <div className="space-y-3">
            {stats.latestProblems && stats.latestProblems.length > 0 ? (
              stats.latestProblems.map((prob) => (
                <GlassCard
                  key={prob._id}
                  interactive
                  onClick={() => navigate(`/generate?problemId=${prob._id}`)}
                  className="p-4 cursor-pointer border-[#F1E4EC] hover:border-[#FED7AA] bg-white"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#2D2530] truncate font-heading">{prob.title}</h4>
                    <Badge variant="peach">{prob.domain}</Badge>
                  </div>
                  <p className="text-xs text-[#5E5364] mt-1.5 line-clamp-2 leading-relaxed font-normal">
                    {prob.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-[#5E5364]">
                    <span className="capitalize">{prob.source.replace('_', ' ')}</span>
                    <span className="text-[#EA580C] font-semibold">Generate Solutions →</span>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="p-6 rounded-2xl glass-panel text-center text-xs text-[#5E5364]">
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
