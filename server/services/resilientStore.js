const bcrypt = require('bcryptjs');

// In-memory resilient store for cloud deployments when MongoDB is temporarily connecting or unreachable
const users = new Map();
const problems = [];
const projects = [];
const categories = [
  { _id: 'cat_1', name: 'Healthcare & Medicine', description: 'Diagnostic triage, rural clinic support, medical IoT', icon: 'Activity', subcategories: ['Triage', 'Telemedicine', 'Medical Imaging'], isActive: true },
  { _id: 'cat_2', name: 'Education & Accessibility', description: 'Adaptive learning, campus accessibility, neurodivergent tools', icon: 'GraduationCap', subcategories: ['Adaptive Testing', 'Assistive Tech', 'Lab Virtualization'], isActive: true },
  { _id: 'cat_3', name: 'Agriculture & Food Security', description: 'Crop disease detection, precision irrigation, supply chain', icon: 'Sprout', subcategories: ['Crop Diagnostics', 'Soil Telemetry', 'Yield Forecasting'], isActive: true },
  { _id: 'cat_4', name: 'Environment & Climate', description: 'Carbon accounting, flood early warning, wildlife acoustics', icon: 'Leaf', subcategories: ['Emission Tracking', 'Water Quality', 'Renewable Microgrids'], isActive: true },
  { _id: 'cat_5', name: 'Transportation & Logistics', description: 'Intelligent traffic dispatch, fleet telemetry, route optimization', icon: 'Truck', subcategories: ['Fleet Route Optimization', 'Public Transit Telemetry'], isActive: true },
  { _id: 'cat_6', name: 'Cybersecurity & Privacy', description: 'Zero-trust auth, phishing detection, privacy-preserving telemetry', icon: 'ShieldCheck', subcategories: ['Federated Learning', 'Zero Trust', 'Threat Intel'], isActive: true },
  { _id: 'cat_7', name: 'Software Development & DevOps', description: 'Automated CI/CD anomaly detection, code verification, linting', icon: 'Code', subcategories: ['Code Synthesis', 'Bug Localization', 'Performance Profiling'], isActive: true },
  { _id: 'cat_8', name: 'Campus & Student Life', description: 'Peer collaboration, lab equipment scheduling, automated study networks', icon: 'Building', subcategories: ['Hostel Logistics', 'Study Groups', 'Resource Allocation'], isActive: true },
];

let initialized = false;

const initResilientStore = async () => {
  if (initialized) return;
  initialized = true;

  try {
    const salt = await bcrypt.genSalt(10);
    const demoStudentHash = await bcrypt.hash('Password123!', salt);
    const demoAdminHash = await bcrypt.hash('Admin123!', salt);

    // Preloaded Demo Student Account
    users.set('student@innopilot.edu', {
      _id: '66f000000000000000000001',
      name: 'Alex Rivera',
      email: 'student@innopilot.edu',
      passwordHash: demoStudentHash,
      role: 'student',
      college: 'Institute of Innovation & Technology',
      branch: 'Computer Science & Engineering',
      skills: ['React', 'Node.js', 'Python', 'Tailwind', 'MongoDB'],
      programmingLanguages: ['JavaScript', 'Python', 'C++'],
      aimlKnowledge: 'Intermediate',
      webDevKnowledge: 'Intermediate',
      interests: ['Healthcare & Medicine', 'Education & Accessibility'],
      experienceLevel: '3rd Year',
      preferredProjectType: 'Major Project',
      preferredDuration: '3 - 6 Months',
      teamSize: 2,
      hardwareAvailability: 'Standard Laptop',
      budget: 'Zero Budget (Open Source Only)',
      isResearchOriented: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Preloaded Demo Admin Account
    users.set('admin@innopilot.edu', {
      _id: '66f000000000000000000002',
      name: 'Admin Supervisor',
      email: 'admin@innopilot.edu',
      passwordHash: demoAdminHash,
      role: 'admin',
      college: 'Institute of Innovation & Technology',
      branch: 'Department of Research & Innovation',
      skills: ['Systems Architecture', 'AI Research', 'Governance'],
      programmingLanguages: ['Python', 'TypeScript'],
      aimlKnowledge: 'Advanced',
      webDevKnowledge: 'Advanced',
      interests: ['Smart Campus & Student Life', 'Cybersecurity & Privacy'],
      experienceLevel: 'Postgraduate',
      preferredProjectType: 'Research Paper',
      preferredDuration: '3 - 6 Months',
      teamSize: 4,
      hardwareAvailability: 'GPU / High-end PC',
      budget: 'Flexible',
      isResearchOriented: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Sample initial project idea for demo student
    projects.push({
      _id: '66f000000000000000000010',
      userId: '66f000000000000000000001',
      title: 'MediVision: Edge AI Diagnostic Triage for Rural Clinics',
      problemAddressed: 'Lack of on-site radiologists in primary health centers leading to diagnostic delays.',
      proposedSolution: 'Lightweight offline-first computer vision model deployed on microcontrollers or mobile phones to flag acute chest X-ray anomalies.',
      targetUsers: ['Rural Clinicians', 'Primary Healthcare Workers', 'Community Health Centers'],
      coreFeatures: ['Offline inference', 'Automated anomaly heatmap', 'SMS physician alert dispatch'],
      aiRole: 'MobileNetV3 quantized model for edge pulmonary abnormality detection',
      techStack: {
        frontend: 'React + Vite PWA',
        backend: 'Node.js Express + Python FastAPI',
        ai_ml: 'TensorFlow Lite / ONNX',
        database: 'MongoDB + SQLite Edge Cache',
      },
      expectedOutcome: 'Working prototype demonstrating 88%+ anomaly detection precision on NIH Chest X-ray sample dataset.',
      innovationOpportunities: ['Zero-bandwidth local cache sync', 'Audio-assisted diagnostic reporting'],
      difficultyLevel: 'Intermediate',
      estimatedDevelopmentTime: '3 - 4 Months',
      domain: 'Healthcare & Medicine',
      currentVersion: 1,
      isSaved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error('Resilient store init error:', err);
  }
};

initResilientStore();

module.exports = {
  users,
  problems,
  projects,
  categories,
  initResilientStore,
};
