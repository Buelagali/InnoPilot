import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token on all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
};

// Problem Discovery & Analysis Endpoints
export const problemAPI = {
  discoverChat: (data) => api.post('/problems/discover/chat', data),
  finalizeDiscovery: (data) => api.post('/problems/discover/finalize', data),
  analyzeManual: (data) => api.post('/problems/analyze-manual', data),
  getProblems: () => api.get('/problems'),
  getProblemById: (id) => api.get(`/problems/${id}`),
  deleteProblem: (id) => api.delete(`/problems/${id}`),
};

// Project Ideas & Evolution Endpoints
export const projectAPI = {
  generateIdeas: (data) => api.post('/projects/generate', data),
  getProjects: (params) => api.get('/projects', { params }),
  getProjectById: (id) => api.get(`/projects/${id}`),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  duplicateProject: (id) => api.post(`/projects/${id}/duplicate`),
  evolveIdea: (id, data) => api.post(`/projects/${id}/evolve`, data),
  getIdeaVersions: (id) => api.get(`/projects/${id}/versions`),
  restoreIdeaVersion: (id, versionNumber) => api.post(`/projects/${id}/restore-version/${versionNumber}`),
};

// Deep Analysis Modules (Similarity, Feasibility, Research Gap, Architecture, Proposal)
export const analysisAPI = {
  getProjectAnalyses: (projectId) => api.get(`/analysis/${projectId}`),
  analyzeSimilarity: (projectId) => api.post(`/analysis/${projectId}/similarity`),
  analyzeFeasibility: (projectId) => api.post(`/analysis/${projectId}/feasibility`),
  analyzeResearchGap: (projectId) => api.post(`/analysis/${projectId}/research-gap`),
  analyzeArchitecture: (projectId) => api.post(`/analysis/${projectId}/architecture`),
  generateProposal: (projectId) => api.post(`/analysis/${projectId}/proposal`),
};

// Roadmap Endpoints
export const roadmapAPI = {
  getRoadmap: (projectId) => api.get(`/roadmaps/${projectId}`),
  generateRoadmap: (projectId) => api.post(`/roadmaps/${projectId}/generate`),
  updateTaskStatus: (projectId, taskId, status) => api.put(`/roadmaps/${projectId}/tasks/${taskId}`, { status }),
};

// Contextual AI Assistant Endpoints
export const aiAPI = {
  assistantChat: (data) => api.post('/ai/assistant/chat', data),
  getAssistantHistory: (params) => api.get('/ai/assistant/history', { params }),
};

// Admin & Dashboard Endpoints
export const adminAPI = {
  getStudentDashboardStats: () => api.get('/admin/dashboard-stats'),
  getCategories: () => api.get('/admin/categories'),
  getStats: () => api.get('/admin/stats'),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, data) => api.put(`/admin/users/${id}`, data),
  createCategory: (data) => api.post('/admin/categories', data),
};

export default api;
