import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingAssistant from './components/common/FloatingAssistant';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import Profile from './pages/profile/Profile';
import ProblemDiscovery from './pages/discovery/ProblemDiscovery';
import ProblemAnalyzer from './pages/analyzer/ProblemAnalyzer';
import IdeaGenerator from './pages/generator/IdeaGenerator';
import IdeaEvolution from './pages/evolution/IdeaEvolution';
import SimilarityAnalysis from './pages/similarity/SimilarityAnalysis';
import FeasibilityAnalysis from './pages/feasibility/FeasibilityAnalysis';
import ResearchGap from './pages/research/ResearchGap';
import ArchitectureGenerator from './pages/architecture/ArchitectureGenerator';
import RoadmapTracker from './pages/roadmap/RoadmapTracker';
import ProposalGenerator from './pages/proposal/ProposalGenerator';
import ProjectLibrary from './pages/library/ProjectLibrary';
import AIAssistantPage from './pages/assistant/AIAssistantPage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-xs">
        Authenticating session...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route Guard
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-xs">
        Authenticating session...
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Guest Only Guard
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <div className="min-h-screen flex flex-col bg-[#fff8fa] text-[#3a2630] selection:bg-pink-500 selection:text-white">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* Public & Guest Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      <Register />
                    </GuestRoute>
                  }
                />

                {/* Student Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <ProtectedRoute>
                      <ProblemDiscovery />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyzer"
                  element={
                    <ProtectedRoute>
                      <ProblemAnalyzer />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/generate"
                  element={
                    <ProtectedRoute>
                      <IdeaGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/evolve"
                  element={
                    <ProtectedRoute>
                      <IdeaEvolution />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/similarity"
                  element={
                    <ProtectedRoute>
                      <SimilarityAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feasibility"
                  element={
                    <ProtectedRoute>
                      <FeasibilityAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/research-gap"
                  element={
                    <ProtectedRoute>
                      <ResearchGap />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/architecture"
                  element={
                    <ProtectedRoute>
                      <ArchitectureGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/roadmap"
                  element={
                    <ProtectedRoute>
                      <RoadmapTracker />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/proposal"
                  element={
                    <ProtectedRoute>
                      <ProposalGenerator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/library"
                  element={
                    <ProtectedRoute>
                      <ProjectLibrary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/assistant"
                  element={
                    <ProtectedRoute>
                      <AIAssistantPage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* Fallback Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
            <FloatingAssistant />
          </div>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
