import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectAPI, analysisAPI } from '../services/api';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(() => {
    try {
      const stored = localStorage.getItem('activeProject');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });
  const [analyses, setAnalyses] = useState({});
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);

  useEffect(() => {
    if (activeProject?._id) {
      localStorage.setItem('activeProject', JSON.stringify(activeProject));
      fetchProjectAnalyses(activeProject._id);
    } else {
      localStorage.removeItem('activeProject');
      setAnalyses({});
    }
  }, [activeProject?._id]);

  const fetchProjectAnalyses = async (projectId) => {
    try {
      setLoadingAnalyses(true);
      const res = await analysisAPI.getProjectAnalyses(projectId);
      if (res.data.success) {
        setAnalyses(res.data.analyses || {});
      }
    } catch (err) {
      console.error('Failed to fetch analyses', err);
    } finally {
      setLoadingAnalyses(false);
    }
  };

  const selectProject = (project) => {
    setActiveProject(project);
  };

  const refreshActiveProject = async () => {
    if (!activeProject?._id) return;
    try {
      const res = await projectAPI.getProjectById(activeProject._id);
      if (res.data.success) {
        setActiveProject(res.data.project);
        localStorage.setItem('activeProject', JSON.stringify(res.data.project));
      }
    } catch (err) {
      console.error('Failed to refresh project', err);
    }
  };

  const updateAnalysesMap = (type, data) => {
    setAnalyses((prev) => ({
      ...prev,
      [type]: data,
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        analyses,
        loadingAnalyses,
        selectProject,
        refreshActiveProject,
        updateAnalysesMap,
        fetchProjectAnalyses,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
