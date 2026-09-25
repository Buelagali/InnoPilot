import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { roadmapAPI } from '../../services/api';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const RoadmapTracker = () => {
  const navigate = useNavigate();
  const { activeProject } = useProject();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPhases, setExpandedPhases] = useState({});

  useEffect(() => {
    if (activeProject?._id) {
      fetchRoadmap();
    }
  }, [activeProject?._id]);

  const fetchRoadmap = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await roadmapAPI.getRoadmap(activeProject._id);
      if (res.data.success) {
        setRoadmap(res.data.roadmap);
        // Expand first 3 phases by default
        const initialExpanded = {};
        res.data.roadmap.phases.forEach((p, idx) => {
          if (idx < 3) initialExpanded[p.phaseNumber] = true;
        });
        setExpandedPhases(initialExpanded);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load roadmap.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTaskStatus = async (taskId, currentStatus) => {
    if (!activeProject?._id) return;

    const nextStatus =
      currentStatus === 'not_started'
        ? 'in_progress'
        : currentStatus === 'in_progress'
        ? 'completed'
        : 'not_started';

    try {
      const res = await roadmapAPI.updateTaskStatus(activeProject._id, taskId, nextStatus);
      if (res.data.success) {
        setRoadmap(res.data.roadmap);
      }
    } catch (err) {
      console.error('Failed to update task status', err);
    }
  };

  const togglePhase = (phaseNumber) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-[#f3c5d3]">
          <MapPin className="w-12 h-12 text-[#e91e63] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#3a2630]">No Active Project Selected</h2>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Please select or generate a project first to track its 10-phase milestone roadmap.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#f43f5e] text-white text-xs font-semibold"
          >
            Go to Project Library
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#3a2630]">
      <WorkflowStepIndicator currentStepId="roadmap" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] text-xs font-semibold mb-2 border border-[#f3c5d3]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Module 10 • Personalized 10-Phase Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Milestone Implementation Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            Track your capstone from requirement analysis to cloud deployment. Click any task checkbox to cycle its status (Not Started → In Progress → Completed).
          </p>
        </div>

        <button
          onClick={() => navigate('/proposal')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#f43f5e] text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
        >
          <span>Next: Generate Final Proposal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center mx-auto text-[#e91e63] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3a2630]">Loading Personalized Roadmap...</h3>
        </div>
      )}

      {roadmap && !loading && (
        <div className="space-y-6 animate-in fade-in">
          {/* Progress Overview Banner */}
          <GlassCard className="p-6 border-[#f3c5d3] bg-gradient-to-b from-white to-[#fff8fa]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6b5560]">
                  Capstone Development Progress
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#3a2630] font-mono">
                    {roadmap.progressPercentage || 0}%
                  </span>
                  <Badge variant={roadmap.progressPercentage > 60 ? 'success' : 'primary'}>
                    {roadmap.progressPercentage === 100
                      ? 'Completed'
                      : roadmap.progressPercentage > 0
                      ? 'In Progress'
                      : 'Not Started'}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#6b5560] block">Total Estimated Duration:</span>
                <span className="text-sm font-bold text-[#e91e63] font-mono">
                  {roadmap.totalEstimatedWeeks || 16} Weeks (Phases 1-10)
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-[#fce4ec] rounded-full h-3 overflow-hidden border border-[#f3c5d3]">
              <div
                className="bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(roadmap.progressPercentage || 0, 4)}%` }}
              ></div>
            </div>
          </GlassCard>

          {/* 10 Phases Accordion List */}
          <div className="space-y-3">
            {(roadmap.phases || []).map((phase) => {
              const isExpanded = expandedPhases[phase.phaseNumber];
              const completedInPhase = phase.tasks.filter((t) => t.status === 'completed').length;
              const isPhaseComplete = completedInPhase === phase.tasks.length && phase.tasks.length > 0;

              return (
                <GlassCard
                  key={phase._id || phase.phaseNumber}
                  className={`p-0 overflow-hidden border transition-all ${
                    isPhaseComplete
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-[#f3c5d3]'
                  }`}
                >
                  {/* Phase Header Trigger */}
                  <button
                    onClick={() => togglePhase(phase.phaseNumber)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#fff0f5] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isPhaseComplete
                            ? 'bg-emerald-100 text-emerald-600 border border-emerald-300'
                            : 'bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3]'
                        }`}
                      >
                        {isPhaseComplete ? '✓' : phase.phaseNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#3a2630]">{phase.phaseTitle}</h3>
                        <p className="text-xs text-[#6b5560] mt-0.5 line-clamp-1">{phase.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[11px] text-[#6b5560] font-mono">
                        {completedInPhase}/{phase.tasks.length} tasks
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#6b5560]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#6b5560]" />
                      )}
                    </div>
                  </button>

                  {/* Tasks List Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#f3c5d3]/50 space-y-3">
                      {phase.tasks.map((task) => {
                        const statusColors = {
                          not_started: 'text-[#6b5560] hover:text-[#e91e63]',
                          in_progress: 'text-amber-500',
                          completed: 'text-emerald-500',
                        };

                        return (
                          <div
                            key={task._id}
                            className="p-3.5 rounded-xl bg-white border border-[#f3c5d3]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs"
                          >
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => handleToggleTaskStatus(task._id, task.status)}
                                className={`mt-0.5 transition-colors ${statusColors[task.status]}`}
                                title={`Status: ${task.status}. Click to advance.`}
                              >
                                {task.status === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : task.status === 'in_progress' ? (
                                  <Clock className="w-4 h-4 animate-pulse" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </button>

                              <div>
                                <h4
                                  className={`font-semibold ${
                                    task.status === 'completed'
                                      ? 'line-through text-[#6b5560]'
                                      : 'text-[#3a2630]'
                                  }`}
                                >
                                  {task.title}
                                </h4>
                                <p className="text-[#6b5560] text-[11px] mt-0.5">{task.description}</p>
                                {task.deliverables && task.deliverables.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1.5">
                                    {task.deliverables.map((del, dIdx) => (
                                      <span
                                        key={dIdx}
                                        className="text-[10px] px-2 py-0.2 rounded bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3]"
                                      >
                                        Deliverable: {del}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <span className="text-[10px] text-[#6b5560]">~{task.estimatedDays || 3} days</span>
                              <button
                                onClick={() => handleToggleTaskStatus(task._id, task.status)}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-medium border border-[#f3c5d3] hover:bg-[#fff0f5] text-[#3a2630] transition-colors"
                              >
                                {task.status === 'not_started' && 'Mark In Progress'}
                                {task.status === 'in_progress' && 'Mark Complete'}
                                {task.status === 'completed' && 'Completed ✓'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapTracker;
