const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const { users: resilientUsers } = require('../services/resilientStore');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    const authHeader = req.headers.authorization.trim();
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.slice(7).trim();
    } else {
      token = authHeader;
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.',
      errorCode: 'AUTH_REQUIRED',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_secret_jwt_key_innovation_platform_2026_xyz'
    );

    let user;

    if (isDbConnected()) {
      try {
        user = await User.findById(decoded.id).select('-passwordHash');
      } catch (dbErr) {
        user = null;
      }
    }

    // If not found in MongoDB (e.g. demo account, resilient account, or during cold-start), check resilient store
    if (!user) {
      const found = Array.from(resilientUsers.values()).find(
        (u) => String(u._id) === String(decoded.id) || (decoded.email && u.email.toLowerCase() === decoded.email.toLowerCase())
      );
      if (found) {
        user = { ...found };
        delete user.passwordHash;
      } else if (decoded.id) {
        // Fallback user shape based on token claims
        user = {
          _id: decoded.id,
          id: decoded.id,
          name: decoded.name || 'Student User',
          email: decoded.email || 'student@innopilot.edu',
          role: decoded.role || 'student',
          isActive: true,
          skills: ['React', 'Node.js', 'Python'],
          programmingLanguages: ['JavaScript', 'Python'],
          aimlKnowledge: 'Intermediate',
          webDevKnowledge: 'Intermediate',
          interests: ['Healthcare & Medicine'],
          experienceLevel: '3rd Year',
          preferredProjectType: 'Major Project',
          preferredDuration: '3 - 6 Months',
          teamSize: 2,
          hardwareAvailability: 'Standard Laptop',
          budget: 'Zero Budget (Open Source Only)',
          isResearchOriented: true,
        };
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
        errorCode: 'USER_NOT_FOUND',
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'User account has been deactivated.',
        errorCode: 'ACCOUNT_DISABLED',
      });
    }

    req.user = user;
    req.user.id = user._id || decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or has expired. Please login again.',
      errorCode: 'INVALID_TOKEN',
    });
  }
};

module.exports = { protect };
