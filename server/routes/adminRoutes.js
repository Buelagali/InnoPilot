const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  updateUserRoleOrStatus,
  getCategories,
  createCategory,
  getStudentDashboardStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// Student & Admin accessible
router.get('/dashboard-stats', protect, getStudentDashboardStats);
router.get('/categories', getCategories);

// Admin-only protected routes
router.get('/stats', protect, authorize('admin'), getAdminStats);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin'), updateUserRoleOrStatus);
router.post('/categories', protect, authorize('admin'), createCategory);

module.exports = router;
