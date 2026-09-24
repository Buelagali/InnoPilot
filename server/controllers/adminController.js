const User = require('../models/User');
const Problem = require('../models/Problem');
const ProjectIdea = require('../models/ProjectIdea');
const IdeaVersion = require('../models/IdeaVersion');
const Category = require('../models/Category');
const Report = require('../models/Report');
const { isDbConnected } = require('../config/db');
const { categories: fallbackCategories, projects: fallbackProjects, problems: fallbackProblems, users: fallbackUsers } = require('../services/resilientStore');

// @desc    Get system-wide metrics and stats for Admin Dashboard
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalProblems = await Problem.countDocuments();
    const totalIdeas = await ProjectIdea.countDocuments();
    const totalVersions = await IdeaVersion.countDocuments();
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'pending' });

    // Aggregation by domain
    const ideasByDomain = await ProjectIdea.aggregate([
      { $group: { _id: '$domain', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Aggregation by difficulty
    const ideasByDifficulty = await ProjectIdea.aggregate([
      { $group: { _id: '$difficultyLevel', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Recent registered users
    const recentUsers = await User.find().select('-passwordHash').sort({ createdAt: -1 }).limit(6);

    // Recent projects
    const recentProjects = await ProjectIdea.find().populate('userId', 'name email college').sort({ createdAt: -1 }).limit(6);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalStudents,
        totalProblems,
        totalIdeas,
        totalVersions,
        totalReports,
        pendingReports,
        ideasByDomain,
        ideasByDifficulty,
      },
      recentUsers,
      recentProjects,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users (with filtering)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (role && role !== 'All') query.role = role;
    if (status === 'active') query.isActive = true;
    if (status === 'disabled') query.isActive = false;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-passwordHash').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle user status or update role
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUserRoleOrStatus = async (req, res, next) => {
  try {
    const { role, isActive } = req.body;
    const updates = {};
    if (role) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
        errorCode: 'USER_NOT_FOUND',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get problem categories
// @route   GET /api/admin/categories
// @access  Public / Private
exports.getCategories = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.status(200).json({
        success: true,
        count: fallbackCategories.length,
        categories: fallbackCategories,
      });
    }

    let categories = await Category.find({ isActive: true });
    
    // Seed default categories if none exist
    if (categories.length === 0) {
      const defaultCategories = [
        { name: 'Healthcare & Medicine', description: 'Diagnostic triage, rural clinic support, medical IoT', icon: 'Activity', subcategories: ['Triage', 'Telemedicine', 'Medical Imaging'] },
        { name: 'Education & Accessibility', description: 'Adaptive learning, campus accessibility, neurodivergent tools', icon: 'GraduationCap', subcategories: ['Adaptive Testing', 'Assistive Tech', 'Lab Virtualization'] },
        { name: 'Agriculture & Food Security', description: 'Crop disease detection, precision irrigation, supply chain', icon: 'Sprout', subcategories: ['Crop Diagnostics', 'Soil Telemetry', 'Yield Forecasting'] },
        { name: 'Environment & Climate', description: 'Carbon accounting, flood early warning, wildlife acoustics', icon: 'Leaf', subcategories: ['Emission Tracking', 'Water Quality', 'Renewable Microgrids'] },
        { name: 'Transportation & Logistics', description: 'Intelligent traffic dispatch, fleet telemetry, route optimization', icon: 'Truck', subcategories: ['Fleet Route Optimization', 'Public Transit Telemetry'] },
        { name: 'Cybersecurity & Privacy', description: 'Zero-trust auth, phishing detection, privacy-preserving telemetry', icon: 'ShieldCheck', subcategories: ['Federated Learning', 'Zero Trust', 'Threat Intel'] },
        { name: 'Software Development & DevOps', description: 'Automated CI/CD anomaly detection, code verification, linting', icon: 'Code', subcategories: ['Code Synthesis', 'Bug Localization', 'Performance Profiling'] },
        { name: 'Campus & Student Life', description: 'Peer collaboration, lab equipment scheduling, automated study networks', icon: 'Building', subcategories: ['Hostel Logistics', 'Study Groups', 'Resource Allocation'] },
      ];
      categories = await Category.insertMany(defaultCategories);
    }

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Category
// @route   POST /api/admin/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description, icon, subcategories } = req.body;
    const category = await Category.create({
      name,
      description,
      icon,
      subcategories: Array.isArray(subcategories) ? subcategories : [],
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user dashboard stats for student (Module 11)
// @route   GET /api/users/dashboard-stats
// @access  Private
exports.getStudentDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!isDbConnected()) {
      const userProjects = fallbackProjects.filter((p) => String(p.userId) === String(userId));
      const userProblems = fallbackProblems.filter((p) => String(p.userId) === String(userId));
      return res.status(200).json({
        success: true,
        stats: {
          problemsDiscovered: userProblems.length,
          ideasGenerated: userProjects.length,
          ideasSaved: userProjects.filter((p) => p.isSaved).length,
          ideasImproved: 0,
          latestProject: userProjects[0] || null,
          latestProblems: userProblems.slice(0, 3),
          savedProjects: userProjects.slice(0, 5),
          difficultyBreakdown: [],
        },
      });
    }

    const problemsCount = await Problem.countDocuments({ userId });
    const ideasCount = await ProjectIdea.countDocuments({ userId });
    const versionsCount = await IdeaVersion.aggregate([
      {
        $lookup: {
          from: 'projectideas',
          localField: 'ideaId',
          foreignField: '_id',
          as: 'idea',
        },
      },
      { $match: { 'idea.userId': req.user._id, versionNumber: { $gt: 1 } } },
      { $count: 'total' },
    ]);

    const latestProject = await ProjectIdea.findOne({ userId }).sort({ updatedAt: -1 }).populate('problemId');
    const latestProblems = await Problem.find({ userId }).sort({ createdAt: -1 }).limit(3);
    const savedProjects = await ProjectIdea.find({ userId }).sort({ updatedAt: -1 }).limit(5);

    // Distribution by difficulty
    const difficultyBreakdown = await ProjectIdea.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$difficultyLevel', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        problemsDiscovered: problemsCount,
        ideasGenerated: ideasCount,
        ideasSaved: ideasCount,
        ideasImproved: versionsCount[0]?.total || 0,
        latestProject,
        latestProblems,
        savedProjects,
        difficultyBreakdown,
      },
    });
  } catch (err) {
    next(err);
  }
};
