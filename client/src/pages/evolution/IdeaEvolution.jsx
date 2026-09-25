import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { projectAPI } from '../../services/api';
import {
  GitBranch,
  Sparkles,
  Zap,
  Cpu,
  Minimize2,
  BookOpen,
  CheckCircle,
  Shield,
  Layers,
  History,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  Check,
  Code,
  Tag,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const evolutionActions = [
  { label: 'Make More Innovative', icon: Zap, desc: 'Infuse multimodal or edge-native components' },
  { label: 'Make Research-Oriented', icon: BookOpen, desc: 'Add formal empirical metrics and baseline novelties' },
  { label: 'Reduce Complexity', icon: Minimize2, desc: 'Prune fragile dependencies for a solid MVP' },
  { label: 'Make It More Practical', icon: CheckCircle, desc: 'Anchor to low-bandwidth/offline real-world constraints' },
  { label: 'Add AI / Intelligence', icon: Cpu, desc: 'Introduce predictive or adaptive perception layers' },
  { label: 'Improve Scalability', icon: Layers, desc: 'Refactor state caching, queues, and async microservices' },
  { label: 'Improve Security & Privacy', icon: Shield, desc: 'Zero-trust, differential privacy, and role enforcement' },
  { label: 'Suggest Missing Features', icon: Sparkles, desc: 'Identify edge case handlers and audit capabilities' },
];

const IdeaEvolution = () => {
  const navigate = useNavigate();
  const { activeProject, refreshActiveProject, selectProject } = useProject();

  const [versions, setVersions] = useState([]);
  const [selectedVersionForCompare, setSelectedVersionForCompare] = useState(null);
  const [customInstruction, setCustomInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (activeProject?._id) {
      fetchVersions();
    }
  }, [activeProject?._id, activeProject?.currentVersion]);

  const fetchVersions = async () => {
    try {
      const res = await projectAPI.getIdeaVersions(activeProject._id);
      if (res.data.success) {
        setVersions(res.data.versions);
      }
    } catch (err) {
      console.error('Failed to load versions', err);
    }
  };

  const handleEvolve = async (actionLabel) => {
    if (!activeProject?._id) return;
    setLoading(true);
    setActionInProgress(actionLabel);
    setError('');
    setSuccessMsg('');

    try {
      const res = await projectAPI.evolveIdea(activeProject._id, {
        action: actionLabel,
        customInstruction: customInstruction.trim(),
      });

      if (res.data.success) {
        selectProject(res.data.idea);
        setSuccessMsg(res.data.message);
        setCustomInstruction('');
        await fetchVersions();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Evolution failed. Please try again.');
    } finally {
      setLoading(false);
      setActionInProgress('');
    }
  };

  const handleRestoreVersion = async (versionNumber) => {
    if (!window.confirm(`Are you sure you want to restore Version ${versionNumber}?`)) return;
    setLoading(true);

    try {
      const res = await projectAPI.restoreIdeaVersion(activeProject._id, versionNumber);
      if (res.data.success) {
        selectProject(res.data.idea);
        setSuccessMsg(`Restored to Version ${versionNumber}.`);
        await fetchVersions();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to restore version.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-[#f3c5d3] bg-white/95">
          <GitBranch className="w-12 h-12 text-[#e91e63] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#3a2630]">No Active Project Selected</h2>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Please select an existing project from your library or generate a new idea first.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/library')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#ec407a] text-white text-xs font-semibold shadow-md shadow-pink-500/20"
            >
              Open Project Library
            </button>
            <button
              onClick={() => navigate('/discover')}
              className="px-5 py-2.5 rounded-xl glass-panel text-[#6b5560] hover:text-[#3a2630] text-xs font-semibold border border-[#f3c5d3]"
            >
              Discover Problems
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <WorkflowStepIndicator currentStepId="evolution" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <GitBranch className="w-3.5 h-3.5 text-[#e91e63]" />
            <span>Module 5 • Idea Evolution Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Iterate & Perfect Your Project Concept
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            Continuously evolve your project using targeted AI transformations. Every major iteration is stored as an immutable version in MongoDB so you can compare or restore anytime.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="pink" className="text-sm px-3 py-1">
            Current: v{activeProject.currentVersion || 1}
          </Badge>
          <button
            onClick={() => navigate('/similarity')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e91e63] text-white text-xs font-semibold shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>Next: Similarity Check</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid: Evolution Workbench & Version Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Version Detail & Action Triggers */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 sm:p-8 border-[#f3c5d3] bg-white/95 shadow-md shadow-pink-500/5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#f3c5d3] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e91e63]">
                  Active Idea Snapshot
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#3a2630] mt-0.5">{activeProject.title}</h2>
              </div>
              <Badge variant="pink">{activeProject.difficultyLevel || 'Intermediate'}</Badge>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-[#6b5560] uppercase text-[11px] block mb-1">Problem Focus:</span>
                <p className="text-[#3a2630] bg-[#fff8fa] p-3 rounded-xl border border-[#f3c5d3]">
                  {activeProject.problemAddressed}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#6b5560] uppercase text-[11px] block mb-1">Proposed Architecture:</span>
                <p className="text-[#3a2630] bg-[#fff8fa] p-3 rounded-xl border border-[#f3c5d3] leading-relaxed">
                  {activeProject.proposedSolution}
                </p>
              </div>

              <div>
                <span className="font-bold text-[#6b5560] uppercase text-[11px] block mb-1">Core Features:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(activeProject.coreFeatures || []).map((feat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#fff8fa] border border-[#f3c5d3] text-[#3a2630] text-xs flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#e91e63] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fce4ec]/50 border border-[#f3c5d3]">
                <span className="font-bold text-[#e91e63] block mb-1">AI / ML Integration:</span>
                <p className="text-[#3a2630] text-xs leading-relaxed">{activeProject.aiRole}</p>
              </div>
            </div>
          </GlassCard>

          {/* Evolution Action Bar */}
          <GlassCard className="p-6 border-[#f3c5d3] bg-white/90 space-y-4">
            <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#e91e63]" />
              Evolve to Version {(activeProject.currentVersion || 1) + 1}
            </h3>

            {/* Custom Instruction Input */}
            <div>
              <input
                type="text"
                value={customInstruction}
                onChange={(e) => setCustomInstruction(e.target.value)}
                placeholder="Optional custom instruction: e.g., 'Optimize for mobile web on low-bandwidth networks'..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-[#3a2630] placeholder-[#886a7a] border-[#f3c5d3]"
                disabled={loading}
              />
            </div>

            {/* Transformation Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evolutionActions.map((act, i) => {
                const Icon = act.icon;
                const isThisLoading = loading && actionInProgress === act.label;
                return (
                  <button
                    key={i}
                    onClick={() => handleEvolve(act.label)}
                    disabled={loading}
                    className="p-3 rounded-xl bg-[#fff8fa] text-left border border-[#f3c5d3] hover:border-[#e91e63] hover:shadow-md hover:shadow-pink-500/10 flex items-start gap-3 disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#fce4ec] text-[#e91e63] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {isThisLoading ? <Sparkles className="w-4 h-4 animate-spin text-[#e91e63]" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#3a2630] block group-hover:text-[#e91e63] transition-colors">
                        {act.label}
                      </span>
                      <span className="text-[11px] text-[#6b5560] leading-tight block mt-0.5">
                        {act.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right Col: Version History & Comparison */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-[#f3c5d3] bg-white/95">
            <h3 className="text-sm font-bold text-[#3a2630] mb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-[#e91e63]" />
              Version Evolution History ({versions.length})
            </h3>
            <p className="text-xs text-[#6b5560] mb-4">
              Stored in MongoDB. Click any version to inspect its snapshot or restore it.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {versions.map((ver) => {
                const isCurrent = ver.versionNumber === activeProject.currentVersion;
                return (
                  <div
                    key={ver._id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#fce4ec]/60 border-[#e91e63]'
                        : 'bg-[#fff8fa] border-[#f3c5d3] hover:border-[#e91e63]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#3a2630] font-mono">v{ver.versionNumber}</span>
                        <Badge variant={isCurrent ? 'pink' : 'rose'} className="text-[10px]">
                          {isCurrent ? 'Active' : ver.evolutionAction}
                        </Badge>
                      </div>

                      {!isCurrent && (
                        <button
                          onClick={() => handleRestoreVersion(ver.versionNumber)}
                          disabled={loading}
                          className="text-[11px] text-[#e91e63] hover:text-[#d81b60] flex items-center gap-1 font-medium"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Restore
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-[#3a2630] mt-2 leading-relaxed">
                      {ver.changeSummary || 'Version snapshot recorded.'}
                    </p>

                    <span className="text-[10px] text-[#6b5560] block mt-2">
                      {new Date(ver.createdAt).toLocaleDateString()} at {new Date(ver.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default IdeaEvolution;
