const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const emailService = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_innovation_platform_2026_xyz', {
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

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
        errorCode: 'EMAIL_ALREADY_EXISTS',
      });
    }

    // Default admin if first user or explicitly created in seed, otherwise student
    const assignedRole = role === 'admin' ? 'admin' : 'student';

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      passwordHash: password,
      role: assignedRole,
      college: college || '',
      branch: branch || '',
      skills: Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
      programmingLanguages: Array.isArray(programmingLanguages)
        ? programmingLanguages
        : typeof programmingLanguages === 'string'
        ? programmingLanguages.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      aimlKnowledge: aimlKnowledge || 'Beginner',
      webDevKnowledge: webDevKnowledge || 'Intermediate',
      interests: Array.isArray(interests) ? interests : typeof interests === 'string' ? interests.split(',').map((s) => s.trim()).filter(Boolean) : [],
      experienceLevel: experienceLevel || '3rd Year',
      preferredProjectType: preferredProjectType || 'Major Project',
      preferredDuration: preferredDuration || '3 - 6 Months',
      teamSize: Number(teamSize) || 2,
      hardwareAvailability: hardwareAvailability || 'Standard Laptop',
      budget: budget || 'Zero Budget (Open Source Only)',
      isResearchOriented: isResearchOriented !== undefined ? isResearchOriented : true,
    });

    const token = generateToken(user._id);

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

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        errorCode: 'INVALID_CREDENTIALS',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        errorCode: 'INVALID_CREDENTIALS',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account has been disabled by an administrator.',
        errorCode: 'ACCOUNT_DISABLED',
      });
    }

    const token = generateToken(user._id);

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
    const user = await User.findById(req.user.id);
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

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

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

    const user = await User.findById(req.user.id);
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password does not match.',
        errorCode: 'PASSWORD_MISMATCH',
      });
    }

    user.passwordHash = newPassword;
    await user.save();

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

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Anti-enumeration security: If user not found, return generic success
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token and set expiry on user
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Send email via email service
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

    // Hash the token from URL param to compare against MongoDB
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

    // Update password (pre-save hook will hash it)
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
