const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    college: {
      type: String,
      default: '',
      trim: true,
    },
    branch: {
      type: String,
      default: '',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    programmingLanguages: {
      type: [String],
      default: [],
    },
    aimlKnowledge: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'None'],
      default: 'Beginner',
    },
    webDevKnowledge: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'None'],
      default: 'Intermediate',
    },
    interests: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year / Final Year', 'Postgraduate', 'Self-Taught'],
      default: '3rd Year',
    },
    preferredProjectType: {
      type: String,
      enum: ['Major Project', 'Minor Project', 'Research Paper', 'Hackathon MVP', 'Industry Prototype'],
      default: 'Major Project',
    },
    preferredDuration: {
      type: String,
      default: '3 - 6 Months',
    },
    teamSize: {
      type: Number,
      default: 2,
    },
    hardwareAvailability: {
      type: String,
      enum: ['Standard Laptop', 'GPU / High-end PC', 'Cloud / Colab', 'IoT / Microcontrollers', 'None'],
      default: 'Standard Laptop',
    },
    budget: {
      type: String,
      enum: ['Zero Budget (Open Source Only)', 'Low (< $50)', 'Moderate ($50 - $200)', 'Flexible'],
      default: 'Zero Budget (Open Source Only)',
    },
    isResearchOriented: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time to 15 minutes
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
