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
  { id: 'discover', label: '1. Discovery', path: '/discover', icon: Compass },
  { id: 'analyzer', label: '2. Analysis', path: '/analyzer', icon: Search },
  { id: 'generator', label: '3. Idea Gen', path: '/generate', icon: Lightbulb, requiresProject: false },
  { id: 'evolution', label: '4. Evolution', path: '/evolve', icon: GitBranch, requiresProject: true },
  { id: 'similarity', label: '5. Similarity', path: '/similarity', icon: CopyCheck, requiresProject: true },
  { id: 'feasibility', label: '6. Feasibility', path: '/feasibility', icon: CheckCircle2, requiresProject: true },
  { id: 'research', label: '7. Research Gap', path: '/research-gap', icon: BookOpen, requiresProject: true },
  { id: 'architecture', label: '8. Architecture', path: '/architecture', icon: Cpu, requiresProject: true },
  { id: 'roadmap', label: '9. Roadmap', path: '/roadmap', icon: MapPin, requiresProject: true },
  { id: 'proposal', label: '10. Proposal', path: '/proposal', icon: FileCheck2, requiresProject: true },
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#d81b60] text-white shadow-md shadow-pink-500/25 scale-105'
                    : isAccessible
                    ? 'bg-white/85 text-[#6b5560] hover:text-[#3a2630] hover:bg-[#fff0f5] border border-[#f3c5d3]'
                    : 'bg-[#fff8fa]/60 text-[#b59aa7] border border-[#fce4ec] cursor-not-allowed opacity-60'
                }`}
                title={!isAccessible ? 'Generate or select a project first' : step.label}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-[#e91e63]'}`} />
                <span>{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div className="w-3 h-0.5 bg-[#f3c5d3] rounded-full flex-shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepIndicator;
