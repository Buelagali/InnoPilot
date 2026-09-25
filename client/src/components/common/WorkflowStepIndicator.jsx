import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import {
  Compass,
  Search,
  Lightbulb,
  GitBranch,
  CopyCheck,
  CheckCircle2,
  BookOpen,
  Cpu,
  MapPin,
  FileCheck2,
} from 'lucide-react';

const steps = [
  { id: 'discover', label: '1. Discovery', path: '/discover', icon: Compass, color: 'text-aiPeach-500' },
  { id: 'analyzer', label: '2. Analysis', path: '/analyzer', icon: Search, color: 'text-aiCyan-600' },
  { id: 'generator', label: '3. Idea Gen', path: '/generate', icon: Lightbulb, requiresProject: false, color: 'text-aiGold-500' },
  { id: 'evolution', label: '4. Evolution', path: '/evolve', icon: GitBranch, requiresProject: true, color: 'text-aiPink-500' },
  { id: 'similarity', label: '5. Similarity', path: '/similarity', icon: CopyCheck, requiresProject: true, color: 'text-aiSky-600' },
  { id: 'feasibility', label: '6. Feasibility', path: '/feasibility', icon: CheckCircle2, requiresProject: true, color: 'text-aiMint-600' },
  { id: 'research', label: '7. Research Gap', path: '/research-gap', icon: BookOpen, requiresProject: true, color: 'text-aiGold-600' },
  { id: 'architecture', label: '8. Architecture', path: '/architecture', icon: Cpu, requiresProject: true, color: 'text-aiCyan-600' },
  { id: 'roadmap', label: '9. Roadmap', path: '/roadmap', icon: MapPin, requiresProject: true, color: 'text-aiMint-600' },
  { id: 'proposal', label: '10. Proposal', path: '/proposal', icon: FileCheck2, requiresProject: true, color: 'text-aiViolet-600' },
];

const WorkflowStepIndicator = ({ currentStepId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeProject } = useProject();

  const handleStepClick = (step) => {
    if (step.requiresProject && !activeProject) {
      alert('Please select or generate a project idea first to access this module.');
      navigate('/library');
      return;
    }
    navigate(step.path);
  };

  return (
    <div className="w-full overflow-x-auto py-2 mb-6 scrollbar-thin">
      <div className="flex items-center min-w-max gap-1 px-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = currentStepId === step.id || location.pathname.includes(step.path);
          const isAccessible = !step.requiresProject || Boolean(activeProject);

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleStepClick(step)}
                disabled={!isAccessible}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white shadow-md shadow-aiViolet-500/25 scale-105 border-transparent'
                    : isAccessible
                    ? 'bg-white/80 text-textBody hover:text-textDark hover:bg-white border-slate-200/80 shadow-2xs'
                    : 'bg-slate-100/60 text-textMuted border-slate-200/50 cursor-not-allowed opacity-50'
                }`}
                title={!isAccessible ? 'Generate or select a project first' : step.label}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : step.color}`} />
                <span>{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div className="w-2.5 h-0.5 bg-slate-200 rounded-full flex-shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepIndicator;
