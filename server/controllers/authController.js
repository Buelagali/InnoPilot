const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const emailService = require('../services/emailService');
const { isDbConnected } = require('../config/db');
const { users: resilientUsers } = require('../services/resilientStore');

const generateToken = (idOrUser) => {
  const id = typeof idOrUser === 'object' ? (idOrUser._id || idOrUser.id) : idOrUser;
  const payload = { id };
  if (typeof idOrUser === 'object') {
    if (idOrUser.email) payload.email = idOrUser.email;
    if (idOrUser.role) payload.role = idOrUser.role;
    if (idOrUser.name) payload.name = idOrUser.name;
  }
  return jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_jwt_key_innovation_platform_2026_xyz', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register a new student/user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      college,
      branch,
      skills,
      programmingLanguages,
      aimlKnowledge,
      webDevKnowledge,
      interests,
      experienceLevel,
      preferredProjectType,
      preferredDuration,
      teamSize,
      hardwareAvailability,
      budget,
      isResearchOriented,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
        errorCode: 'MISSING_FIELDS',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let existingUser = null;

    if (isDbConnected()) {
      try {
        existingUser = await User.findOne({ email: normalizedEmail });
      } catch (e) {
        existingUser = resilientUsers.get(normalizedEmail);
      }
    } else {
      existingUser = resilientUsers.get(normalizedEmail);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
        errorCode: 'EMAIL_ALREADY_EXISTS',
      });
    }

    // Default admin if role explicitly requested as admin, otherwise student
    const assignedRole = role === 'admin' ? 'admin' : 'student';

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const parsedLanguages = Array.isArray(programmingLanguages)
      ? programmingLanguages
      : typeof programmingLanguages === 'string'
      ? programmingLanguages.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const parsedInterests = Array.isArray(interests)
      ? interests
      : typeof interests === 'string'
      ? interests.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    let user = null;

    if (isDbConnected()) {
      try {
        user = await User.create({
          name,
          email: normalizedEmail,
          passwordHash: password,
          role: assignedRole,
          college: college || '',
          branch: branch || '',
          skills: parsedSkills,
          programmingLanguages: parsedLanguages,
          aimlKnowledge: aimlKnowledge || 'Beginner',
          webDevKnowledge: webDevKnowledge || 'Intermediate',
          interests: parsedInterests,
          experienceLevel: experienceLevel || '3rd Year',
          preferredProjectType: preferredProjectType || 'Major Project',
          preferredDuration: preferredDuration || '3 - 6 Months',
          teamSize: Number(teamSize) || 2,
          hardwareAvailability: hardwareAvailability || 'Standard Laptop',
          budget: budget || 'Zero Budget (Open Source Only)',
          isResearchOriented: isResearchOriented !== undefined ? isResearchOriented : true,
        });
      } catch (dbErr) {
        console.warn('MongoDB write notice, registering in resilient mode:', dbErr.message);
      }
    }

    // Resilient fallback if MongoDB is currently offline or unreachable
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const id = new mongoose.Types.ObjectId().toString();
      const rawUser = {
        _id: id,
        id,
        name,
        email: normalizedEmail,
        passwordHash,
        role: assignedRole,
        college: college || '',
        branch: branch || '',
        skills: parsedSkills,
        programmingLanguages: parsedLanguages,
        aimlKnowledge: aimlKnowledge || 'Beginner',
        webDevKnowledge: webDevKnowledge || 'Intermediate',
        interests: parsedInterests,
        experienceLevel: experienceLevel || '3rd Year',
        preferredProjectType: preferredProjectType || 'Major Project',
        preferredDuration: preferredDuration || '3 - 6 Months',
        teamSize: Number(teamSize) || 2,
        hardwareAvailability: hardwareAvailability || 'Standard Laptop',
        budget: budget || 'Zero Budget (Open Source Only)',
        isResearchOriented: isResearchOriented !== undefined ? isResearchOriented : true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      resilientUsers.set(normalizedEmail, rawUser);
      user = { ...rawUser };
      delete user.passwordHash;
    }

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
        errorCode: 'INVALID_CREDENTIALS',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = null;
    let isMatch = false;

    if (isDbConnected()) {
      try {
        user = await User.findOne({ email: normalizedEmail });
        if (user) {
          isMatch = await user.comparePassword(password);
        }
      } catch (dbErr) {
        console.warn('MongoDB query notice, falling back to resilient auth:', dbErr.message);
        user = null;
      }
    }

    // Check resilient store if not matched in MongoDB or if DB is offline
    if (!user || !isMatch) {
      const fallbackUser = resilientUsers.get(normalizedEmail);
      if (fallbackUser) {
        const matchesFallback = await bcrypt.compare(password, fallbackUser.passwordHash);
        if (matchesFallback) {
          user = { ...fallbackUser };
          delete user.passwordHash;
          isMatch = true;
        }
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        errorCode: 'INVALID_CREDENTIALS',
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'This account has been disabled by an administrator.',
        errorCode: 'ACCOUNT_DISABLED',
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    let user = null;
    if (isDbConnected()) {
      try {
        user = await User.findById(req.user.id);
      } catch (e) {
        user = null;
      }
    }
    if (!user) {
      user = req.user;
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name',
      'college',
      'branch',
      'skills',
      'programmingLanguages',
      'aimlKnowledge',
      'webDevKnowledge',
      'interests',
      'experienceLevel',
      'preferredProjectType',
      'preferredDuration',
      'teamSize',
      'hardwareAvailability',
      'budget',
      'isResearchOriented',
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    let user = null;
    if (isDbConnected()) {
      try {
        user = await User.findByIdAndUpdate(req.user.id, updates, {
          new: true,
          runValidators: true,
        });
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      const email = req.user.email;
      const existing = resilientUsers.get(email) || req.user;
      const updated = { ...existing, ...updates, updatedAt: new Date() };
      resilientUsers.set(email, updated);
      user = { ...updated };
      delete user.passwordHash;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password.',
        errorCode: 'MISSING_FIELDS',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
        errorCode: 'PASSWORD_TOO_SHORT',
      });
    }

    let isMatch = false;
    let mongoUser = null;

    if (isDbConnected()) {
      try {
        mongoUser = await User.findById(req.user.id);
        if (mongoUser) {
          isMatch = await mongoUser.comparePassword(currentPassword);
        }
      } catch (e) {
        mongoUser = null;
      }
    }

    const fallbackUser = resilientUsers.get(req.user.email);
    if (!isMatch && fallbackUser) {
      isMatch = await bcrypt.compare(currentPassword, fallbackUser.passwordHash);
    }

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match.',
        errorCode: 'PASSWORD_MISMATCH',
      });
    }

    if (mongoUser) {
      mongoUser.passwordHash = newPassword;
      await mongoUser.save();
    }

    if (fallbackUser) {
      const salt = await bcrypt.genSalt(10);
      fallbackUser.passwordHash = await bcrypt.hash(newPassword, salt);
    }

    res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot Password - generate reset token & email link
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
        errorCode: 'INVALID_EMAIL',
      });
    }

    let user = null;
    if (isDbConnected()) {
      try {
        user = await User.findOne({ email: email.toLowerCase().trim() });
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    try {
      await emailService.sendPasswordResetEmail({
        toEmail: user.email,
        userName: user.name,
        resetToken,
      });

      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    } catch (emailErr) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent. Please try again later.',
        errorCode: 'EMAIL_SEND_FAILED',
      });
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset Password using token
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is required.',
        errorCode: 'MISSING_TOKEN',
      });
    }

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both new password and confirmation password.',
        errorCode: 'MISSING_FIELDS',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
        errorCode: 'PASSWORD_TOO_SHORT',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match. Please re-enter identical passwords.',
        errorCode: 'PASSWORD_MISMATCH',
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired. Please request a new link.',
        errorCode: 'INVALID_OR_EXPIRED_TOKEN',
      });
    }

    user.passwordHash = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been successfully reset. You can now sign in with your new password.',
    });
  } catch (err) {
    next(err);
  }
};
