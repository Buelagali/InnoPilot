require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { connectDB, isDbConnected } = require('./config/db');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const projectRoutes = require('./routes/projectRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Trust reverse proxy (Render, Vercel, Cloudflare) for proper rate limiting and client IP resolution
app.set('trust proxy', 1);

// Connect to Database (with auto-retry)
connectDB();

// Dynamic CORS configuration allowing localhost and production deployments
const allowedOrigins = [
  'https://innopilot-zeta.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5001',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const clean = url.trim().replace(/\/+$/, '');
    if (clean && !allowedOrigins.includes(clean)) {
      allowedOrigins.push(clean);
    }
  });
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, postman, mobile, server-to-server)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/+$/, '');
    if (
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.vercel.app') ||
      cleanOrigin.endsWith('.onrender.com') ||
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin)
    ) {
      return callback(null, true);
    }
    // Permissive for cloud frontend integration
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Global API Rate Limiter
app.use('/api', generalLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbState = dbStates[mongoose.connection.readyState] || 'unknown';
  const ready = isDbConnected();

  res.status(200).json({
    status: 'online',
    platform: 'AI Project Discovery & Innovation Platform API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: ready ? 'connected' : 'resilient-mode',
      state: dbState,
      uriConfigured: Boolean(process.env.MONGODB_URI),
      isAtlas: (process.env.MONGODB_URI || '').includes('mongodb+srv'),
    },
    aiProvider: process.env.GEMINI_API_KEY ? 'Google Gemini Live' : 'Smart Resilient Engine',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
    errorCode: 'ROUTE_NOT_FOUND',
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Innovation Platform API running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`💥 Unhandled Rejection: ${err.message}`);
});

module.exports = app;
