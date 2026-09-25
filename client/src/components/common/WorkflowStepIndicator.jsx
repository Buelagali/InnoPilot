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
  { id: 'discover', label: '1. Discovery', path: '/discover', icon: Compass, color: 'text-[#EA580C]' },
  { id: 'analyzer', label: '2. Analysis', path: '/analyzer', icon: Search, color: 'text-[#0284C7]' },
  { id: 'generator', label: '3. Idea Gen', path: '/generate', icon: Lightbulb, requiresProject: false, color: 'text-[#D97706]' },
  { id: 'evolution', label: '4. Evolution', path: '/evolve', icon: GitBranch, requiresProject: true, color: 'text-[#E91E63]' },
  { id: 'similarity', label: '5. Similarity', path: '/similarity', icon: CopyCheck, requiresProject: true, color: 'text-[#0369A1]' },
  { id: 'feasibility', label: '6. Feasibility', path: '/feasibility', icon: CheckCircle2, requiresProject: true, color: 'text-[#15803D]' },
  { id: 'research', label: '7. Research Gap', path: '/research-gap', icon: BookOpen, requiresProject: true, color: 'text-[#B45309]' },
  { id: 'architecture', label: '8. Architecture', path: '/architecture', icon: Cpu, requiresProject: true, color: 'text-[#0284C7]' },
  { id: 'roadmap', label: '9. Roadmap', path: '/roadmap', icon: MapPin, requiresProject: true, color: 'text-[#15803D]' },
  { id: 'proposal', label: '10. Proposal', path: '/proposal', icon: FileCheck2, requiresProject: true, color: 'text-[#E91E63]' },
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white shadow-md shadow-pink-500/20 scale-105 border-transparent'
                    : isAccessible
                    ? 'bg-white text-[#5E5364] hover:text-[#2D2530] hover:bg-[#FAF8FB] border-[#F1E4EC]'
                    : 'bg-[#FAF8FB] text-[#8E8295] border-[#F1E4EC] cursor-not-allowed opacity-50'
                }`}
                title={!isAccessible ? 'Generate or select a project first' : step.label}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : step.color}`} />
                <span>{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div className="w-3 h-0.5 bg-[#F1E4EC] rounded-full flex-shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepIndicator;
